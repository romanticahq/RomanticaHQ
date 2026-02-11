export async function apiFetch(path, options = {}) {
  const headers = new Headers(options.headers || {});
  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json');
  }

  const res = await fetch(path, { ...options, headers, credentials: 'include' });

  if (!res.ok) {
    let msg = `Request failed (${res.status})`;
    try {
      const json = await res.json();
      msg = json?.error || json?.message || msg;
    } catch {
      try {
        msg = (await res.text()) || msg;
      } catch {}
    }
    const err = new Error(msg);
    err.status = res.status;
    throw err;
  }

  // Some endpoints may return empty responses later; handle gracefully.
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
