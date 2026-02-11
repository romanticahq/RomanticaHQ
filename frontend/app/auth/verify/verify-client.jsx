'use client';

import { useEffect, useMemo, useState } from 'react';

export default function VerifyClient({ token }) {
  const [state, setState] = useState({ status: 'idle', message: '' });

  const canVerify = useMemo(() => typeof token === 'string' && token.length > 0, [token]);

  useEffect(() => {
    if (!canVerify) return;

    let cancelled = false;
    (async () => {
      setState({ status: 'loading', message: 'Verifying your email…' });
      try {
        const res = await fetch(
          `/api/auth/verify-email?token=${encodeURIComponent(token)}`
        );

        if (!res.ok) {
          let msg = 'Verification failed';
          try {
            const json = await res.json();
            msg = json?.error || json?.message || msg;
          } catch {
            const text = await res.text();
            msg = text || msg;
          }
          throw new Error(msg);
        }

        const data = await res.json().catch(() => null);
        const msg = data?.message || 'Your email is verified. You can now log in.';
        if (!cancelled) setState({ status: 'success', message: msg });
      } catch (err) {
        if (!cancelled) setState({ status: 'error', message: err.message });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [canVerify, token]);

  const subtitle =
    state.status === 'idle'
      ? 'Open the verification link from your email to continue.'
      : state.message;

  return (
    <div
      style={{
        maxWidth: 520,
        width: '100%',
        backgroundColor: 'rgba(15,23,42,0.95)',
        borderRadius: 24,
        border: '1px solid rgba(148,163,184,0.35)',
        padding: '2rem',
        boxShadow: '0 24px 60px rgba(15,23,42,0.8)',
      }}
    >
      <h1 style={{ fontSize: 24, marginBottom: 8, color: '#f9fafb' }}>
        Verify your email
      </h1>

      <p
        style={{
          fontSize: 14,
          color: state.status === 'error' ? '#fecaca' : '#9ca3af',
          marginBottom: 18,
          lineHeight: 1.6,
        }}
      >
        {subtitle}
      </p>

      {!canVerify ? (
        <div
          style={{
            fontSize: 13,
            color: '#e5e7eb',
            backgroundColor: 'rgba(2,6,23,0.35)',
            border: '1px solid rgba(148,163,184,0.35)',
            borderRadius: 16,
            padding: '0.9rem 1rem',
          }}
        >
          Missing verification token. Use the link we sent to your email after signup.
        </div>
      ) : null}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14, marginTop: 18 }}>
        <a href="/auth/login" className="rhq-btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
          Go to login
        </a>
        <a href="/auth/signup" className="rhq-btn-secondary" style={{ padding: '0.7rem 1.5rem' }}>
          Create a new account
        </a>
      </div>

      <p style={{ marginTop: 20, fontSize: 12, color: '#6b7280', lineHeight: 1.6 }}>
        If you have not received an email yet, check spam or try signing up again with the same email to get a new link.
      </p>
    </div>
  );
}
