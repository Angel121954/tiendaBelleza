import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/layout/Footer";
import { useTreatments } from "../hooks/useTreatments";

export default function Treatments() {
  const [active, setActive] = useState("todos");
  const navigate = useNavigate();
  const { treatments, categories, loading } = useTreatments();

  const filtered = active === "todos" ? treatments : treatments.filter((t) => t.cat === active);
  const tabs = categories.length > 0 ? categories : [
    { value: "todos", label: "Todos" },
    { value: "Hidratación", label: "Hidratación" },
    { value: "Reparación", label: "Reparación" },
    { value: "Crecimiento", label: "Crecimiento" },
  ];

  return (
    <main>
      <div style={{ position: "relative", minHeight: 270, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", overflow: "hidden", padding: "64px 40px" }}>
        <img
          src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1400&q=85&fit=crop"
          alt="Tratamientos capilares"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(232,99,138,0.70) 0%, rgba(61,32,53,0.76) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <span className="tag" style={{ color: "#f9b8cc", display: "block", marginBottom: 10 }}>Menú de servicios</span>
          <h1 className="serif" style={{ fontSize: 46, fontWeight: 400, color: "#fff", marginBottom: 10 }}>Nuestros tratamientos</h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>
            Especializados en hidratación, reparación y crecimiento capilar
          </p>
        </div>
      </div>

      <div className="sec">
        <div className="tab-bar">
          {tabs.map((t) => (
            <button key={t.value} className={`tab${active === t.value ? " on" : ""}`} onClick={() => setActive(t.value)}>
              {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[1,2,3,4].map((i) => (
              <div key={i} className="card" style={{ display: "flex", gap: 16, padding: 16 }}>
                <div className="skeleton" style={{ width: 100, height: 100, borderRadius: 12, flexShrink: 0 }} />
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, justifyContent: "center" }}>
                  <div className="skeleton" style={{ height: 12, width: "30%" }} />
                  <div className="skeleton" style={{ height: 16, width: "60%" }} />
                  <div className="skeleton" style={{ height: 12, width: "90%" }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {filtered.map((t) => (
              <div
                key={t.id}
                className="card"
                style={{ display: "flex", cursor: "pointer", borderColor: t.featured ? "var(--pink)" : "var(--border)", borderWidth: t.featured ? 2 : 1.5 }}
                onClick={() => navigate(`/tratamientos/${t.id}`)}
              >
                <div style={{ width: 140, flexShrink: 0, overflow: "hidden", position: "relative" }}>
                  <img
                    src={t.img}
                    alt={t.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
                <div style={{ padding: "22px 26px", flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 7 }}>
                    <span className="tag">{t.cat}</span>
                    {t.featured && (
                      <span style={{ background: "var(--pink-light)", color: "var(--pink)", fontSize: 10, fontWeight: 700, padding: "2px 12px", borderRadius: 50, letterSpacing: "0.06em" }}>
                        Popular
                      </span>
                    )}
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{t.name}</h3>
                  <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.65, fontWeight: 600, marginBottom: 16 }}>{t.shortDesc}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap" }}>
                    <span className="price">{t.price}</span>
                    {t.dur && (
                      <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
                        <ClockIcon /> {t.dur}
                      </span>
                    )}
                    {t.ses && <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600 }}>{t.ses}</span>}
                    <button
                      className="btn-outline"
                      style={{ fontSize: 12, padding: "7px 20px", marginLeft: "auto" }}
                      onClick={(e) => { e.stopPropagation(); navigate(`/tratamientos/${t.id}`); }}
                    >
                      Ver detalles
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}

function ClockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
