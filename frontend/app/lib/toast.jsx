'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [items, setItems] = useState([]);

  const pushToast = useCallback((message, type = 'info') => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setItems((prev) => [...prev, { id, message, type }]);
    window.setTimeout(() => {
      setItems((prev) => prev.filter((i) => i.id !== id));
    }, 2800);
  }, []);

  const value = useMemo(() => ({ pushToast }), [pushToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        style={{
          position: 'fixed',
          right: 16,
          bottom: 16,
          zIndex: 60,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        {items.map((t) => (
          <div
            key={t.id}
            style={{
              minWidth: 220,
              maxWidth: 360,
              padding: '0.65rem 0.8rem',
              borderRadius: 10,
              background: t.type === 'error' ? '#7f1d1d' : t.type === 'success' ? '#14532d' : '#0f172a',
              color: '#f8fafc',
              border: '1px solid rgba(148,163,184,0.35)',
              boxShadow: '0 12px 26px rgba(2,6,23,0.35)',
              fontSize: 13,
            }}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used inside ToastProvider');
  }
  return ctx;
}

