# STRATEGIC MINDS AGENT OS — MASTER MANIFEST
> Last Updated: 2026-06-25 | Authority: Jeremy Bensen

## AGENT BRAIN FOLDER IDs (Google Drive — Jeremy's Account)
| Folder | ID | Purpose |
|--------|-----|---------|
| BRAIN ROOT | 1ZUM0456yR6DOo0_xPGtasKZhJ4Co-Zkh | SA-created, no quota |
| AI KB Library | 19cWL23tj6EiCYpyeSq9kvhsq4eYai3-n | ✅ Read/Write via SA |
| Epoxy Intel | 1jsgBgyVqgy1YNewV8a7gtX33IJjL3Vdb | ✅ Read/Write via SA |

## DRIVE ACCESS REALITY
- SA (`gpt-agent@strategic-minds-workflow-os.iam.gserviceaccount.com`) can READ all folders
- SA CANNOT write files to personal Drive (no quota) — needs Shared Drive or Jeremy OAuth
- **WORKAROUND**: All agent writes go to → GitHub (code/docs) + Supabase (data/state)
- **Drive is READ-ONLY** for SA → used for KB lookups and competitor intelligence

## SUPABASE — PRIMARY AGENT STATE DB
URL: https://prhppuuwcnmfdhwsagug.supabase.co
Key tables: agent_memory | agent_sessions | agent_runs | pep_leads | ai_content_queue
198 tables active | Full read/write via service role key

## GITHUB — PRIMARY CODE/CONFIG BRAIN  
Org: Strategic-Minds | Repo: epoxy-nation-pro (main = production)
All agent configs, prompts, and manifests stored here

## FULL LIVE STACK
| Service | Status | Key |
|---------|--------|-----|
| Supabase | ✅ LIVE | prhppuuwcnmfdhwsagug |
| GitHub | ✅ LIVE | Strategic-Minds org |
| Vercel | ✅ LIVE | prj_4pz34srZLmohK8zfTnzHKP3oxWZ6 |
| Twilio SMS | ✅ LIVE | +15616780328 |
| Twilio WA | ⚠️ NEEDS TEMPLATES | +15559730487 |
| HeyGen | ✅ LIVE | 3 Jeremy avatars |
| Cohere | ✅ LIVE | embed+rerank |
| GCP | ✅ LIVE | strategic-minds-workflow-os (69 APIs) |
| HubSpot | ✅ LIVE | Portal 245655125 |
| Drive (read) | ✅ LIVE | SA read access |
| Drive (write) | ❌ NEEDS SHARED DRIVE | Personal quota blocked |

## AGENT ROSTER
APEX (governor) | ARIA (comms) | DISCOVERY (research) | INTELLIGENCE (analysis)
OUTREACH (WA/SMS) | GHOST (SEO) | VALIDATOR (QA) | BENCHMARK (A/B)

## TO COMPLETE DRIVE WRITE ACCESS
Jeremy must: Go to drive.google.com → New → Shared drive → Name it "STRATEGIC-MINDS-OS"
Then share it with: gpt-agent@strategic-minds-workflow-os.iam.gserviceaccount.com (Content Manager role)
