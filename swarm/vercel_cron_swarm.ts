/**
 * STRATEGIC MINDS SWARM OS — VERCEL CRON ENTRY POINTS
 * =====================================================
 * Deploy to: Strategic-Minds/epoxy-nation-pro
 * Routes: /api/cron/swarm-* 
 * 
 * These crons call the Base44 agent via webhook to trigger
 * swarm runs automatically overnight and weekly.
 * 
 * Schedule:
 *   - Nightly AI sweep: 02:00 UTC daily (high-priority targets)
 *   - Weekly master sweep: 03:00 UTC Sunday (all 105 targets)
 *   - Epoxy competitor watch: 06:00 UTC Mon/Wed/Fri
 */

import { NextRequest, NextResponse } from 'next/server';

const BASE44_AGENT_ID = '6a3a1cc6fda8cc665dd22ea4';
const BASE44_WEBHOOK = `https://app.base44.com/api/agents/${BASE44_AGENT_ID}/messages`;
const BASE44_API_KEY = process.env.BASE44_API_KEY || '';
const CRON_SECRET = process.env.CRON_SECRET || '';

// ── Shared trigger function ──────────────────────────────

async function triggerSwarm(pack: string, trigger: string): Promise<NextResponse> {
  const auth = `Bearer ${CRON_SECRET}`;
  
  const message = `
SWARM TRIGGER: ${trigger}
Pack: ${pack}
Timestamp: ${new Date().toISOString()}

Execute swarm run using builds/swarm/run_swarm.py with pack="${pack}".
Report results back with: sites scraped, avg intelligence score, top 5 by score.
Write full results to Supabase brain and Drive KB.
`.trim();

  try {
    const res = await fetch(BASE44_WEBHOOK, {
      method: 'POST',
      headers: {
        'Authorization': auth,
        'Content-Type': 'application/json',
        'x-api-key': BASE44_API_KEY,
      },
      body: JSON.stringify({
        message,
        source: 'vercel_cron',
        trigger,
        pack,
        timestamp: new Date().toISOString(),
      }),
    });

    if (res.ok) {
      return NextResponse.json({ status: 'triggered', pack, trigger, timestamp: new Date().toISOString() });
    } else {
      const err = await res.text();
      return NextResponse.json({ status: 'error', error: err }, { status: 500 });
    }
  } catch (e: any) {
    return NextResponse.json({ status: 'error', error: e.message }, { status: 500 });
  }
}

// ── Validate cron auth ───────────────────────────────────

function isAuthorized(req: NextRequest): boolean {
  const auth = req.headers.get('authorization') || '';
  const cronSec = req.headers.get('x-cron-secret') || '';
  return auth === `Bearer ${CRON_SECRET}` || cronSec === CRON_SECRET || process.env.VERCEL_ENV === 'development';
}

// ── Route: Nightly AI Sweep (daily 02:00 UTC) ───────────
// File: src/app/api/cron/swarm-nightly/route.ts

export async function GET_NIGHTLY(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return triggerSwarm('high', 'nightly_cron_02:00_UTC');
}

// ── Route: Weekly Master Sweep (Sunday 03:00 UTC) ────────
// File: src/app/api/cron/swarm-weekly/route.ts

export async function GET_WEEKLY(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return triggerSwarm('master', 'weekly_master_cron_Sunday_03:00_UTC');
}

// ── Route: Epoxy Competitor Watch (MWF 06:00 UTC) ───────
// File: src/app/api/cron/swarm-epoxy/route.ts

export async function GET_EPOXY(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return triggerSwarm('epoxy', 'epoxy_competitor_watch_MWF_06:00_UTC');
}

// ── Route: Manual trigger (POST /api/swarm/run) ─────────
// File: src/app/api/swarm/run/route.ts

export async function POST_MANUAL(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const pack = body.pack || 'high';
  return triggerSwarm(pack, `manual_${new Date().toISOString()}`);
}
