'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '../lib/api';
import { useToast } from '../lib/toast';

export default function ResetPasswordClient({ token }) {
  const router = useRouter();
  const { pushToast } = useToast();
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [info, setInfo] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setInfo('');
    setError('');

    try {
      if (!token) throw new Error('Missing reset token.');

      const data = await apiFetch('/api/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({ token, newPassword: password }),
      });
      setInfo(data?.message || 'Password updated. You can now log in.');
      pushToast('Password updated. You can now log in.', 'success');
      router.push('/auth/login?reset=1');
    } catch (err) {
      setError(err.message || 'Reset failed');
      pushToast(err.message || 'Reset failed', 'error');
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
            Reset password
          </h1>
          <p
            style={{
              marginTop: 0,
              marginBottom: 16,
              fontSize: 13,
              color: '#6b7280',
            }}
          >
            Choose a new password to regain access to your account.
          </p>

          <label style={{ display: 'block', marginBottom: 16 }}>
            <span style={{ fontSize: 13, fontWeight: 500 }}>New password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
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
            {busy ? 'Saving…' : 'Save new password'}
          </button>

          {error ? (
            <p style={{ marginTop: 12, fontSize: 13, color: '#991b1b' }}>
              {error}
            </p>
          ) : null}
          {info ? (
            <p style={{ marginTop: 12, fontSize: 13, color: '#065f46' }}>
              {info}
            </p>
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
