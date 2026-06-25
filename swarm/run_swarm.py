"""
APEX SWARM RUNNER — Command line + direct execution
=====================================================
Usage:
  python run_swarm.py --pack ai          # 20 AI framework targets
  python run_swarm.py --pack epoxy       # 30 epoxy/home services targets
  python run_swarm.py --pack revenue     # 20 revenue intel targets
  python run_swarm.py --pack seo        # 20 SEO targets
  python run_swarm.py --pack consulting  # 15 consulting targets
  python run_swarm.py --pack master      # ALL 105 targets (~4 min)
  python run_swarm.py --pack high        # High priority only (~25 targets)
  python run_swarm.py --url https://site.com --name "Site Name" --cat competitor
"""

import asyncio
import argparse
import json
import sys
import os

# Load env
try:
    from dotenv import load_dotenv
    load_dotenv("/app/.agents/.env")
except:
    pass

from swarm_core import clone_sites, ApexOrchestrator
from target_lists import (
    AI_FRAMEWORKS_PACK, REVENUE_INTELLIGENCE_PACK, EPOXY_EXPANSION_PACK,
    SEO_MARKETING_PACK, CONSULTING_INTEL_PACK, MASTER_PACK,
    QUICK_PACK_HIGH_PRIORITY, QUICK_PACK_AI_ONLY, QUICK_PACK_EPOXY_ONLY,
    QUICK_PACK_REVENUE
)

PACK_MAP = {
    "ai": AI_FRAMEWORKS_PACK,
    "revenue": REVENUE_INTELLIGENCE_PACK,
    "epoxy": EPOXY_EXPANSION_PACK,
    "seo": SEO_MARKETING_PACK,
    "consulting": CONSULTING_INTEL_PACK,
    "master": MASTER_PACK,
    "high": QUICK_PACK_HIGH_PRIORITY,
    "all_ai": QUICK_PACK_AI_ONLY,
}


async def main():
    parser = argparse.ArgumentParser(description="Strategic Minds Agent Swarm Runner")
    parser.add_argument("--pack", choices=list(PACK_MAP.keys()), help="Pre-built target pack")
    parser.add_argument("--url", help="Single URL to clone")
    parser.add_argument("--name", help="Site name (for --url mode)")
    parser.add_argument("--cat", default="general", help="Category (for --url mode)")
    parser.add_argument("--priority", type=int, default=7, help="Priority 1-10")
    parser.add_argument("--trigger", default="manual", help="Trigger description")
    parser.add_argument("--output", help="Output JSON file path")
    args = parser.parse_args()

    # Build target list
    if args.url:
        targets = [{"url": args.url, "site_name": args.name or args.url, 
                    "category": args.cat, "priority": args.priority}]
    elif args.pack:
        targets = PACK_MAP[args.pack]
    else:
        # Default: high priority AI + revenue pack
        targets = QUICK_PACK_HIGH_PRIORITY
        print("No pack specified — running high priority targets")

    print(f"\n{'='*60}")
    print(f"STRATEGIC MINDS SWARM OS — APEX ORCHESTRATOR")
    print(f"{'='*60}")
    print(f"Pack: {args.pack or 'custom'} | Targets: {len(targets)}")
    print(f"Concurrency: 50 scrape / 10 LLM / 8 write")
    print(f"{'='*60}\n")

    # Install aiohttp if needed
    try:
        import aiohttp
    except ImportError:
        print("Installing aiohttp...")
        os.system("pip install aiohttp --quiet")
        import aiohttp

    results = await clone_sites(targets, trigger=args.trigger or args.pack or "manual")

    # Print final report
    print(f"\n{'='*60}")
    print(f"SWARM COMPLETE — FULL REPORT")
    print(f"{'='*60}")
    print(f"Total: {results['total_targets']} | Done: {results['completed']} | Failed: {results['failed']}")
    print(f"Time: {results['total_time_seconds']}s | Speed: {results['sites_per_second']} sites/sec")
    print(f"Avg Intelligence Score: {results['avg_intelligence_score']}/100")
    
    print(f"\nRESULTS BY SCORE:")
    for r in results.get("results", []):
        status = "✅" if r["scrape_status"] == "done" else "❌"
        print(f"  {status} [{r['grade']}] {r['site_name'][:45]:<45} score={r['validation_score']}/100")
    
    if args.output:
        with open(args.output, "w") as f:
            json.dump(results, f, indent=2)
        print(f"\nResults saved to: {args.output}")
    
    return results


if __name__ == "__main__":
    asyncio.run(main())
