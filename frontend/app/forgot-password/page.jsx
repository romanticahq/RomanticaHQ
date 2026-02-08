'use client';

import { useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setMessage('');

    try {
      const res = await fetch(`${API_BASE}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Request failed');
      }

      setMessage('If that email exists, a reset link has been sent.');
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className="rhq-fullscreen rhq-main-pad"
      style={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2.5rem 1.5rem',
        background:
          'radial-gradient(circle at top, rgba(251,113,133,0.16), transparent 55%), #020617',
      }}
    >
      <div style={{ width: '100%', maxWidth: 560 }}>
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: 'white',
            borderRadius: 24,
            padding: '1.75rem',
            boxShadow: '0 24px 50px rgba(15,23,42,0.45)',
          }}
        >
          <h1 style={{ fontSize: 22, marginTop: 0, marginBottom: 10 }}>
            Forgot password
          </h1>
          <p style={{ marginTop: 0, marginBottom: 16, fontSize: 13, color: '#6b7280' }}>
            Enter your email and we&apos;ll send a reset link.
          </p>

          <label style={{ display: 'block', marginBottom: 16 }}>
            <span style={{ fontSize: 13, fontWeight: 500 }}>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={fieldStyle}
            />
          </label>

          <button
            type="submit"
            disabled={busy}
            style={{
              width: '100%',
              padding: '0.8rem 1rem',
              borderRadius: 999,
              border: 'none',
              background: 'linear-gradient(135deg, #f97316, #db2777, #6366f1)',
              color: 'white',
              fontWeight: 600,
              fontSize: 14,
              cursor: busy ? 'default' : 'pointer',
              opacity: busy ? 0.8 : 1,
            }}
          >
            {busy ? 'Sending…' : 'Send reset link'}
          </button>

          {message ? (
            <p style={{ marginTop: 12, fontSize: 13, color: '#111827' }}>{message}</p>
          ) : null}

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 12,
              marginTop: 16,
              fontSize: 13,
            }}
          >
            <a href="/auth/login" style={{ color: '#111827', fontWeight: 600 }}>
              Back to login
            </a>
            <a href="/" style={{ color: '#4b5563', textDecoration: 'none' }}>
              Home
            </a>
          </div>
        </form>
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
