'use client';

import { useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);

    try {
      const res = await fetch(`${API_BASE}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Login failed');
      }

      const data = await res.json();
      alert(`Welcome back, ${data.fullName || data.email}!`);
    } catch (err) {
      alert(`Error: ${err.message}`);
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
          'radial-gradient(circle at top, rgba(96,165,250,0.16), transparent 55%), #020617',
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
