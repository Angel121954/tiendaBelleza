const WP_BASE = import.meta.env.VITE_WP_URL;

export async function createBooking(data) {
  const res = await fetch(`${WP_BASE}/wp-json/poder-capilar/v1/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Error al reservar: ${res.status}`);
  }
  return res.json();
}

export async function getAvailableSlots(date) {
  const res = await fetch(`${WP_BASE}/wp-json/poder-capilar/v1/bookings/slots?date=${encodeURIComponent(date)}`);
  if (!res.ok) throw new Error(`Error al obtener horarios: ${res.status}`);
  return res.json();
}
