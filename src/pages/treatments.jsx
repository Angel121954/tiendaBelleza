import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/layout/Footer";
import { treatments } from "../data/treatments";

const tabs = [
  { value: "todos", label: "Todos" },
  { value: "Hidratación", label: "Hidratación" },
  { value: "Reparación", label: "Reparación" },
  { value: "Crecimiento", label: "Crecimiento" },
];

export default function Treatments() {
  const [active, setActive] = useState("todos");
  const navigate = useNavigate();

  const filtered =
    active === "todos"
      ? treatments
      : treatments.filter((t) => t.cat === active);

  return (
    <main>
      {/* HEADER */}
      <div
        style={{
          position: "relative",
          minHeight: 260,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          overflow: "hidden",
          padding: "60px 40px",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1400&q=85&fit=crop"
          alt="Tratamientos capilares"
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
              "linear-gradient(135deg, rgba(232,99,138,0.7) 0%, rgba(61,32,53,0.75) 100%)",
          }}
        />
        <div style={{ position: "relative", zIndex: 2 }}>
          <span
            className="tag"
            style={{ color: "#f9b8cc", display: "block", marginBottom: 8 }}
          >
            Menú de servicios
          </span>
          <h1
            className="serif"
            style={{ fontSize: 44, fontWeight: 400, color: "#fff" }}
          >
            Nuestros tratamientos
          </h1>
          <p
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.85)",
              marginTop: 10,
              fontWeight: 600,
            }}
          >
            Especializados en hidratación, reparación y crecimiento capilar
          </p>
        </div>
      </div>

      {/* LIST */}
      <div className="sec">
        {/* TABS */}
        <div className="tab-bar">
          {tabs.map((t) => (
            <button
              key={t.value}
              className={`tab${active === t.value ? " on" : ""}`}
              onClick={() => setActive(t.value)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* CARDS */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {filtered.map((t) => (
            <div
              key={t.id}
              className="card"
              style={{
                display: "flex",
                cursor: "pointer",
                borderColor: t.featured ? "var(--pink)" : "var(--border)",
                borderWidth: t.featured ? 2 : 1.5,
                overflow: "hidden",
              }}
              onClick={() => navigate(`/tratamientos/${t.id}`)}
            >
              <div
                style={{
                  width: 140,
                  flexShrink: 0,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <img
                  src={t.img}
                  alt={t.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
              <div style={{ padding: "20px 24px", flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 6,
                  }}
                >
                  <span className="tag">{t.cat}</span>
                  {t.featured && (
                    <span
                      style={{
                        background: "var(--pink-light)",
                        color: "var(--pink)",
                        fontSize: 10,
                        fontWeight: 700,
                        padding: "2px 10px",
                        borderRadius: 50,
                      }}
                    >
                      Popular
                    </span>
                  )}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>
                  {t.name}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--muted)",
                    lineHeight: 1.6,
                    fontWeight: 600,
                    marginBottom: 14,
                  }}
                >
                  {t.shortDesc}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                    flexWrap: "wrap",
                  }}
                >
                  <span className="price">{t.price}</span>
                  <span
                    style={{
                      fontSize: 12,
                      color: "var(--muted)",
                      fontWeight: 600,
                    }}
                  >
                    ⏱ {t.dur}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      color: "var(--muted)",
                      fontWeight: 600,
                    }}
                  >
                    {t.ses}
                  </span>
                  <button
                    className="btn-outline"
                    style={{
                      fontSize: 12,
                      padding: "7px 18px",
                      marginLeft: "auto",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/tratamientos/${t.id}`);
                    }}
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
