import { useState } from "react";
import { sendContactMessage } from "../api/contact";
import Footer from "../components/layout/Footer";

const INFO_CARDS = [
  { title: "Ubicación",    desc: "Cali, Colombia",                           bg: "var(--pink-light)" },
  { title: "WhatsApp",     desc: "+57 310 422 6967 · Lun-Sáb 8am-6pm",      bg: "var(--teal-light)" },
  { title: "Instagram",    desc: "@luisaayslin.accesorios",                   bg: "var(--pink-light)" },
  { title: "Nuestro lema", desc: "Hecho a mano · Con amor · Vuelve pronto",  bg: "var(--teal-light)" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      await sendContactMessage(form);
      setSent(true);
    } catch (err) {
      setError(err.message || "Error al enviar el mensaje. Intenta de nuevo.");
    } finally {
      setSending(false);
    }
  };

  return (
    <main>
      <div style={{ padding: "60px 40px", background: "linear-gradient(135deg, var(--teal-light) 0%, var(--pink-light) 100%)", textAlign: "center", borderBottom: "1.5px solid var(--border)" }}>
        <span className="tag" style={{ display: "block", marginBottom: 8 }}>Estamos aquí para ti</span>
        <h1 className="serif" style={{ fontSize: 42, fontWeight: 400, marginBottom: 10 }}>Contáctanos</h1>
        <p style={{ fontSize: 14, color: "var(--muted)", fontWeight: 600, maxWidth: 420, margin: "0 auto" }}>
          Resolvemos tus dudas sobre tratamientos, productos o cómo agendar tu cita.
        </p>
      </div>

      <div className="sec">
        <div className="grid-2-col" style={{ gap: 34 }}>
          <div style={{ background: "#fff", border: "1.5px solid var(--border)", borderRadius: 18, padding: 30 }}>
            <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 24 }}>Envíanos un mensaje</p>

            {sent ? (
              <div style={{ textAlign: "center", padding: "48px 0" }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--pink-light)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", color: "var(--pink)" }}>
                  <MailIcon size={36} />
                </div>
                <h3 className="serif" style={{ fontSize: 22, marginBottom: 10 }}>Mensaje enviado</h3>
                <p style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600, lineHeight: 1.7 }}>
                  Te respondemos pronto por correo o WhatsApp.
                </p>
                <button className="btn-outline" style={{ marginTop: 22 }} onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}>
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="fg">
                  <label>Nombre completo *</label>
                  <input type="text" placeholder="Tu nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div className="fg">
                  <label>Correo electrónico *</label>
                  <input type="email" placeholder="tu@correo.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                </div>
                <div className="fg">
                  <label>Asunto</label>
                  <input type="text" placeholder="¿En qué te podemos ayudar?" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
                </div>
                <div className="fg">
                  <label>Mensaje *</label>
                  <textarea rows={5} placeholder="Escribe aquí tu consulta o comentario..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
                </div>

                {error && (
                  <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, padding: "12px 16px", marginBottom: 12, fontSize: 13, fontWeight: 600, color: "#dc2626" }}>
                    {error}
                  </div>
                )}

                <button type="submit" className="btn-primary" style={{ width: "100%", padding: "13px 0", fontSize: 14 }} disabled={sending}>
                  {sending ? "Enviando..." : "Enviar mensaje"}
                </button>
              </form>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ background: "#fff", border: "1.5px solid var(--border)", borderRadius: 18, padding: 26, marginBottom: 4 }}>
              <p className="serif" style={{ fontSize: 20, fontWeight: 400, marginBottom: 8 }}>
                Luisa &amp; <span style={{ color: "var(--teal)" }}>Ayslin</span>
              </p>
              <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.75, fontWeight: 600 }}>
                Especialistas en cuidado capilar natural con más de 3 años transformando el cabello de nuestras clientas con amor y dedicación.
              </p>
            </div>

            {INFO_CARDS.map((c) => (
              <div key={c.title} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: 16, background: c.bg, borderRadius: 14 }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{c.title}</p>
                  <p style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600 }}>{c.desc}</p>
                </div>
              </div>
            ))}

            <a
              href="https://wa.me/573104226967"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              style={{ textAlign: "center", padding: "13px 0", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, textDecoration: "none" }}
            >
              <WhatsAppIcon /> Escribir por WhatsApp
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

function MailIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
