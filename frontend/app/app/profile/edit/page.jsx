'use client';

import { useEffect, useState } from 'react';
import AppShell from '../../app-shell';
import { apiFetch } from '../../../lib/api';

export default function EditProfilePage() {
  const [form, setForm] = useState({
    bio: '',
    location: '',
    intention: '',
    lookingFor: '',
  });
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await apiFetch('/api/profile/me');
        if (cancelled) return;
        setForm({
          bio: data?.bio || '',
          location: data?.location || '',
          intention: data?.intention || '',
          lookingFor: data?.lookingFor || '',
        });
      } catch (e) {
        if (!cancelled) setMessage(e.message);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSave = async (e) => {
    e.preventDefault();
    setBusy(true);
    setMessage('');
    try {
      await apiFetch('/api/profile/me', {
        method: 'PUT',
        body: JSON.stringify(form),
      });
      setMessage('Saved.');
    } catch (e2) {
      setMessage(e2.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AppShell title="Edit profile">
      <form onSubmit={onSave} className="rhq-card" style={{ padding: '1.25rem 1.2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'var(--rhq-font-serif)', fontSize: 18, color: '#f8fafc', fontWeight: 700 }}>
              Profile details
            </div>
            <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>
              Keep it honest and calm. Matching works best with clarity.
            </div>
          </div>
          <button type="submit" className="rhq-btn-primary" disabled={busy} style={{ padding: '0.65rem 1.05rem', fontSize: 13 }}>
            {busy ? 'Saving…' : 'Save'}
          </button>
        </div>

        {message ? (
          <div style={{ marginTop: 12, fontSize: 13, color: message === 'Saved.' ? '#86efac' : '#fecaca' }}>
            {message}
          </div>
        ) : null}

        <div className="rhq-grid rhq-grid-2" style={{ marginTop: 16 }}>
          <label style={{ display: 'block' }}>
            <div style={{ fontSize: 13, fontWeight: 650, color: '#e5e7eb', marginBottom: 6 }}>Location</div>
            <input className="rhq-input" name="location" value={form.location} onChange={onChange} placeholder="City, Country" />
          </label>

          <label style={{ display: 'block' }}>
            <div style={{ fontSize: 13, fontWeight: 650, color: '#e5e7eb', marginBottom: 6 }}>Intention</div>
            <input className="rhq-input" name="intention" value={form.intention} onChange={onChange} placeholder="Serious, Slow, Exploring" />
          </label>
        </div>

        <label style={{ display: 'block', marginTop: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 650, color: '#e5e7eb', marginBottom: 6 }}>Looking for</div>
          <input className="rhq-input" name="lookingFor" value={form.lookingFor} onChange={onChange} placeholder="What you want to build" />
        </label>

        <label style={{ display: 'block', marginTop: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 650, color: '#e5e7eb', marginBottom: 6 }}>Bio</div>
          <textarea className="rhq-input" name="bio" value={form.bio} onChange={onChange} rows={6} placeholder="A calm, honest bio. No flexing." />
        </label>
      </form>
    </AppShell>
  );
}

