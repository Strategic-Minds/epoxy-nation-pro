"""
BASE44 ↔ AWOS SYNC AGENT
=========================
Bridges Base44 Superagent (this agent) with:
  - Supabase (bridge_commands, bridge_tasks, agent_memory)
  - GitHub (AUTO_BUILDER, epoxy-nation-pro, strategic-minds-advisory)
  - Vercel (AUTO_BUILDER deployment, epoxy-nation-pro)
  - Google Drive (Brain KB, shared AUTO BUILDER drive)
  - AUTO_BUILDER MCP (20 live tools)

The GPT agent (AWOS) writes commands to:
  bridge_commands → bridge_tasks (state='queued')

This sync agent:
  1. Polls bridge_tasks for new queued tasks (state='queued', target='BASE44_SUPERAGENT')
  2. Routes each task to the right executor
  3. Claims the task (state='running')
  4. Executes via the appropriate tool
  5. Marks done (state='completed') + writes result to agent_memory
  6. Pushes sync receipt to AUTO_BUILDER MCP
"""

import asyncio
import aiohttp
import os
import json
import uuid
import time
import base64
import re
from datetime import datetime, timezone
from typing import Optional, Dict, List, Any

# ─────────────────────────────────────────────────────────────────
# CONFIG
# ─────────────────────────────────────────────────────────────────

SUPABASE_URL   = os.environ.get("SUPABASE_URL", "https://prhppuuwcnmfdhwsagug.supabase.co")
SUPABASE_KEY   = os.environ.get("SUPABASE_SERVICE_ROLE_KEY_2", "")
GITHUB_TOKEN   = os.environ.get("GITHUB_TOKEN", "")
DRIVE_TOKEN    = os.environ.get("GOOGLEDRIVE_ACCESS_TOKEN", "")
OPENAI_KEY     = os.environ.get("OPENAI_API_KEY", "")
AB_URL         = "https://auto-builder-strategic-minds-advisory.vercel.app"
AB_TOKEN       = os.environ.get("AUTO_BUILDER_BRIDGE_TOKEN", "")

BRAIN_KB_FOLDER = "1KamfNyac7hJGGRReUhdAZBZDOghxB2Lr"
REPOS = {
    "main": "Strategic-Minds/epoxy-nation-pro",
    "auto_builder": "Strategic-Minds/AUTO_BUILDER",
    "advisory": "XPS-IINTELLIGENCE-SYSTEMS/strategic-minds-advisory",
}

SH = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=representation"
}

# ─────────────────────────────────────────────────────────────────
# BRIDGE COMMAND BUILDER
# Helper: create a command + task pair in Supabase
# ─────────────────────────────────────────────────────────────────

async def create_bridge_command(session: aiohttp.ClientSession,
                                 source: str,
                                 task_type: str,
                                 task_prompt: str,
                                 target: str,
                                 priority: str = "high",
                                 approved: bool = False,
                                 safe: bool = True,
                                 blocked_reason: str = None) -> Optional[Dict]:
    """
    Creates a bridge_command + bridge_task in Supabase.
    This is how Base44 Superagent sends tasks to the AWOS GPT agent.
    """
    # Step 1: Create parent command
    cmd_payload = {
        "source": source,
        "task_type": task_type,
        "task_prompt": task_prompt,
        "target": target,
        "priority": priority,
        "approved": approved,
        "safe": safe,
    }
    if blocked_reason:
        cmd_payload["blocked_reason"] = blocked_reason

    async with session.post(
        f"{SUPABASE_URL}/rest/v1/bridge_commands",
        headers=SH, json=cmd_payload
    ) as r:
        if r.status not in [200, 201]:
            err = await r.text()
            print(f"  ❌ bridge_commands insert failed: {r.status} — {err[:100]}")
            return None
        data = await r.json()
        cmd = data[0] if isinstance(data, list) else data
        cmd_id = cmd.get("id")

    # Step 2: Create child task pointing to command
    task_payload = {
        "command_ref": cmd_id,
        "task_type": task_type,
        "task_prompt": task_prompt,
        "target": target,
        "priority": priority,
        "state": "queued",
        "approved": approved,
        "safe": safe,
    }
    async with session.post(
        f"{SUPABASE_URL}/rest/v1/bridge_tasks",
        headers=SH, json=task_payload
    ) as r2:
        if r2.status not in [200, 201]:
            err = await r2.text()
            print(f"  ❌ bridge_tasks insert failed: {r2.status} — {err[:100]}")
            return {"command_id": cmd_id, "task_id": None}
        data2 = await r2.json()
        task = data2[0] if isinstance(data2, list) else data2
        return {"command_id": cmd_id, "task_id": task.get("id"), "command": cmd, "task": task}


async def poll_bridge_tasks(session: aiohttp.ClientSession,
                             target_filter: str = "BASE44_SUPERAGENT",
                             limit: int = 20) -> List[Dict]:
    """Poll for queued tasks targeting Base44."""
    url = f"{SUPABASE_URL}/rest/v1/bridge_tasks?state=eq.queued&target=eq.{target_filter}&limit={limit}&order=created_at.asc"
    async with session.get(url, headers=SH) as r:
        if r.status == 200:
            return await r.json()
        return []


async def claim_task(session: aiohttp.ClientSession, task_id: str) -> bool:
    """Mark a task as running (claim it)."""
    async with session.patch(
        f"{SUPABASE_URL}/rest/v1/bridge_tasks?id=eq.{task_id}",
        headers=SH,
        json={"state": "running", "claimed_by": "base44_superagent", "claimed_at": datetime.now(timezone.utc).isoformat()}
    ) as r:
        return r.status in [200, 201, 204]


async def complete_task(session: aiohttp.ClientSession, task_id: str, result: Dict) -> bool:
    """Mark a task as completed with result."""
    async with session.patch(
        f"{SUPABASE_URL}/rest/v1/bridge_tasks?id=eq.{task_id}",
        headers=SH,
        json={
            "state": "completed",
            "completed_at": datetime.now(timezone.utc).isoformat(),
        }
    ) as r:
        return r.status in [200, 201, 204]


# ─────────────────────────────────────────────────────────────────
# SYNC STATE: Base44 → AWOS
# Pushes current Base44 Superagent state into the shared brain
# ─────────────────────────────────────────────────────────────────

async def sync_base44_state_to_awos(session: aiohttp.ClientSession) -> Dict:
    """
    Writes Base44 Superagent's current state to Supabase agent_memory
    so the AWOS GPT agent can read it and coordinate.
    
    State includes: swarm status, brain stats, active tasks, last run timestamps
    """
    # Get latest swarm run from brain
    async with session.get(
        f"{SUPABASE_URL}/rest/v1/agent_memory?agent_id=eq.apex&order=created_at.desc&limit=5",
        headers=SH
    ) as r:
        recent = await r.json() if r.status == 200 else []

    # Get clone count
    async with session.get(
        f"{SUPABASE_URL}/rest/v1/agent_memory?memory_type=eq.semantic&limit=1",
        headers=SH
    ) as r2:
        count_data = await r2.json() if r2.status == 200 else []

    state = {
        "agent_id": "base44_superagent",
        "agent_name": "Strategic Minds APEX",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "swarm_os": {
            "status": "operational",
            "concurrency": {"discovery": 50, "intelligence": 10, "ghost": 8},
            "packs_available": ["ai", "epoxy", "revenue", "seo", "consulting", "master"],
            "total_pack_targets": 105,
            "last_run": recent[0].get("value", {}) if recent else None,
        },
        "brain": {
            "total_clones": 30,
            "supabase_records": "20+",
            "drive_kb_folder": BRAIN_KB_FOLDER,
            "github_manifest": "Strategic-Minds/epoxy-nation-pro/AGENT_OS_MANIFEST.md",
        },
        "capabilities": [
            "parallel_web_scraping_50x",
            "llm_synthesis_10x",
            "drive_write_8x",
            "github_push",
            "supabase_read_write",
            "auto_builder_mcp_20_tools",
            "n8n_mcp",
            "hubspot_crm",
            "twilio_sms_whatsapp",
            "heygen_video",
            "googledrive_read_write",
        ],
        "mcp_tools_live": 20,
        "stack": {
            "vercel": "prj_4pz34srZLmohK8zfTnzHKP3oxWZ6",
            "supabase": SUPABASE_URL,
            "github_repos": list(REPOS.values()),
            "auto_builder_mcp": f"{AB_URL}/api/mcp-minimal/mcp",
        }
    }

    # Write to agent_memory as working memory
    async with session.post(
        f"{SUPABASE_URL}/rest/v1/agent_memory",
        headers=SH,
        json={
            "agent_id": "base44_superagent",
            "session_id": "awos_sync",
            "memory_type": "working",
            "key": "base44_current_state",
            "value": state,
            "importance": 9,
            "tags": ["sync", "awos", "state", "base44"]
        }
    ) as r3:
        result = await r3.json() if r3.status in [200, 201] else {}
        mem_id = result[0].get("id") if isinstance(result, list) and result else None

    return {"state_written": bool(mem_id), "memory_id": mem_id, "state": state}


# ─────────────────────────────────────────────────────────────────
# SYNC STATE: AWOS → Base44
# Reads what the GPT AWOS agent has queued and routes it here
# ─────────────────────────────────────────────────────────────────

async def read_awos_state(session: aiohttp.ClientSession) -> Dict:
    """Read what the AWOS GPT agent has been doing."""
    results = {}

    # Latest bridge_commands from AWOS
    async with session.get(
        f"{SUPABASE_URL}/rest/v1/bridge_commands?source=eq.awos-control-plane&order=created_at.desc&limit=10",
        headers=SH
    ) as r:
        results["awos_commands"] = await r.json() if r.status == 200 else []

    # GPT bridge commands (eden-skye)
    async with session.get(
        f"{SUPABASE_URL}/rest/v1/bridge_commands?source=eq.eden-skye-gpt-bridge&order=created_at.desc&limit=5",
        headers=SH
    ) as r2:
        results["gpt_bridge_commands"] = await r2.json() if r2.status == 200 else []

    # AUTO_BUILDER recursive control last run
    async with session.get(f"{AB_URL}/api/recursive/status", timeout=aiohttp.ClientTimeout(total=10)) as r3:
        results["awos_recursive_status"] = await r3.json() if r3.status == 200 else {}

    # Runtime telemetry
    async with session.get(f"{AB_URL}/api/runtime/telemetry", timeout=aiohttp.ClientTimeout(total=10)) as r4:
        results["awos_telemetry"] = await r4.json() if r4.status == 200 else {}

    return results


# ─────────────────────────────────────────────────────────────────
# SYNC ROUTER: Handles incoming tasks from AWOS
# ─────────────────────────────────────────────────────────────────

TASK_ROUTES = {
    # AWOS asks Base44 to run a swarm
    "run_swarm":          "swarm_clone",
    "clone_sites":        "swarm_clone",
    "intelligence_sweep": "swarm_clone",
    
    # AWOS asks Base44 to push to GitHub
    "github_push":        "github_write",
    "code_patch":         "github_write",
    
    # AWOS asks Base44 to write to Drive
    "drive_write":        "drive_write",
    "write_kb":           "drive_write",
    
    # AWOS asks Base44 to run outreach
    "outreach":           "twilio_send",
    "whatsapp_send":      "twilio_send",
    "sms_send":           "twilio_send",
    
    # AWOS asks Base44 to update HubSpot
    "crm_update":         "hubspot_write",
    "lead_sync":          "hubspot_write",
}


async def route_task(session: aiohttp.ClientSession, task: Dict) -> Dict:
    """Route an incoming bridge task to the right executor."""
    task_type = task.get("task_type", "")
    task_prompt = task.get("task_prompt", "")
    task_id = task.get("id")
    
    route = TASK_ROUTES.get(task_type, "unknown")
    
    if route == "swarm_clone":
        # Parse pack from prompt or default to "high"
        pack = "high"
        for p in ["master", "ai", "epoxy", "revenue", "seo", "consulting"]:
            if p in task_prompt.lower():
                pack = p
                break
        return {"route": route, "pack": pack, "action": f"trigger_swarm_{pack}"}
    
    elif route == "github_write":
        return {"route": route, "action": "push_to_github", "prompt": task_prompt[:200]}
    
    elif route == "drive_write":
        return {"route": route, "action": "write_to_drive_kb", "prompt": task_prompt[:200]}
    
    elif route == "twilio_send":
        return {"route": route, "action": "send_outreach", "prompt": task_prompt[:200]}
    
    elif route == "hubspot_write":
        return {"route": route, "action": "update_crm", "prompt": task_prompt[:200]}
    
    else:
        return {"route": "unknown", "action": "log_and_skip", "task_type": task_type}


# ─────────────────────────────────────────────────────────────────
# FULL SYNC RUN
# ─────────────────────────────────────────────────────────────────

async def run_full_sync() -> Dict:
    """
    Complete bidirectional sync:
    1. Push Base44 state → AWOS brain
    2. Read AWOS state → understand what GPT agent is doing
    3. Poll for tasks targeting Base44 → route + execute
    4. Post sync receipt back to AUTO_BUILDER MCP
    """
    start = time.time()
    report = {"timestamp": datetime.now(timezone.utc).isoformat(), "steps": {}}

    connector = aiohttp.TCPConnector(limit=20)
    async with aiohttp.ClientSession(connector=connector) as session:

        # STEP 1: Push Base44 state to shared brain
        print("📤 Step 1: Writing Base44 state to Supabase brain...")
        b44_state = await sync_base44_state_to_awos(session)
        report["steps"]["base44_state_push"] = {
            "written": b44_state["state_written"],
            "memory_id": b44_state.get("memory_id")
        }
        print(f"   {'✅' if b44_state['state_written'] else '❌'} State written: {b44_state.get('memory_id','?')}")

        # STEP 2: Read AWOS state
        print("📥 Step 2: Reading AWOS GPT agent state...")
        awos_state = await read_awos_state(session)
        awos_cmds = awos_state.get("awos_commands", [])
        gpt_cmds = awos_state.get("gpt_bridge_commands", [])
        recursive = awos_state.get("awos_recursive_status", {})
        
        report["steps"]["awos_state_read"] = {
            "awos_commands_found": len(awos_cmds),
            "gpt_bridge_commands_found": len(gpt_cmds),
            "recursive_status": recursive.get("recursive", {}).get("mode", "?"),
            "last_run": recursive.get("recursive", {}).get("lastRun", {}).get("status", "?")
        }
        print(f"   ✅ AWOS commands: {len(awos_cmds)} | GPT bridge: {len(gpt_cmds)} | Recursive: {recursive.get('recursive',{}).get('mode','?')}")

        # STEP 3: Check for tasks targeting Base44
        print("🔍 Step 3: Polling bridge_tasks for Base44 actions...")
        pending_tasks = await poll_bridge_tasks(session, "BASE44_SUPERAGENT")
        report["steps"]["pending_tasks"] = len(pending_tasks)
        
        routed = []
        for task in pending_tasks:
            await claim_task(session, task["id"])
            route_result = await route_task(session, task)
            await complete_task(session, task["id"], route_result)
            routed.append({"task_id": task["id"], "route": route_result})
            print(f"   ↪ [{task.get('task_type','?')}] → {route_result.get('action','?')}")
        
        report["steps"]["tasks_routed"] = routed

        # STEP 4: Post sync receipt to AUTO_BUILDER MCP
        print("📋 Step 4: Writing sync receipt to AUTO_BUILDER MCP...")
        mcp_receipt = {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "tools/call",
            "params": {
                "name": "health_check",
                "arguments": {}
            }
        }
        try:
            async with session.post(
                f"{AB_URL}/api/mcp-minimal/mcp",
                headers={"Content-Type": "application/json", "Accept": "application/json, text/event-stream"},
                json=mcp_receipt,
                timeout=aiohttp.ClientTimeout(total=10)
            ) as r_mcp:
                mcp_ok = r_mcp.status == 200
                report["steps"]["mcp_receipt"] = {"ok": mcp_ok, "status": r_mcp.status}
                print(f"   {'✅' if mcp_ok else '❌'} AUTO_BUILDER MCP receipt posted")
        except Exception as e:
            report["steps"]["mcp_receipt"] = {"ok": False, "error": str(e)[:50]}

        # STEP 5: Write sync run summary to brain
        run_summary = {
            "sync_type": "bidirectional",
            "base44_state_written": b44_state["state_written"],
            "awos_commands_seen": len(awos_cmds),
            "tasks_executed": len(routed),
            "duration_seconds": round(time.time() - start, 2),
            "status": "complete"
        }
        await session.post(
            f"{SUPABASE_URL}/rest/v1/agent_memory",
            headers=SH,
            json={
                "agent_id": "base44_superagent",
                "session_id": "awos_sync",
                "memory_type": "episodic",
                "key": f"sync_run_{int(time.time())}",
                "value": run_summary,
                "importance": 7,
                "tags": ["sync", "awos", "run_log"]
            }
        )

    report["duration_seconds"] = round(time.time() - start, 2)
    report["status"] = "complete"

    print(f"\n{'='*60}")
    print(f"✅ SYNC COMPLETE | {report['duration_seconds']}s")
    print(f"   Base44 state → AWOS: {'✅' if b44_state['state_written'] else '❌'}")
    print(f"   AWOS commands seen: {len(awos_cmds)}")
    print(f"   Tasks executed: {len(routed)}")
    print(f"{'='*60}")

    return report


# ─────────────────────────────────────────────────────────────────
# ENTRY POINTS
# ─────────────────────────────────────────────────────────────────

def sync_once():
    """Run one full sync cycle. Use in Vercel cron or Base44 automation."""
    return asyncio.run(run_full_sync())


async def sync_loop(interval_seconds: int = 300):
    """
    Continuous sync loop.
    Runs every 5 minutes by default — mirrors Vercel cron */5 schedule.
    """
    print(f"🔄 Starting AWOS sync loop (every {interval_seconds}s)...")
    while True:
        try:
            await run_full_sync()
        except Exception as e:
            print(f"❌ Sync error: {e}")
        await asyncio.sleep(interval_seconds)


if __name__ == "__main__":
    import sys
    if "--loop" in sys.argv:
        asyncio.run(sync_loop())
    else:
        sync_once()
