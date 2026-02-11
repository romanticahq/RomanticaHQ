'use client';

import { useState } from 'react';
import { apiFetch } from '../lib/api';
import { useToast } from '../lib/toast';

export default function ForgotPasswordPage() {
  const { pushToast } = useToast();
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [info, setInfo] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setInfo('');
    setError('');

    try {
      const data = await apiFetch('/api/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      setInfo(data?.message || 'If that email exists, a reset link has been sent.');
      pushToast('If the email exists, a reset link has been sent.', 'success');
    } catch (err) {
      setError(err.message || 'Request failed');
      pushToast(err.message || 'Request failed', 'error');
    } finally {
      setBusy(false);
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
            className="rhq-btn-primary"
            style={{
              width: '100%',
              padding: '0.8rem 1rem',
              fontSize: 14,
              cursor: busy ? 'default' : 'pointer',
              opacity: busy ? 0.8 : 1,
            }}
          >
            {busy ? 'Sending…' : 'Send reset link'}
          </button>

          {error ? (
            <p style={{ marginTop: 12, fontSize: 13, color: '#991b1b' }}>{error}</p>
          ) : null}
          {info ? (
            <p style={{ marginTop: 12, fontSize: 13, color: '#065f46' }}>{info}</p>
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
