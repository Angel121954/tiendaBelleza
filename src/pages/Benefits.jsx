import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/layout/Footer";
import { benefitPills } from "../data/treatments";

export default function Benefits() {
  const [active, setActive] = useState("hidratacion");
  const navigate = useNavigate();

  const current = benefitPills.find((b) => b.id === active);

  return (
    <main>
      {/* HEADER */}
      <div
        style={{
          position: "relative",
          minHeight: 240,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          overflow: "hidden",
          padding: "60px 40px",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=1400&q=85&fit=crop"
          alt="Beneficios capilares"
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
              "linear-gradient(135deg, rgba(77,191,191,0.65) 0%, rgba(61,32,53,0.78) 100%)",
          }}
        />
        <div style={{ position: "relative", zIndex: 2 }}>
          <span
            className="tag"
            style={{ color: "#7ee8e8", display: "block", marginBottom: 8 }}
          >
            Por qué elegirnos
          </span>
          <h1
            className="serif"
            style={{ fontSize: 44, fontWeight: 400, color: "#fff" }}
          >
            Beneficios de nuestros tratamientos
          </h1>
          <p
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.85)",
              marginTop: 10,
              fontWeight: 600,
              maxWidth: 480,
              margin: "10px auto 0",
            }}
          >
            Selecciona un tratamiento para conocer en detalle sus beneficios y
            cómo funciona.
          </p>
        </div>
      </div>

      {/* PILLS */}
      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          padding: "28px 40px 0",
          justifyContent: "center",
        }}
      >
        {benefitPills.map((b) => (
          <button
            key={b.id}
            className={`bpill${active === b.id ? " on" : ""}`}
            onClick={() => setActive(b.id)}
          >
            {b.label}
          </button>
        ))}
      </div>

      {/* PANEL */}
      {current && (
        <div className="sec" style={{ maxWidth: 900, margin: "0 auto" }}>
          {/* HERO CARD */}
          <div
            style={{
              background: current.gradient,
              borderRadius: 18,
              padding: 32,
              textAlign: "center",
              marginBottom: 24,
            }}
          >
            <div style={{ fontSize: 64, marginBottom: 12 }}>
              {current.label.split(" ")[0]}
            </div>
            <h2
              className="serif"
              style={{ fontSize: 28, fontWeight: 400, marginBottom: 8 }}
            >
              {current.title}
            </h2>
            <span className="tag">
              {current.time} · {current.price}
            </span>
            <p
              style={{
                fontSize: 14,
                color: "var(--muted)",
                lineHeight: 1.7,
                marginTop: 14,
                maxWidth: 540,
                marginLeft: "auto",
                marginRight: "auto",
                fontWeight: 600,
              }}
            >
              {current.desc}
            </p>
          </div>

          {/* DETAILS GRID */}
          <div className="grid-2-col" style={{ gap: 16 }}>
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
              {current.benefits.map((b, i) => (
                <div key={i} className="check-item">
                  <span>✓</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>

            {/* Ideal para + pasos */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
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
                {current.ideal.map((item, i) => (
                  <div key={i} className="check-item">
                    <span style={{ color: "var(--pink)" }}>→</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

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
                  style={{ display: "flex", flexDirection: "column", gap: 12 }}
                >
                  {current.steps.map((step, i) => (
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
          </div>

          {/* CTA */}
          <div style={{ textAlign: "center", marginTop: 28 }}>
            <button
              className="btn-primary"
              style={{ padding: "13px 36px", fontSize: 14 }}
              onClick={() => navigate("/agendar")}
            >
              Agendar ahora
            </button>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
