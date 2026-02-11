'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '../../lib/api';
import { setUser } from '../../lib/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [resending, setResending] = useState(false);

  const verificationBlocked = /verify your email/i.test(error);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('registered') === '1') {
      setInfo('Account created. Check your email to verify your account before logging in.');
    } else if (params.get('reset') === '1') {
      setInfo('Password updated. You can now log in.');
    }

    const emailFromQuery = params.get('email');
    if (emailFromQuery) {
      setEmail(emailFromQuery);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setInfo('');
    setBusy(true);

    try {
      const data = await apiFetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      if (data?.id) setUser(data);
      window.location.href = '/app';
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setBusy(false);
    }
  };

  const handleResendVerification = async () => {
    if (!email.trim()) {
      setError('Enter your email first, then resend verification.');
      return;
    }
    setResending(true);
    setInfo('');
    setError('');
    try {
      const data = await apiFetch('/api/auth/resend-verification', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      setInfo(data?.message || 'If this email exists, a verification link has been sent.');
    } catch (err) {
      setError(err.message || 'Could not resend verification email');
    } finally {
      setResending(false);
    }
  };

  return (
    <div
      className="rhq-fullscreen rhq-main-pad rhq-romance-bg"
      style={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2.5rem 1.5rem',
      }}
    >
      <div
        className="rhq-auth-grid"
        style={{
          width: '100%',
          maxWidth: 840,
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 3fr)',
          gap: 32,
          alignItems: 'center',
        }}
      >
        {/* LEFT: short copy */}
        <section
          style={{
            color: '#e5e7eb',
          }}
        >
          <h1
            style={{
              fontSize: 30,
              marginBottom: 10,
              color: 'white',
            }}
          >
            Welcome back to RomanticaHQ
          </h1>
          <p
            style={{
              fontSize: 14,
              color: '#9ca3af',
              maxWidth: 380,
            }}
          >
            Continue your conversations, see who liked you, and keep building
            connections that actually feel good.
          </p>
        </section>

        {/* RIGHT: form */}
        <section>
          <form
            onSubmit={handleSubmit}
            style={{
              backgroundColor: 'white',
              borderRadius: 24,
              padding: '1.75rem',
              boxShadow: '0 24px 50px rgba(15,23,42,0.45)',
            }}
          >
            <h2
              style={{
                fontSize: 20,
                marginTop: 0,
                marginBottom: 12,
              }}
            >
              Log in
            </h2>

            <label style={{ display: 'block', marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 500 }}>Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={fieldStyle}
              />
            </label>

            <label style={{ display: 'block', marginBottom: 20 }}>
              <span style={{ fontSize: 13, fontWeight: 500 }}>Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={fieldStyle}
              />
            </label>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 12,
                marginBottom: 16,
                fontSize: 13,
              }}
            >
              <a href="/forgot-password" style={{ color: '#111827', fontWeight: 600 }}>
                Forgot password?
              </a>
              <a href="/" style={{ color: '#4b5563', textDecoration: 'none' }}>
                Back home
              </a>
            </div>

            <button
              type="submit"
              disabled={busy}
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                borderRadius: 999,
                border: 'none',
                background:
                  'linear-gradient(135deg, #6366f1, #db2777, #f97316)',
                color: 'white',
                fontWeight: 600,
                fontSize: 14,
                cursor: busy ? 'default' : 'pointer',
                opacity: busy ? 0.8 : 1,
              }}
            >
              {busy ? 'Signing you in…' : 'Log in'}
            </button>

            {error ? (
              <p style={{ marginTop: 10, fontSize: 13, color: '#991b1b' }}>{error}</p>
            ) : null}
            {info ? (
              <p style={{ marginTop: 10, fontSize: 13, color: '#065f46' }}>{info}</p>
            ) : null}
            {verificationBlocked ? (
              <button
                type="button"
                className="rhq-btn-secondary"
                onClick={handleResendVerification}
                disabled={resending}
                style={{ marginTop: 8, width: '100%', padding: '0.7rem 1rem' }}
              >
                {resending ? 'Sending verification…' : 'Resend verification email'}
              </button>
            ) : null}

            <p
              style={{
                marginTop: 12,
                fontSize: 13,
                color: '#4b5563',
              }}
            >
              New here?{' '}
              <a
                href="/auth/signup"
                style={{ color: '#111827', fontWeight: 600 }}
              >
                Create an account
              </a>
              .
            </p>
          </form>
        </section>
      </div>
    </div>
  );
}

const fieldStyle = {
  width: '100%',
  marginTop: 4,
  padding: '0.55rem 0.75rem',
  borderRadius: 12,
  border: '1px solid #e5e7eb',
  fontSize: 13,
  outline: 'none',
};
