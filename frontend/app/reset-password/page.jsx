'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

export default function ResetPasswordPage() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = useMemo(() => {
    if (typeof window === 'undefined') return '';
    return new URLSearchParams(window.location.search).get('token') || '';
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    const formEl = event.currentTarget;
    const formData = new FormData(formEl);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(`${apiBase}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, ...payload }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || 'Could not reset password.');
      }
      setStatus({ type: 'success', message: data.message });
      formEl?.reset?.();
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-hero auth-hero--image">
      <div className="auth-hero-inner">
        <div className="auth-hero-copy">
          <h1>Set a new password.</h1>
          <p>Choose a new password to regain access to your account.</p>
        </div>

        <div className="auth-card">
          <h2>Reset password</h2>

          {!token ? (
            <p className="form-footnote" style={{ marginTop: 12, color: '#b91c1c' }}>
              Missing reset token. Please request a new reset link.
            </p>
          ) : (
            <form className="auth-form" onSubmit={handleSubmit}>
              <label className="form-field">
                New password
                <input
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </label>

              <button type="submit" className="button button-primary" disabled={loading}>
                {loading ? 'Saving...' : 'Save new password'}
              </button>
            </form>
          )}

          {status ? (
            <p
              className="form-footnote"
              style={{
                marginTop: 16,
                color: status.type === 'error' ? '#b91c1c' : '#047857',
              }}
            >
              {status.message}
            </p>
          ) : null}

          <div className="auth-links">
            <Link href="/auth/login" className="form-link">
              Back to login
            </Link>
            <Link href="/" className="form-link">
              Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

