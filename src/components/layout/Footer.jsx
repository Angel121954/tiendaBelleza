import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      {/* CTA STRIP */}
      <div
        style={{
          padding: "64px 40px",
          background: "var(--pink)",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#fde8ef",
            display: "block",
            marginBottom: 14,
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
            marginBottom: 30,
            maxWidth: 420,
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: 1.7,
            fontWeight: 600,
          }}
        >
          Agenda tu consulta sin costo y descubramos juntas el tratamiento ideal
          para ti.
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
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              transition: "border-color 0.2s",
            }}
          >
            <WhatsAppIcon />
            WhatsApp
          </a>
        </div>
      </div>

      {/* FOOTER BAR */}
      <div
        style={{
          padding: "28px 40px",
          background: "var(--dark)",
          textAlign: "center",
        }}
      >
        <p
          className="serif"
          style={{ fontSize: 20, color: "#fde8ef", marginBottom: 6 }}
        >
          Poder Capilar
        </p>
        <p
          style={{
            fontSize: 11,
            color: "var(--muted)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 16,
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
                transition: "color 0.2s",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <p style={{ marginTop: 18, fontSize: 11, color: "#5a3a4a" }}>
          © {new Date().getFullYear()} Sitio web creado por: Ángel David Agudelo
          Cuartas · Hecho con amor
        </p>
      </div>
    </>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
