'use client';

import { useEffect, useState } from 'react';
import AppShell from '../app-shell';
import { apiFetch } from '../../lib/api';

export default function MyProfilePage() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await apiFetch('/api/profile/me');
        if (!cancelled) setProfile(data);
      } catch (e) {
        if (!cancelled) setError(e.message);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <AppShell title="Profile">
      {error ? (
        <div className="rhq-card rhq-card-pad" style={{ borderColor: 'rgba(248,113,113,0.35)' }}>
          <div style={{ color: '#fecaca', fontWeight: 650 }}>Error</div>
          <div style={{ color: '#e5e7eb', marginTop: 6 }}>{error}</div>
        </div>
      ) : null}

      <div className="rhq-grid rhq-grid-2" style={{ marginTop: 18 }}>
        <div className="rhq-card rhq-card-pad">
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontFamily: 'var(--rhq-font-serif)', fontSize: 22, color: '#f8fafc', fontWeight: 700 }}>
                {profile?.fullName || 'Loading…'}
              </div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>
                {profile?.age ? `${profile.age} years old` : null}
                {profile?.age ? ' · ' : null}
                {profile?.location || 'Location not set'}
              </div>
            </div>
            <a href="/app/profile/edit" className="rhq-btn-primary" style={{ padding: '0.6rem 1rem', fontSize: 13 }}>
              Edit
            </a>
          </div>

          <div style={{ marginTop: 14, color: '#d1d5db', lineHeight: 1.6, fontSize: 13 }}>
            {profile?.bio?.trim() ? profile.bio : 'Add a bio to help the right people understand you.'}
          </div>
        </div>

        <div className="rhq-card rhq-card-pad">
          <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}>Intent</div>
          <div style={{ fontSize: 15, color: '#f8fafc', fontWeight: 700, marginBottom: 10 }}>
            {profile?.intention?.trim() ? profile.intention : 'Not set'}
          </div>

          <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}>Looking for</div>
          <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.6 }}>
            {profile?.lookingFor?.trim()
              ? profile.lookingFor
              : 'Not set yet. Add what you are looking for so matching can work better.'}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

