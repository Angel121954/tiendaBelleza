import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      {/* CTA STRIP */}
      <div
        style={{
          padding: "56px 40px",
          background: "var(--pink)",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontSize: 10,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#fde8ef",
            display: "block",
            marginBottom: 12,
            fontWeight: 700,
          }}
        >
          Agenda tu cita hoy
        </span>
        <h2
          className="serif"
          style={{
            fontSize: 40,
            fontWeight: 400,
            color: "#fff",
            marginBottom: 14,
            fontStyle: "italic",
          }}
        >
          ¿Lista para transformar tu cabello?
        </h2>
        <p
          style={{
            color: "#fde8ef",
            fontSize: 14,
            marginBottom: 28,
            maxWidth: 420,
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: 1.7,
            fontWeight: 600,
          }}
        >
          Agenda tu consulta sin costo y descubramos juntas el tratamiento ideal
          para ti. ¡Con el amor de Luisa &amp; Ayslin!
        </p>
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link to="/agendar" className="btn-white">
            Agendar cita en línea
          </Link>
          <a
            href="https://wa.me/573104226967"
            target="_blank"
            rel="noreferrer"
            style={{
              background: "transparent",
              color: "#fff",
              border: "2px solid rgba(255,255,255,0.5)",
              padding: "10px 24px",
              borderRadius: 50,
              fontFamily: '"Nunito", sans-serif',
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            WhatsApp
          </a>
        </div>
      </div>

      {/* FOOTER BAR */}
      <div
        style={{
          padding: "26px 40px",
          background: "var(--dark)",
          textAlign: "center",
        }}
      >
        <p
          className="serif"
          style={{ fontSize: 20, color: "#fde8ef", marginBottom: 6 }}
        >
          Luisa <span style={{ color: "var(--teal)" }}>&amp;</span> Ayslin
        </p>
        <p
          style={{
            fontSize: 11,
            color: "var(--muted)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          Productos de Belleza · Cuidado Natural
        </p>
        <div
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {[
            { to: "/", label: "Inicio" },
            { to: "/tratamientos", label: "Tratamientos" },
            { to: "/tienda", label: "Tienda" },
            { to: "/contacto", label: "Contacto" },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              style={{
                fontSize: 12,
                color: "var(--muted)",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <p style={{ marginTop: 16, fontSize: 11, color: "#5a3a4a" }}>
          © {new Date().getFullYear()} Luisa &amp; Ayslin · Hecho a mano con
          amor 💕
        </p>
      </div>
    </>
  );
}
