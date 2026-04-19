import { useParams, useNavigate } from "react-router-dom";
import { getTreatmentById } from "../data/treatments";
import Footer from "../components/layout/Footer";

export default function TreatmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const t = getTreatmentById(id);

  if (!t) {
    return (
      <div style={{ padding: "80px 40px", textAlign: "center" }}>
        <h2>Tratamiento no encontrado</h2>
        <button
          className="btn-primary"
          style={{ marginTop: 20 }}
          onClick={() => navigate("/tratamientos")}
        >
          Ver tratamientos
        </button>
      </div>
    );
  }

  return (
    <main>
      {/* BACK */}
      <div
        style={{
          padding: "16px 40px",
          borderBottom: "1.5px solid var(--border)",
        }}
      >
        <span
          onClick={() => navigate("/tratamientos")}
          style={{
            fontSize: 13,
            color: "var(--muted)",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          ← <span style={{ color: "var(--pink)" }}>Tratamientos</span> /{" "}
          {t.name}
        </span>
      </div>

      {/* HERO */}
      <div
        style={{
          position: "relative",
          height: 280,
          overflow: "hidden",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <img
          src={t.img}
          alt={t.name}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(61,32,53,0.85) 0%, transparent 60%)",
          }}
        />
        <div
          style={{ position: "relative", padding: "32px 40px", color: "#fff" }}
        >
          <span className="tag" style={{ color: "#7ee8e8" }}>
            {t.cat}
          </span>
          <h1
            className="serif"
            style={{
              fontSize: 36,
              fontWeight: 400,
              marginTop: 6,
              marginBottom: 12,
            }}
          >
            {t.icon} {t.name}
          </h1>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                background: "rgba(255,255,255,0.15)",
                padding: "4px 14px",
                borderRadius: 50,
              }}
            >
              {t.dur}
            </span>
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                background: "rgba(255,255,255,0.15)",
                padding: "4px 14px",
                borderRadius: 50,
              }}
            >
              {t.ses}
            </span>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#7ee8e8" }}>
              {t.price}
            </span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="sec">
        <div className="grid-2-col" style={{ gap: 26 }}>
          {/* LEFT */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Descripción */}
            <div
              style={{
                background: "#fff",
                border: "1.5px solid var(--border)",
                borderRadius: 18,
                padding: 24,
              }}
            >
              <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>
                Descripción
              </p>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--muted)",
                  lineHeight: 1.8,
                  fontWeight: 600,
                }}
              >
                {t.desc}
              </p>
            </div>

            {/* Cómo funciona */}
            <div
              style={{
                background: "#fff",
                border: "1.5px solid var(--border)",
                borderRadius: 18,
                padding: 24,
              }}
            >
              <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 14 }}>
                ¿Cómo funciona?
              </p>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 13 }}
              >
                {t.steps.map((step, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "flex-start",
                    }}
                  >
                    <div className="step-num">{i + 1}</div>
                    <p
                      style={{
                        fontSize: 13,
                        color: "var(--muted)",
                        lineHeight: 1.6,
                        fontWeight: 600,
                      }}
                    >
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Beneficios */}
            <div
              style={{
                background: "#fff",
                border: "1.5px solid var(--border)",
                borderRadius: 18,
                padding: 24,
              }}
            >
              <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 14 }}>
                Beneficios
              </p>
              {t.benefits.map((b, i) => (
                <div key={i} className="check-item">
                  <span>✓</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>

            {/* Ideal para */}
            <div
              style={{
                background: "#fff",
                border: "1.5px solid var(--border)",
                borderRadius: 18,
                padding: 24,
              }}
            >
              <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>
                ¿Para quién es ideal?
              </p>
              <div className="check-item">
                <span style={{ color: "var(--pink)" }}>→</span>
                <span>{t.ideal}</span>
              </div>
            </div>

            {/* CTA */}
            <div style={{ display: "flex", gap: 10 }}>
              <button
                className="btn-primary"
                style={{ flex: 1 }}
                onClick={() => navigate("/agendar")}
              >
                Agendar ahora
              </button>
              <button
                className="btn-outline-teal"
                onClick={() => navigate("/tratamientos")}
              >
                Volver
              </button>
            </div>

            {/* Precio destacado */}
            <div
              style={{
                background:
                  "linear-gradient(135deg, var(--pink-light), var(--teal-light))",
                border: "1.5px solid var(--border)",
                borderRadius: 18,
                padding: 20,
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--muted)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                Precio del tratamiento
              </p>
              <p
                className="serif"
                style={{ fontSize: 32, color: "var(--pink)", fontWeight: 400 }}
              >
                {t.price}
              </p>
              <p
                style={{ fontSize: 11, color: "var(--muted)", fontWeight: 600 }}
              >
                Incluye diagnóstico sin costo
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
