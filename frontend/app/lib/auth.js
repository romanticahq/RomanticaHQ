export const USER_KEY = 'rhq_user';

export function clearAuth() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(USER_KEY);
}

export function setUser(user) {
  if (typeof window === 'undefined') return;
  if (!user) return;
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser() {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
