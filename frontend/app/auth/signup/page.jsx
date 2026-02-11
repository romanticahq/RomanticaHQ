'use client';

import { useState } from 'react';
import { apiFetch } from '../../lib/api';

export default function SignupPage() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    gender: '',
    birthday: '',
  });

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);

    const payload = {
      fullName: form.fullName,
      email: form.email,
      password: form.password,
      gender: form.gender,
      birthday: form.birthday,
    };

    try {
      await apiFetch('/api/users/register', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      const encodedEmail = encodeURIComponent(form.email.trim().toLowerCase());
      window.location.href = `/auth/login?registered=1&email=${encodedEmail}`;
    } catch (err) {
      setError(err.message || 'Signup failed');
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
      <div
        className="rhq-auth-grid"
        style={{
          width: '100%',
          maxWidth: 960,
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 2fr)',
          gap: 32,
          alignItems: 'center',
        }}
      >
        {/* LEFT copy */}
        <section
          style={{
            color: '#e5e7eb',
          }}
        >
          <h1
            style={{
              fontSize: 32,
              marginBottom: 12,
              color: 'white',
            }}
          >
            Create your RomanticaHQ account
          </h1>
          <p
            style={{
              marginBottom: 20,
              color: '#9ca3af',
              fontSize: 14,
              maxWidth: 420,
            }}
          >
            Tell us a few basics so we can start matching you with real people
            who are also looking for honest connection.
          </p>

          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'grid',
              gap: 10,
              maxWidth: 380,
              fontSize: 13,
            }}
          >
            <li>Free to join. No payment required to start.</li>
            <li>You stay in control of your data and privacy.</li>
            <li>Zero tolerance for harassment or abuse.</li>
          </ul>
        </section>

        {/* RIGHT form */}
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
            <div style={{ marginBottom: 18 }}>
              <h2
                style={{
                  fontSize: 20,
                  margin: 0,
                  marginBottom: 4,
                }}
              >
                Join for free
              </h2>
              <p
                style={{
                  fontSize: 13,
                  color: '#6b7280',
                  margin: 0,
                }}
              >
                This takes less than 60 seconds. You can complete your profile later.
              </p>
            </div>

            <label style={{ display: 'block', marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 500 }}>Full name</span>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                style={fieldStyle}
              />
            </label>

            <label style={{ display: 'block', marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 500 }}>Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                style={fieldStyle}
              />
            </label>

            <label style={{ display: 'block', marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 500 }}>Password</span>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
                style={fieldStyle}
              />
            </label>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.1fr 0.9fr',
                gap: 12,
                marginBottom: 12,
              }}
            >
              <label style={{ display: 'block' }}>
                <span style={{ fontSize: 13, fontWeight: 500 }}>Birthday</span>
                <input
                  type="date"
                  name="birthday"
                  value={form.birthday}
                  onChange={handleChange}
                  required
                  style={fieldStyle}
                />
              </label>

              <label style={{ display: 'block' }}>
                <span style={{ fontSize: 13, fontWeight: 500 }}>Gender</span>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  required
                  style={fieldStyle}
                >
                  <option value="">Select</option>
                  <option value="MAN">Man</option>
                  <option value="WOMAN">Woman</option>
                  <option value="NON_BINARY">Non-binary</option>
                  <option value="OTHER">Other</option>
                </select>
              </label>
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
                  'linear-gradient(135deg, #f97316, #db2777, #6366f1)',
                color: 'white',
                fontWeight: 600,
                fontSize: 14,
                cursor: busy ? 'default' : 'pointer',
                opacity: busy ? 0.8 : 1,
                marginTop: 4,
              }}
            >
              {busy ? 'Creating your account…' : 'Create account'}
            </button>

            {error ? (
              <p style={{ marginTop: 10, fontSize: 13, color: '#991b1b' }}>{error}</p>
            ) : null}

            <p
              style={{
                marginTop: 12,
                fontSize: 12,
                color: '#6b7280',
              }}
            >
              By signing up you confirm you&apos;re at least 18 and agree to our
              Terms & Privacy Policy.
            </p>

            <p
              style={{
                marginTop: 8,
                fontSize: 13,
                color: '#4b5563',
              }}
            >
              Already on RomanticaHQ?{' '}
              <a
                href="/auth/login"
                style={{ color: '#111827', fontWeight: 600 }}
              >
                Log in instead
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
