'use client';

export const dynamic = 'force-dynamic';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      return;
    }

    setStatus('loading');

    // Use your backend base URL (env var recommended)
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

    fetch(`${baseUrl}/auth/verify?token=${encodeURIComponent(token)}`, {
      method: 'POST',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Verify failed');
        setStatus('success');
      })
      .catch(() => setStatus('error'));
  }, [token]);

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#020617',
        color: '#e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.5rem',
      }}
    >
      <div
        style={{
          maxWidth: 420,
          width: '100%',
          backgroundColor: '#020617',
          borderRadius: 24,
          border: '1px solid rgba(148,163,184,0.35)',
          padding: '1.75rem 1.5rem',
          boxShadow: '0 24px 60px rgba(15,23,42,0.8)',
        }}
      >
        <h1
          style={{
            fontSize: 22,
            marginBottom: 12,
            color: '#f9fafb',
          }}
        >
          Verify your email
        </h1>

        {status === 'idle' || status === 'loading' ? (
          <>
            <p
              style={{
                fontSize: 14,
                color: '#9ca3af',
                marginBottom: 16,
              }}
            >
              We&apos;re confirming your email so you can start using
              RomanticaHQ.
            </p>
            <p
              style={{
                fontSize: 14,
                color: '#e5e7eb',
              }}
            >
              Please wait a moment…
            </p>
          </>
        ) : null}

        {status === 'success' && (
          <>
            <p
              style={{
                fontSize: 14,
                color: '#bbf7d0',
                marginBottom: 8,
              }}
            >
              ✅ Your email has been verified.
            </p>
            <p
              style={{
                fontSize: 14,
                color: '#e5e7eb',
                marginBottom: 16,
              }}
            >
              You can now log in to your account.
            </p>
            <a
              href="/auth/login"
              style={{
                display: 'inline-block',
                padding: '0.7rem 1.4rem',
                borderRadius: 999,
                background:
                  'linear-gradient(135deg, #f97316, #db2777, #6366f1)',
                color: 'white',
                fontWeight: 600,
                fontSize: 14,
                textDecoration: 'none',
              }}
            >
              Go to login
            </a>
          </>
        )}

        {status === 'error' && (
          <>
            <p
              style={{
                fontSize: 14,
                color: '#fecaca',
                marginBottom: 8,
              }}
            >
              ⚠️ We couldn&apos;t verify this link.
            </p>
            <p
              style={{
                fontSize: 14,
                color: '#e5e7eb',
                marginBottom: 16,
              }}
            >
              Your verification link may be expired or invalid. Try requesting a
              new email from the login page.
            </p>
            <a
              href="/auth/login"
              style={{
                display: 'inline-block',
                padding: '0.7rem 1.4rem',
                borderRadius: 999,
                border: '1px solid rgba(148,163,184,0.8)',
                color: '#e5e7eb',
                fontWeight: 500,
                fontSize: 14,
                textDecoration: 'none',
                backgroundColor: 'rgba(15,23,42,0.9)',
              }}
            >
              Back to login
            </a>
          </>
        )}
      </div>
    </main>
  );
}