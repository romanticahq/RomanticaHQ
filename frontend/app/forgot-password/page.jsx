'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    // Backend support for password reset is not wired up yet in this repo.
    // Keep the UI functional and consistent with the cloned design.
    await new Promise((r) => setTimeout(r, 450));
    setStatus({
      type: 'info',
      message: 'Password recovery is launching soon.',
    });
    setLoading(false);
  }

  return (
    <section className="auth-hero auth-hero--image">
      <div className="auth-hero-inner">
        <div className="auth-hero-copy">
          <h1>Reset your password.</h1>
          <p>Enter your email and we&apos;ll send you a reset link.</p>
        </div>

        <div className="auth-card">
          <h2>Forgot password</h2>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="form-field">
              Email
              <input type="email" name="email" autoComplete="email" required />
            </label>

            <button type="submit" className="button button-primary" disabled={loading}>
              {loading ? 'Sending...' : 'Send reset link'}
            </button>
          </form>

          {status ? (
            <p
              className="form-footnote"
              style={{
                marginTop: 16,
                color: status.type === 'error' ? '#b91c1c' : '#0f172a',
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
