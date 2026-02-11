'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import AppShell from '../app-shell';
import { apiFetch } from '../../lib/api';
import { getUser } from '../../lib/auth';
import { useToast } from '../../lib/toast';

export default function ChatPage() {
  const { pushToast } = useToast();
  const me = useMemo(() => getUser(), []);
  const [convos, setConvos] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [body, setBody] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [requestedConversationId, setRequestedConversationId] = useState(null);
  const [unreadByConversation, setUnreadByConversation] = useState({});
  const [typingByConversation, setTypingByConversation] = useState({});
  const wsRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = new URLSearchParams(window.location.search).get('conversationId');
    const id = Number(raw);
    setRequestedConversationId(Number.isFinite(id) && id > 0 ? id : null);
  }, []);

  const loadConvos = async () => {
    const data = await apiFetch('/api/conversations');
    const list = Array.isArray(data) ? data : [];
    setConvos(list);
    if (requestedConversationId && list.some((c) => c.id === requestedConversationId)) {
      setActiveId(requestedConversationId);
      return;
    }
    if (!activeId && list[0]?.id) setActiveId(list[0].id);
  };

  const loadMessages = async (conversationId) => {
    const data = await apiFetch(`/api/conversations/${conversationId}/messages`);
    setMessages(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    loadConvos().catch((e) => setInfo(e.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestedConversationId]);

  useEffect(() => {
    if (!activeId) return;
    setUnreadByConversation((prev) => ({ ...prev, [activeId]: 0 }));
    return () => {
      if (typingTimeoutRef.current) window.clearTimeout(typingTimeoutRef.current);
    };
  }, [activeId]);

  useEffect(() => {
    if (!activeId) return;
    loadMessages(activeId).catch((e) => setInfo(e.message));
  }, [activeId]);

  useEffect(() => {
    if (!activeId) return;
    if (typeof window === 'undefined') return;

    let reconnectTimer = null;
    let disposed = false;

    const closeCurrent = () => {
      if (!wsRef.current) return;
      wsRef.current.onclose = null;
      wsRef.current.close();
      wsRef.current = null;
    };

    const connect = () => {
      const configured = process.env.NEXT_PUBLIC_WS_BASE_URL?.trim();
      const base = configured
        ? configured.replace(/\/$/, '')
        : `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}`;
      const url = `${base}/ws/chat?conversationId=${encodeURIComponent(activeId)}`;
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onmessage = (event) => {
        try {
          const incoming = JSON.parse(event.data);
          if (incoming?.type === 'typing') {
            if (incoming?.conversationId !== activeId || incoming?.userId === me?.id) return;
            setTypingByConversation((prev) => ({ ...prev, [activeId]: Boolean(incoming?.isTyping) }));
            return;
          }
          if (!incoming?.id) return;

          if (incoming.senderId !== me?.id && incoming.conversationId && incoming.conversationId !== activeId) {
            setUnreadByConversation((prev) => ({
              ...prev,
              [incoming.conversationId]: (prev[incoming.conversationId] || 0) + 1,
            }));
          }

          setMessages((prev) => (prev.some((m) => m.id === incoming.id) ? prev : [...prev, incoming]));
        } catch {
          // Ignore invalid payloads.
        }
      };

      ws.onclose = () => {
        if (disposed) return;
        reconnectTimer = setTimeout(connect, 1500);
      };
    };

    closeCurrent();
    connect();

    return () => {
      disposed = true;
      if (reconnectTimer) clearTimeout(reconnectTimer);
      closeCurrent();
    };
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
      setTypingByConversation((prev) => ({ ...prev, [activeId]: false }));
      setMessages((prev) => [...prev, msg]);
    } catch (e2) {
      setInfo(e2.message);
      pushToast(e2.message, 'error');
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
                <div style={{ color: '#94a3b8', fontSize: 12, display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                  <span>Conversation #{c.id}</span>
                  {unreadByConversation[c.id] ? (
                    <span style={{ color: '#fde68a', fontWeight: 700 }}>{unreadByConversation[c.id]} new</span>
                  ) : null}
                </div>
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
          {typingByConversation[activeId] ? (
            <div style={{ color: '#9ca3af', fontSize: 12, marginBottom: 8 }}>Typing…</div>
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
              onChange={(e) => {
                const next = e.target.value;
                setBody(next);
                if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN || !activeId) return;
                wsRef.current.send(JSON.stringify({ type: 'typing', isTyping: true }));
                if (typingTimeoutRef.current) window.clearTimeout(typingTimeoutRef.current);
                typingTimeoutRef.current = window.setTimeout(() => {
                  if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
                    wsRef.current.send(JSON.stringify({ type: 'typing', isTyping: false }));
                  }
                }, 1200);
              }}
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
