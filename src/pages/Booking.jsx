import { useState, useEffect } from "react";
import Footer from "../components/layout/Footer";
import { getTreatments } from "../api/treatments";
import { createBooking, getAvailableSlots } from "../api/bookings";
import { treatments as localTreatments } from "../data/treatments";

const DAYS_HEADER = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MONTH_NAMES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

function buildCalendar(year, month) {
  const today = new Date();
  const first = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < first; i++) cells.push({ num: null, disabled: true });
  for (let d = 1; d <= days; d++) {
    const date = new Date(year, month, d);
    cells.push({ num: d, disabled: date < new Date(today.toDateString()) });
  }
  return cells;
}

export default function Booking() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selDay, setSelDay] = useState(null);
  const [selSlot, setSelSlot] = useState(null);
  const [treatment, setTreatment] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const [treatments, setTreatments] = useState([]);
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getTreatments().then(setTreatments).catch(() => {});
  }, []);

  useEffect(() => {
    if (!selDay || !month || !year) return;
    setLoadingSlots(true);
    setSelSlot(null);
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(selDay).padStart(2, '0')}`;
    getAvailableSlots(dateStr)
      .then((data) => setSlots(Array.isArray(data) ? data : []))
      .catch(() => setSlots([]))
      .finally(() => setLoadingSlots(false));
  }, [selDay, month, year]);

  const cells = buildCalendar(year, month);

  const prevMonth = () => { if (month === 0) { setYear((y) => y - 1); setMonth(11); } else setMonth((m) => m - 1); setSelDay(null); setSelSlot(null); };
  const nextMonth = () => { if (month === 11) { setYear((y) => y + 1); setMonth(0); } else setMonth((m) => m + 1); setSelDay(null); setSelSlot(null); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selDay || !selSlot || !treatment || !form.name || !form.email) return;
    setSubmitting(true);
    setError("");
    try {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(selDay).padStart(2, '0')}`;
      await createBooking({
        name: form.name,
        email: form.email,
        phone: form.phone,
        treatment,
        date: dateStr,
        time: selSlot,
        notes: form.notes,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Error al agendar la cita. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main>
        <div style={{ minHeight: "62vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", textAlign: "center", padding: 40 }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "var(--teal-light)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, color: "var(--teal)" }}>
            <CheckCircleIcon size={40} />
          </div>
          <h2 className="serif" style={{ fontSize: 32, marginBottom: 14 }}>Cita agendada</h2>
          <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.75, fontWeight: 600, maxWidth: 440 }}>
            Hola <strong style={{ color: "var(--dark)" }}>{form.name}</strong>, tu cita para{" "}
            <strong style={{ color: "var(--dark)" }}>{treatment}</strong> el{" "}
            <strong style={{ color: "var(--dark)" }}>{selDay} de {MONTH_NAMES[month]}</strong>{" "}
            a las <strong style={{ color: "var(--dark)" }}>{selSlot}</strong> ha sido confirmada.
            Te enviaremos un recordatorio a <strong style={{ color: "var(--dark)" }}>{form.email}</strong>.
          </p>
          <button
            className="btn-primary"
            style={{ marginTop: 28 }}
            onClick={() => { setSubmitted(false); setSelDay(null); setSelSlot(null); setForm({ name: "", email: "", phone: "", notes: "" }); }}
          >
            Agendar otra cita
          </button>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <div style={{ padding: "52px 40px", background: "linear-gradient(135deg, var(--pink-light) 0%, var(--teal-light) 100%)", textAlign: "center", borderBottom: "1.5px solid var(--border)" }}>
        <span className="tag" style={{ display: "block", marginBottom: 8 }}>Agenda en línea</span>
        <h1 className="serif" style={{ fontSize: 40, fontWeight: 400, marginBottom: 10 }}>Reserva tu cita</h1>
        <p style={{ fontSize: 14, color: "var(--muted)", fontWeight: 600 }}>
          Selecciona fecha, hora y tratamiento. El diagnóstico es sin costo.
        </p>
      </div>

      <div className="sec">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ background: "#fff", border: "1.5px solid var(--border)", borderRadius: 18, padding: 24 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <button onClick={prevMonth} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "var(--muted)", lineHeight: 1 }}>‹</button>
                <span style={{ fontSize: 14, fontWeight: 700 }}>{MONTH_NAMES[month]} {year}</span>
                <button onClick={nextMonth} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "var(--muted)", lineHeight: 1 }}>›</button>
              </div>
              <div className="cal">
                {DAYS_HEADER.map((d) => <div key={d} className="cd hd">{d}</div>)}
                {cells.map((c, i) =>
                  c.num ? (
                    <div key={i} className={`cd${c.disabled ? " dis" : ""}${selDay === c.num && !c.disabled ? " sel" : ""}`} onClick={() => { if (!c.disabled) { setSelDay(c.num); setSelSlot(null); } }}>
                      {c.num}
                    </div>
                  ) : <div key={i} className="cd dis" />
                )}
              </div>
            </div>

            {selDay && (
              <div style={{ background: "#fff", border: "1.5px solid var(--border)", borderRadius: 18, padding: 24 }}>
                <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 14 }}>
                  Horarios disponibles — {selDay} de {MONTH_NAMES[month]}
                </p>
                <div className="ts">
                  {loadingSlots ? (
                    [1,2,3,4,5,6].map((i) => (
                      <div key={i} className="skeleton" style={{ height: 38, borderRadius: 50 }} />
                    ))
                  ) : slots.length > 0 ? slots.map((s) => (
                    <div key={s.t} className={`slot${s.off ? " off" : ""}${selSlot === s.t ? " on" : ""}`} onClick={() => !s.off && setSelSlot(s.t)}>
                      {s.t}
                    </div>
                  )) : (
                    <p style={{ fontSize: 12, color: "var(--muted)", gridColumn: "1 / -1", textAlign: "center" }}>No hay horarios disponibles</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div>
            <div style={{ background: "#fff", border: "1.5px solid var(--border)", borderRadius: 18, padding: 28 }}>
              <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 24 }}>Tus datos</p>
              <form onSubmit={handleSubmit}>
                <div className="fg">
                  <label>Tratamiento *</label>
                  <select value={treatment} onChange={(e) => setTreatment(e.target.value)} required>
                    <option value="">Selecciona un tratamiento</option>
                    {treatments.map((t) => <option key={t.id} value={t.name}>{t.name} — {t.price}</option>)}
                  </select>
                </div>
                <div className="fg">
                  <label>Nombre completo *</label>
                  <input type="text" placeholder="Tu nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div className="fg">
                  <label>Correo electrónico *</label>
                  <input type="email" placeholder="tu@correo.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                </div>
                <div className="fg">
                  <label>WhatsApp / Teléfono</label>
                  <input type="tel" placeholder="+57 310 000 0000" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="fg">
                  <label>Notas adicionales</label>
                  <textarea rows={3} placeholder="¿Tienes alguna condición capilar que debamos saber?" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
                </div>

                {(selDay || selSlot) && (
                  <div style={{ background: "var(--cream)", borderRadius: 12, padding: "14px 16px", marginBottom: 18, fontSize: 13, fontWeight: 600, color: "var(--muted)", lineHeight: 1.9 }}>
                    {selDay && <p>Fecha: <strong style={{ color: "var(--dark)" }}>{selDay} de {MONTH_NAMES[month]} de {year}</strong></p>}
                    {selSlot && <p>Hora: <strong style={{ color: "var(--dark)" }}>{selSlot}</strong></p>}
                    {treatment && <p>Tratamiento: <strong style={{ color: "var(--dark)" }}>{treatment}</strong></p>}
                  </div>
                )}

                {error && (
                  <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, padding: "12px 16px", marginBottom: 18, fontSize: 13, fontWeight: 600, color: "#dc2626" }}>
                    {error}
                  </div>
                )}

                <button type="submit" className="btn-primary" style={{ width: "100%", padding: "14px 0", fontSize: 14 }} disabled={submitting}>
                  {submitting ? "Agendando..." : "Confirmar cita"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Footer />
    </main>
  );
}

function CheckCircleIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
