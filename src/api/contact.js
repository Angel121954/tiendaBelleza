const WP_BASE = import.meta.env.VITE_WP_URL;

export async function sendContactMessage(data) {
  const res = await fetch(`${WP_BASE}/wp-json/poder-capilar/v1/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Contact error: ${res.status} ${res.statusText}`);
  return res.json();
}
