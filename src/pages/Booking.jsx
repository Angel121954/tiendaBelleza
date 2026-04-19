import { useState } from "react";
import Footer from "../components/layout/Footer";
import { treatments } from "../data/treatments";

const DAYS_HEADER = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const TIME_SLOTS = [
  { t: "8:00 am", off: false },
  { t: "9:00 am", off: false },
  { t: "10:00 am", off: true },
  { t: "11:00 am", off: false },
  { t: "12:00 pm", off: true },
  { t: "2:00 pm", off: false },
  { t: "3:00 pm", off: false },
  { t: "4:00 pm", off: false },
];

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

const MONTH_NAMES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export default function Booking() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selDay, setSelDay] = useState(null);
  const [selSlot, setSelSlot] = useState(null);
  const [treatment, setTreatment] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const cells = buildCalendar(year, month);

  const prevMonth = () => {
    if (month === 0) {
      setYear((y) => y - 1);
      setMonth(11);
    } else setMonth((m) => m - 1);
    setSelDay(null);
  };
  const nextMonth = () => {
    if (month === 11) {
      setYear((y) => y + 1);
      setMonth(0);
    } else setMonth((m) => m + 1);
    setSelDay(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selDay || !selSlot || !treatment || !form.name || !form.email) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main>
        <div
          style={{
            minHeight: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
            padding: 40,
          }}
        >
          <div style={{ fontSize: 64, marginBottom: 20 }}>🎉</div>
          <h2 className="serif" style={{ fontSize: 32, marginBottom: 12 }}>
            ¡Cita agendada!
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "var(--muted)",
              lineHeight: 1.7,
              fontWeight: 600,
              maxWidth: 440,
            }}
          >
            Hola <strong>{form.name}</strong>, tu cita para{" "}
            <strong>{treatment}</strong> el{" "}
            <strong>
              {selDay} de {MONTH_NAMES[month]}
            </strong>{" "}
            a las <strong>{selSlot}</strong> ha sido agendada. Te enviaremos
            confirmación a <strong>{form.email}</strong>.
          </p>
          <button
            className="btn-primary"
            style={{ marginTop: 28 }}
            onClick={() => {
              setSubmitted(false);
              setSelDay(null);
              setSelSlot(null);
              setForm({ name: "", email: "", phone: "", notes: "" });
            }}
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
      {/* HEADER */}
      <div
        style={{
          padding: "48px 40px",
          background:
            "linear-gradient(135deg, var(--pink-light) 0%, var(--teal-light) 100%)",
          textAlign: "center",
          borderBottom: "1.5px solid var(--border)",
        }}
      >
        <span className="tag" style={{ display: "block", marginBottom: 8 }}>
          Agenda en línea
        </span>
        <h1
          className="serif"
          style={{ fontSize: 38, fontWeight: 400, marginBottom: 10 }}
        >
          Reserva tu cita
        </h1>
        <p style={{ fontSize: 14, color: "var(--muted)", fontWeight: 600 }}>
          Selecciona fecha, hora y tratamiento. ¡El diagnóstico es sin costo!
        </p>
      </div>

      {/* BOOKING BODY */}
      <div className="sec">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 26,
          }}
        >
          {/* CALENDAR COLUMN */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {/* Calendar card */}
            <div
              style={{
                background: "#fff",
                border: "1.5px solid var(--border)",
                borderRadius: 18,
                padding: 22,
              }}
            >
              {/* Nav */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 14,
                }}
              >
                <button
                  onClick={prevMonth}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 18,
                    color: "var(--muted)",
                  }}
                >
                  ‹
                </button>
                <span style={{ fontSize: 14, fontWeight: 700 }}>
                  {MONTH_NAMES[month]} {year}
                </span>
                <button
                  onClick={nextMonth}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 18,
                    color: "var(--muted)",
                  }}
                >
                  ›
                </button>
              </div>

              {/* Day headers */}
              <div className="cal">
                {DAYS_HEADER.map((d) => (
                  <div key={d} className="cd hd">
                    {d}
                  </div>
                ))}
                {cells.map((c, i) =>
                  c.num ? (
                    <div
                      key={i}
                      className={`cd${c.disabled ? " dis" : ""}${selDay === c.num && !c.disabled ? " sel" : ""}`}
                      onClick={() => !c.disabled && setSelDay(c.num)}
                    >
                      {c.num}
                    </div>
                  ) : (
                    <div key={i} className="cd dis" />
                  ),
                )}
              </div>
            </div>

            {/* Time slots */}
            {selDay && (
              <div
                style={{
                  background: "#fff",
                  border: "1.5px solid var(--border)",
                  borderRadius: 18,
                  padding: 22,
                }}
              >
                <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>
                  Horarios disponibles — {selDay} de {MONTH_NAMES[month]}
                </p>
                <div className="ts">
                  {TIME_SLOTS.map((s) => (
                    <div
                      key={s.t}
                      className={`slot${s.off ? " off" : ""}${selSlot === s.t ? " on" : ""}`}
                      onClick={() => !s.off && setSelSlot(s.t)}
                    >
                      {s.t}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* FORM COLUMN */}
          <div>
            <div
              style={{
                background: "#fff",
                border: "1.5px solid var(--border)",
                borderRadius: 18,
                padding: 28,
              }}
            >
              <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 22 }}>
                Tus datos
              </p>

              <form onSubmit={handleSubmit}>
                {/* Tratamiento */}
                <div className="fg">
                  <label>Tratamiento *</label>
                  <select
                    value={treatment}
                    onChange={(e) => setTreatment(e.target.value)}
                    required
                  >
                    <option value="">Selecciona un tratamiento</option>
                    {treatments.map((t) => (
                      <option key={t.id} value={t.name}>
                        {t.name} — {t.price}
                      </option>
                    ))}
                    <option value="Botox capilar">
                      Botox capilar — Desde $180.000
                    </option>
                    <option value="Keratina nutritiva">
                      Keratina nutritiva — Desde $150.000
                    </option>
                    <option value="Mesoterapia capilar">
                      Mesoterapia capilar — Desde $200.000
                    </option>
                    <option value="Diagnóstico capilar">
                      Diagnóstico capilar — Gratis
                    </option>
                  </select>
                </div>

                <div className="fg">
                  <label>Nombre completo *</label>
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>

                <div className="fg">
                  <label>Correo electrónico *</label>
                  <input
                    type="email"
                    placeholder="tu@correo.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="fg">
                  <label>WhatsApp / Teléfono</label>
                  <input
                    type="tel"
                    placeholder="+57 310 000 0000"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                  />
                </div>

                <div className="fg">
                  <label>Notas adicionales</label>
                  <textarea
                    rows={3}
                    placeholder="¿Tienes alguna condición capilar que debamos saber?"
                    value={form.notes}
                    onChange={(e) =>
                      setForm({ ...form, notes: e.target.value })
                    }
                  />
                </div>

                {/* Summary */}
                {(selDay || selSlot) && (
                  <div
                    style={{
                      background: "var(--cream)",
                      borderRadius: 12,
                      padding: "14px 16px",
                      marginBottom: 18,
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--muted)",
                      lineHeight: 1.8,
                    }}
                  >
                    {selDay && (
                      <p>
                        Fecha:{" "}
                        <strong style={{ color: "var(--dark)" }}>
                          {selDay} de {MONTH_NAMES[month]} de {year}
                        </strong>
                      </p>
                    )}
                    {selSlot && (
                      <p>
                        Hora:{" "}
                        <strong style={{ color: "var(--dark)" }}>
                          {selSlot}
                        </strong>
                      </p>
                    )}
                    {treatment && (
                      <p>
                        Tratamiento:{" "}
                        <strong style={{ color: "var(--dark)" }}>
                          {treatment}
                        </strong>
                      </p>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: "100%", padding: "14px 0", fontSize: 14 }}
                >
                  Confirmar cita
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
