"use client";
import { useState } from "react";

const CDN = "https://cdn.shopify.com/s/files/1/0754/8905/0678/files";

const CSS = `
  .portal-wrap {
    min-height: 100vh; background: #050505;
    display: flex; align-items: center; justify-content: center;
    padding: 40px 20px;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  .portal-card {
    background: #0d0d0d; border: 1px solid rgba(255,255,255,.09);
    border-radius: 16px; padding: 48px 40px;
    width: 100%; max-width: 420px;
    box-shadow: 0 40px 80px rgba(0,0,0,.7);
  }
  .portal-logo {
    display: flex; align-items: center; gap: 12px; margin-bottom: 36px;
  }
  .portal-logo-mark {
    width: 40px; height: 40px; background: #F6B800;
    border-radius: 9px; display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 900; color: #000;
  }
  .portal-logo-name { font-size: 16px; font-weight: 900; color: #fff; }
  .portal-logo-sub { font-size: 10px; color: #F6B800; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; }

  .portal-title { font-size: 28px; font-weight: 900; color: #fff; letter-spacing: -0.8px; margin-bottom: 6px; }
  .portal-sub { font-size: 14px; color: rgba(255,255,255,.4); margin-bottom: 32px; }

  .p-label { display: block; font-size: 12px; font-weight: 700; color: rgba(255,255,255,.5); margin-bottom: 7px; letter-spacing: .05em; text-transform: uppercase; }
  .p-input {
    width: 100%; padding: 14px 16px; background: #111; border: 1.5px solid rgba(255,255,255,.1);
    border-radius: 8px; color: #fff; font-size: 15px; margin-bottom: 16px;
    outline: none; transition: border-color .15s; font-family: inherit; display: block;
  }
  .p-input:focus { border-color: #F6B800; }
  .p-input::placeholder { color: rgba(255,255,255,.2); }

  .p-submit {
    width: 100%; padding: 15px; background: #F6B800; color: #000;
    font-weight: 900; font-size: 16px; border: none; border-radius: 8px;
    cursor: pointer; font-family: inherit; transition: background .15s;
    margin-top: 4px;
  }
  .p-submit:hover { background: #e5a800; }
  .p-submit:disabled { opacity: .5; cursor: not-allowed; }

  .p-divider { display: flex; align-items: center; gap: 16px; margin: 24px 0; }
  .p-divider-line { flex: 1; height: 1px; background: rgba(255,255,255,.08); }
  .p-divider-text { font-size: 12px; color: rgba(255,255,255,.25); font-weight: 600; }

  .p-alt-btn {
    width: 100%; padding: 13px; background: transparent;
    color: rgba(255,255,255,.6); font-weight: 700; font-size: 14px;
    border: 1.5px solid rgba(255,255,255,.12); border-radius: 8px;
    cursor: pointer; font-family: inherit; transition: all .15s;
    margin-bottom: 10px; display: block; text-align: center; text-decoration: none;
  }
  .p-alt-btn:hover { border-color: rgba(255,255,255,.3); color: #fff; opacity: 1; }

  .p-footer { margin-top: 28px; text-align: center; font-size: 12px; color: rgba(255,255,255,.2); line-height: 1.7; }
  .p-footer a { color: rgba(246,184,0,.7); text-decoration: none; }
  .p-footer a:hover { color: #F6B800; opacity: 1; }

  .p-error { background: rgba(239,68,68,.12); border: 1px solid rgba(239,68,68,.25); color: #fca5a5; padding: 12px 16px; border-radius: 8px; font-size: 13px; font-weight: 600; margin-bottom: 16px; }
  .p-success { background: rgba(34,197,94,.1); border: 1px solid rgba(34,197,94,.2); color: #86efac; padding: 12px 16px; border-radius: 8px; font-size: 13px; font-weight: 600; margin-bottom: 16px; }

  .p-tab-row { display: flex; margin-bottom: 28px; border-bottom: 1px solid rgba(255,255,255,.08); }
  .p-tab { flex: 1; padding: 12px; text-align: center; font-size: 13px; font-weight: 700; color: rgba(255,255,255,.4); cursor: pointer; border-bottom: 2px solid transparent; background: none; border-top: none; border-left: none; border-right: none; font-family: inherit; transition: all .15s; }
  .p-tab.active { color: #F6B800; border-bottom-color: #F6B800; }
`;

// Simple demo auth — replace with Supabase auth in production
const DEMO_ACCOUNTS = [
  { email: "demo@xpsepoxy.com", password: "epoxy2026", name: "Demo Customer", jobId: "EPX-2024-001" },
  { email: "jeremy@xpsepoxy.com", password: "admin2026", name: "Jeremy Bensen", jobId: "ADMIN", role: "admin" },
];

export default function CustomerPortalPage() {
  const [tab, setTab] = useState<"login"|"track">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [jobId, setJobId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [authed, setAuthed] = useState<typeof DEMO_ACCOUNTS[0] | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    await new Promise(r => setTimeout(r, 800));
    const account = DEMO_ACCOUNTS.find(a => a.email.toLowerCase() === email.toLowerCase() && a.password === password);
    if (account) {
      setAuthed(account);
    } else {
      setError("Invalid email or password. Try demo@xpsepoxy.com / epoxy2026");
    }
    setLoading(false);
  };

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(""); setSuccess("");
    await new Promise(r => setTimeout(r, 800));
    if (jobId.toUpperCase().startsWith("EPX-")) {
      setSuccess(`Job ${jobId.toUpperCase()} found. Redirecting to your project tracker...`);
      setTimeout(() => window.location.href = `/project/${jobId}`, 1500);
    } else {
      setError("Job ID not found. Format: EPX-YYYY-XXX (check your confirmation email)");
    }
    setLoading(false);
  };

  if (authed) {
    if (authed.role === "admin") window.location.href = "/admin-dashboard";
    else window.location.href = `/customer-portal/dashboard`;
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="portal-wrap">
        <div className="portal-card">

          <div className="portal-logo">
            <div className="portal-logo-mark">ENP</div>
            <div>
              <div className="portal-logo-name">Epoxy Nation Pro</div>
              <div className="portal-logo-sub">Client Portal</div>
            </div>
          </div>

          <div className="p-tab-row">
            <button className={`p-tab${tab==="login"?" active":""}`} onClick={() => { setTab("login"); setError(""); setSuccess(""); }}>Sign In</button>
            <button className={`p-tab${tab==="track"?" active":""}`} onClick={() => { setTab("track"); setError(""); setSuccess(""); }}>Track by Job ID</button>
          </div>

          {tab === "login" && (
            <>
              <div className="portal-title">Welcome back</div>
              <div className="portal-sub">Sign in to track your project and view your estimate.</div>
              {error && <div className="p-error">{error}</div>}
              <form onSubmit={handleLogin}>
                <label className="p-label">Email address</label>
                <input className="p-input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
                <label className="p-label">Password</label>
                <input className="p-input" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" />
                <button className="p-submit" type="submit" disabled={loading}>{loading ? "Signing in..." : "Sign In →"}</button>
              </form>
              <div className="p-divider"><div className="p-divider-line"/><span className="p-divider-text">or</span><div className="p-divider-line"/></div>
              <a href="/digital-estimator" className="p-alt-btn">Start a New Digital Estimate</a>
              <a href="https://wa.me/15559730487" className="p-alt-btn" target="_blank" rel="noopener noreferrer">💬 WhatsApp Support</a>
            </>
          )}

          {tab === "track" && (
            <>
              <div className="portal-title">Track Your Job</div>
              <div className="portal-sub">Enter your Job ID from your confirmation email.</div>
              {error && <div className="p-error">{error}</div>}
              {success && <div className="p-success">{success}</div>}
              <form onSubmit={handleTrack}>
                <label className="p-label">Job ID</label>
                <input className="p-input" type="text" placeholder="EPX-2024-001" value={jobId} onChange={e => setJobId(e.target.value)} required />
                <button className="p-submit" type="submit" disabled={loading}>{loading ? "Looking up..." : "Track My Project →"}</button>
              </form>
              <div className="p-divider"><div className="p-divider-line"/><span className="p-divider-text">don't have a job ID?</span><div className="p-divider-line"/></div>
              <a href="/digital-estimator" className="p-alt-btn">Start a New Project →</a>
            </>
          )}

          <div className="p-footer">
            New customer? <a href="/digital-estimator">Start your free estimate</a><br/>
            Need help? <a href="tel:17722090266">772-209-0266</a> · <a href="https://wa.me/15559730487">WhatsApp</a>
          </div>
        </div>
      </div>
    </>
  );
}
