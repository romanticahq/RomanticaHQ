'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function SignupPage() {
  const apiBase =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(`${apiBase}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Sign up failed.');
      }

      setStatus({ type: 'success', message: data.message });
      event.currentTarget.reset();
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-hero auth-hero--gradient">
      <div className="auth-hero-inner">
        <div className="auth-hero-copy">
          <h1>Create your RomanticaHQ account</h1>
          <p>
            Tell us a few basics so we can start matching you with real people
            who are also looking for honest connection.
          </p>
          <ul className="auth-hero-points">
            <li>
              <span aria-hidden="true">💗</span>
              <span>Free to join. No payment required to start.</span>
            </li>
            <li>
              <span aria-hidden="true">🛡️</span>
              <span>You stay in control of your data and privacy.</span>
            </li>
            <li>
              <span aria-hidden="true">🚫</span>
              <span>Zero tolerance for harassment or abuse.</span>
            </li>
          </ul>
        </div>

        <div className="auth-card">
          <h2>Join</h2>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="form-field">
              Full name
              <input
                type="text"
                name="fullName"
                autoComplete="name"
                required
              />
            </label>

            <label className="form-field">
              Email
              <input type="email" name="email" autoComplete="email" required />
            </label>

            <label className="form-field">
              Password
              <input
                type="password"
                name="password"
                autoComplete="new-password"
                required
              />
            </label>

            <div className="auth-row-2">
              <label className="form-field" style={{ margin: 0 }}>
                Birthday
                <input type="date" name="birthday" required />
              </label>

              <label className="form-field" style={{ margin: 0 }}>
                Gender
                <select name="gender" defaultValue="female" required>
                  <option value="female">Woman</option>
                  <option value="male">Man</option>
                  <option value="nonbinary">Non-binary</option>
                  <option value="other">Other</option>
                </select>
              </label>
            </div>

            <button type="submit" className="button button-primary" disabled={loading}>
              {loading ? 'Creating account...' : 'Create account'}
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

          <p className="form-footnote" style={{ marginTop: 16 }}>
            By signing up you confirm you&apos;re at least 18 and agree to our
            Terms &amp; Privacy Policy.
          </p>
          <p className="form-footnote" style={{ marginTop: 12 }}>
            Already on RomanticaHQ?{' '}
            <Link href="/auth/login" className="form-link">
              Log in instead
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
