'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '../lib/api';
import { clearAuth, getUser, setUser } from '../lib/auth';

export default function AppShell({ children, title }) {
  const [me, setMe] = useState(() => getUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await apiFetch('/api/me');
        if (!cancelled) {
          setMe(data);
          setUser(data);
        }
      } catch (e) {
        clearAuth();
        window.location.href = '/auth/login';
        return;
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const onLogout = async () => {
    try {
      await apiFetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // Clear local state even if network fails.
    } finally {
      clearAuth();
      window.location.href = '/';
    }
  };

  return (
    <div className="rhq-app-shell">
      <aside className="rhq-app-nav">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 999,
              background: 'radial-gradient(circle at 30% 0, #f97316, #db2777)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 800,
              fontSize: 18,
            }}
          >
            R
          </div>
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ color: '#f8fafc', fontWeight: 700 }}>RomanticaHQ</div>
            <div style={{ color: '#94a3b8', fontSize: 12 }}>App</div>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <a className="rhq-nav-link" href="/app">
            Dashboard
          </a>
          <a className="rhq-nav-link" href="/app/profile">
            Profile
          </a>
          <a className="rhq-nav-link" href="/app/matches">
            Matching
          </a>
          <a className="rhq-nav-link" href="/app/chat">
            Chat
          </a>
        </nav>

        <div style={{ marginTop: 'auto' }}>
          <div className="rhq-app-me">
            <div style={{ fontSize: 12, color: '#94a3b8' }}>Signed in as</div>
            <div style={{ color: '#e5e7eb', fontWeight: 650 }}>
              {me?.fullName || me?.email || (loading ? 'Loading…' : 'Unknown')}
            </div>
          </div>
          <button className="rhq-btn-secondary" type="button" onClick={onLogout} style={{ width: '100%', marginTop: 10 }}>
            Log out
          </button>
        </div>
      </aside>

      <div className="rhq-app-main">
        <header className="rhq-app-header">
          <div>
            <div style={{ fontSize: 12, color: '#94a3b8' }}>RomanticaHQ</div>
            <div style={{ fontFamily: 'var(--rhq-font-serif)', fontSize: 22, color: '#f8fafc', fontWeight: 700 }}>
              {title}
            </div>
          </div>
          <a className="rhq-btn-primary" href="/app/matches" style={{ padding: '0.6rem 1rem', fontSize: 13 }}>
            Find matches
          </a>
        </header>

        <main className="rhq-app-content">{children}</main>
      </div>
    </div>
  );
}
