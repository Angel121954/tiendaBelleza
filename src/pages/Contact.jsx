import { useState } from "react";
import Footer from "../components/layout/Footer";

const INFO_CARDS = [
  {
    title: "Ubicación",
    desc: "Cali, Colombia",
    bg: "var(--pink-light)",
  },
  {
    title: "WhatsApp",
    desc: "+57 310 422 6967 · Lun-Sáb 8am-6pm",
    bg: "var(--teal-light)",
  },
  {
    title: "Instagram",
    desc: "@luisaayslin.accesorios",
    bg: "var(--pink-light)",
  },
  {
    title: "Nuestro lema",
    desc: "Hecho a mano · Con amor · Vuelve pronto",
    bg: "var(--teal-light)",
  },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main>
      {/* HEADER */}
      <div
        style={{
          padding: "56px 40px",
          background:
            "linear-gradient(135deg, var(--teal-light) 0%, var(--pink-light) 100%)",
          textAlign: "center",
          borderBottom: "1.5px solid var(--border)",
        }}
      >
        <span className="tag" style={{ display: "block", marginBottom: 8 }}>
          Estamos aquí para ti
        </span>
        <h1
          className="serif"
          style={{ fontSize: 40, fontWeight: 400, marginBottom: 10 }}
        >
          Contáctanos
        </h1>
        <p
          style={{
            fontSize: 14,
            color: "var(--muted)",
            fontWeight: 600,
            maxWidth: 420,
            margin: "0 auto",
          }}
        >
          Resolvemos tus dudas sobre tratamientos, productos o cómo agendar tu
          cita.
        </p>
      </div>

      {/* CONTENT */}
      <div className="sec">
        <div className="grid-2-col" style={{ gap: 32 }}>
          {/* FORM */}
          <div
            style={{
              background: "#fff",
              border: "1.5px solid var(--border)",
              borderRadius: 18,
              padding: 28,
            }}
          >
            <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 22 }}>
              Envíanos un mensaje
            </p>

            {sent ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>💌</div>
                <h3 className="serif" style={{ fontSize: 22, marginBottom: 8 }}>
                  ¡Mensaje enviado!
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--muted)",
                    fontWeight: 600,
                  }}
                >
                  Te respondemos pronto por correo o WhatsApp.
                </p>
                <button
                  className="btn-outline"
                  style={{ marginTop: 20 }}
                  onClick={() => {
                    setSent(false);
                    setForm({ name: "", email: "", subject: "", message: "" });
                  }}
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
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
                  <label>Asunto</label>
                  <input
                    type="text"
                    placeholder="¿En qué te podemos ayudar?"
                    value={form.subject}
                    onChange={(e) =>
                      setForm({ ...form, subject: e.target.value })
                    }
                  />
                </div>
                <div className="fg">
                  <label>Mensaje *</label>
                  <textarea
                    rows={5}
                    placeholder="Escribe aquí tu consulta o comentario..."
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: "100%", padding: "13px 0", fontSize: 14 }}
                >
                  Enviar mensaje
                </button>
              </form>
            )}
          </div>

          {/* INFO */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div
              style={{
                background: "#fff",
                border: "1.5px solid var(--border)",
                borderRadius: 18,
                padding: 24,
                marginBottom: 4,
              }}
            >
              <p
                className="serif"
                style={{ fontSize: 20, fontWeight: 400, marginBottom: 6 }}
              >
                Luisa &amp; <span style={{ color: "var(--teal)" }}>Ayslin</span>
              </p>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--muted)",
                  lineHeight: 1.7,
                  fontWeight: 600,
                }}
              >
                Especialistas en cuidado capilar natural con más de 3 años
                transformando el cabello de nuestras clientas con amor y
                dedicación.
              </p>
            </div>

            {INFO_CARDS.map((c) => (
              <div
                key={c.title}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  padding: 15,
                  background: c.bg,
                  borderRadius: 14,
                }}
              >
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>
                    {c.title}
                  </p>
                  <p
                    style={{
                      fontSize: 12,
                      color: "var(--muted)",
                      fontWeight: 600,
                    }}
                  >
                    {c.desc}
                  </p>
                </div>
              </div>
            ))}

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/573104226967"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              style={{
                textAlign: "center",
                padding: "13px 0",
                fontSize: 14,
                display: "block",
                textDecoration: "none",
              }}
            >
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
