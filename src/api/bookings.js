// api/bookings.js
// Integración futura con backend de citas (ej: Google Calendar API, Calendly, o backend propio)

export async function createBooking(data) {
  // TODO: Conectar con backend real
  // Por ahora simula un POST exitoso
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, id: Date.now(), ...data }), 800);
  });
}

export async function getAvailableSlots(date) {
  // TODO: Consultar disponibilidad real por fecha
  return ['8:00 am', '9:00 am', '11:00 am', '2:00 pm', '3:00 pm', '4:00 pm'];
}
