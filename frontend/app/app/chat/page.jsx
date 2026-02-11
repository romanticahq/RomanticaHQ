'use client';

import { useEffect, useMemo, useState } from 'react';
import AppShell from '../app-shell';
import { apiFetch } from '../../lib/api';
import { getUser } from '../../lib/auth';

export default function ChatPage() {
  const me = useMemo(() => getUser(), []);
  const [convos, setConvos] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [body, setBody] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const loadConvos = async () => {
    const data = await apiFetch('/api/conversations');
    setConvos(Array.isArray(data) ? data : []);
    if (!activeId && Array.isArray(data) && data[0]?.id) setActiveId(data[0].id);
  };

  const loadMessages = async (conversationId) => {
    const data = await apiFetch(`/api/conversations/${conversationId}/messages`);
    setMessages(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    loadConvos().catch((e) => setInfo(e.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!activeId) return;
    loadMessages(activeId).catch((e) => setInfo(e.message));
  }, [activeId]);

  const onSend = async (e) => {
    e.preventDefault();
    if (!activeId) return;
    setLoading(true);
    setInfo('');
    try {
      const msg = await apiFetch(`/api/conversations/${activeId}/messages`, {
        method: 'POST',
        body: JSON.stringify({ body }),
      });
      setBody('');
      setMessages((prev) => [...prev, msg]);
    } catch (e2) {
      setInfo(e2.message);
    } finally {
      setLoading(false);
    }
  };

  const active = convos.find((c) => c.id === activeId);

  return (
    <AppShell title="Chat">
      <div className="rhq-chat">
        <div className="rhq-card" style={{ padding: 12 }}>
          <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 10 }}>Conversations</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {convos.map((c) => (
              <button
                key={c.id}
                type="button"
                className="rhq-chat-thread"
                onClick={() => setActiveId(c.id)}
                style={{
                  background: c.id === activeId ? 'rgba(2,6,23,0.45)' : 'transparent',
                  borderColor: c.id === activeId ? 'rgba(148,163,184,0.4)' : 'rgba(148,163,184,0.18)',
                }}
              >
                <div style={{ fontWeight: 700, color: '#e5e7eb', fontSize: 13 }}>{c.otherFullName}</div>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>Conversation #{c.id}</div>
              </button>
            ))}
          </div>

          {convos.length === 0 ? (
            <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 10 }}>
              No chats yet. Go to Matching and get a mutual like.
            </div>
          ) : null}
        </div>

        <div className="rhq-card" style={{ padding: 14, display: 'flex', flexDirection: 'column', minHeight: 420 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 12, color: '#9ca3af' }}>Chatting with</div>
              <div style={{ fontFamily: 'var(--rhq-font-serif)', fontSize: 18, color: '#f8fafc', fontWeight: 700 }}>
                {active?.otherFullName || '—'}
              </div>
            </div>
            <button type="button" className="rhq-btn-secondary" onClick={() => loadConvos()} style={{ padding: '0.55rem 0.9rem', fontSize: 13 }}>
              Refresh
            </button>
          </div>

          {info ? (
            <div style={{ color: '#fecaca', fontSize: 13, marginBottom: 10 }}>{info}</div>
          ) : null}

          <div className="rhq-chat-messages">
            {messages.map((m) => {
              const mine = me?.id && m.senderId === me.id;
              return (
                <div key={m.id} className="rhq-chat-bubble" style={{ alignSelf: mine ? 'flex-end' : 'flex-start' }}>
                  <div style={{ color: '#e5e7eb', fontSize: 13, lineHeight: 1.5 }}>{m.body}</div>
                </div>
              );
            })}
          </div>

          <form onSubmit={onSend} style={{ marginTop: 12, display: 'flex', gap: 10 }}>
            <input
              className="rhq-input"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write a calm message…"
              disabled={!activeId || loading}
            />
            <button className="rhq-btn-primary" type="submit" disabled={!activeId || loading} style={{ padding: '0.65rem 1.05rem', fontSize: 13 }}>
              Send
            </button>
          </form>
        </div>
      </div>
    </AppShell>
  );
}

