'use client';

import AppShell from './app-shell';

export default function AppHomePage() {
  return (
    <AppShell title="Dashboard">
      <div className="rhq-grid rhq-grid-2">
        <div className="rhq-card rhq-card-pad">
          <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}>Next step</div>
          <div style={{ fontSize: 16, color: '#f8fafc', fontWeight: 700, marginBottom: 8 }}>
            Complete your profile
          </div>
          <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.6, marginBottom: 14 }}>
            Better profiles produce better matches. Add a calm bio and what you are looking for.
          </div>
          <a href="/app/profile/edit" className="rhq-btn-primary" style={{ padding: '0.65rem 1.05rem', fontSize: 13 }}>
            Edit profile
          </a>
        </div>

        <div className="rhq-card rhq-card-pad">
          <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}>Matching</div>
          <div style={{ fontSize: 16, color: '#f8fafc', fontWeight: 700, marginBottom: 8 }}>
            Explore recommendations
          </div>
          <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.6, marginBottom: 14 }}>
            You will see a small set of profiles at a time. Like or pass. Mutual likes unlock chat.
          </div>
          <a href="/app/matches" className="rhq-btn-secondary" style={{ padding: '0.65rem 1.05rem', fontSize: 13 }}>
            Go to matching
          </a>
        </div>
      </div>
    </AppShell>
  );
}

