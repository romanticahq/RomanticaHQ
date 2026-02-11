'use client';

import { useEffect, useState } from 'react';
import AppShell from '../app-shell';
import { apiFetch } from '../../lib/api';

function ProfileCard({ p, onLike, onPass, onSuggest }) {
  return (
    <div className="rhq-card rhq-card-pad" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <div style={{ fontFamily: 'var(--rhq-font-serif)', fontSize: 18, fontWeight: 700, color: '#f8fafc' }}>
            {p.fullName}
          </div>
          <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 2 }}>
            {p.age ? `${p.age}` : '—'}
            {' · '}
            {p.location?.trim() ? p.location : 'Location unknown'}
          </div>
        </div>
        <div style={{ fontSize: 12, color: '#cbd5e1', textAlign: 'right' }}>
          <div style={{ color: '#9ca3af' }}>Intention</div>
          <div style={{ fontWeight: 650 }}>{p.intention?.trim() ? p.intention : '—'}</div>
        </div>
      </div>

      <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.6 }}>
        {p.bio?.trim() ? p.bio : 'No bio yet.'}
      </div>

      <div style={{ marginTop: 6, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button type="button" className="rhq-btn-secondary" onClick={() => onPass(p)} style={{ padding: '0.65rem 1.05rem', fontSize: 13 }}>
          Pass
        </button>
        <button type="button" className="rhq-btn-primary" onClick={() => onLike(p)} style={{ padding: '0.65rem 1.05rem', fontSize: 13 }}>
          Like
        </button>
        <button type="button" className="rhq-btn-secondary" onClick={() => onSuggest(p)} style={{ padding: '0.65rem 1.05rem', fontSize: 13 }}>
          AI first message
        </button>
      </div>
    </div>
  );
}

export default function MatchesPage() {
  const [items, setItems] = useState([]);
  const [busyId, setBusyId] = useState(null);
  const [info, setInfo] = useState('');

  const load = async () => {
    setInfo('');
    const data = await apiFetch('/api/recommendations?limit=20');
    setItems(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    load().catch((e) => setInfo(e.message));
  }, []);

  const act = async (p, action) => {
    setBusyId(p.userId);
    setInfo('');
    try {
      const res = await apiFetch('/api/likes', {
        method: 'POST',
        body: JSON.stringify({ targetUserId: p.userId, action }),
      });
      setItems((prev) => prev.filter((x) => x.userId !== p.userId));
      if (res?.matched) {
        setInfo('Matched. You can now chat.');
        // Keep it simple for now: user goes to chat page.
      }
    } catch (e) {
      setInfo(e.message);
    } finally {
      setBusyId(null);
    }
  };

  const onSuggest = async (p) => {
    setBusyId(p.userId);
    setInfo('');
    try {
      const res = await apiFetch(`/api/ai/first-message?targetUserId=${encodeURIComponent(p.userId)}`);
      const s = res?.suggestions?.[0];
      setInfo(s ? `Suggestion: ${s}` : 'No suggestion yet.');
    } catch (e) {
      setInfo(e.message);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <AppShell title="Matching">
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
        <div style={{ fontSize: 13, color: '#94a3b8' }}>
          Like or pass. Mutual likes unlock chat.
        </div>
        <button type="button" className="rhq-btn-secondary" onClick={() => load()} style={{ padding: '0.6rem 1rem', fontSize: 13 }}>
          Refresh
        </button>
      </div>

      {info ? (
        <div className="rhq-card rhq-card-pad" style={{ marginTop: 14 }}>
          <div style={{ color: '#e5e7eb' }}>{info}</div>
          {busyId ? <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 6 }}>Working…</div> : null}
        </div>
      ) : null}

      <div className="rhq-grid rhq-grid-2" style={{ marginTop: 18 }}>
        {items.map((p) => (
          <div key={p.userId} style={{ opacity: busyId && busyId !== p.userId ? 0.6 : 1 }}>
            <ProfileCard
              p={p}
              onLike={() => act(p, 'LIKE')}
              onPass={() => act(p, 'PASS')}
              onSuggest={() => onSuggest(p)}
            />
          </div>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="rhq-card rhq-card-pad" style={{ marginTop: 18 }}>
          <div style={{ color: '#e5e7eb', fontWeight: 650 }}>No recommendations yet</div>
          <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 6 }}>
            Create more users to see recommendations. This is a v1 feed.
          </div>
        </div>
      ) : null}
    </AppShell>
  );
}

