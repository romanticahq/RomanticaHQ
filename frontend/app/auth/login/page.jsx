'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  // Prefer same-origin API calls in production. In development you can set
  // NEXT_PUBLIC_API_BASE_URL=http://localhost:8080 if you run the API separately.
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    const formEl = event.currentTarget;
    const formData = new FormData(formEl);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(`${apiBase}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed.');
      }

      if (data.accessToken) {
        localStorage.setItem('romantica_token', data.accessToken);
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
          <h1>Welcome back.</h1>
          <p>Log in to continue your conversations and see what&apos;s new.</p>
        </div>

        <div className="auth-card">
          <h2>Log in</h2>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="form-field">
              Email
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
              />
            </label>

            <label className="form-field">
              Password
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                required
              />
            </label>

            <button
              type="submit"
              className="button button-primary"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>

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
            <Link href="/forgot-password" className="form-link">
              Forgot password?
            </Link>
            <Link href="/auth/signup" className="form-link">
              Create an account
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
