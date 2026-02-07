'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function VerifyPage() {
  const apiBase =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
  const [status, setStatus] = useState({
    type: 'info',
    message: 'Verifying your email…',
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (!token) {
      setStatus({ type: 'error', message: 'Missing verification token.' });
      return;
    }

    fetch(`${apiBase}/api/auth/verify-email?token=${token}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Verification failed.');
        }
        setStatus({ type: 'success', message: data.message });
      })
      .catch((err) => {
        setStatus({ type: 'error', message: err.message });
      });
  }, [apiBase]);

  const color =
    status.type === 'error'
      ? '#fca5a5'
      : status.type === 'success'
      ? '#86efac'
      : '#fcd34d';

  return (
    <section className="auth-shell">
      <div className="auth-card">
        <h1>Email verification</h1>
        <p style={{ color }}>{status.message}</p>
        <p className="form-footnote" style={{ marginTop: 16 }}>
          Ready to continue?{' '}
          <Link href="/auth/login" className="form-link">
            Log in
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
