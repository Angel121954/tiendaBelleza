import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTreatmentById } from "../api/treatments";
import { getTreatmentById as getLocalTreatment } from "../data/treatments";
import Footer from "../components/layout/Footer";

export default function TreatmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [t, setT] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getTreatmentById(id)
      .then((treatment) => { if (mounted) setT(treatment); })
      .catch(() => { if (mounted) setT(getLocalTreatment(id) || null); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [id]);

  if (loading) {
    return (
      <main>
        <div style={{ padding: "80px 40px", textAlign: "center", color: "var(--muted)" }}>
          <p style={{ fontWeight: 700, fontSize: 15 }}>Cargando tratamiento...</p>
        </div>
        <Footer />
      </main>
    );
  }

  if (!t) {
    return (
      <main>
        <div style={{ padding: "80px 40px", textAlign: "center" }}>
          <h2>Tratamiento no encontrado</h2>
          <button className="btn-primary" style={{ marginTop: 20 }} onClick={() => navigate("/tratamientos")}>
            Ver tratamientos
          </button>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <div style={{ padding: "16px 40px", borderBottom: "1.5px solid var(--border)" }}>
        <span
          onClick={() => navigate("/tratamientos")}
          style={{ fontSize: 13, color: "var(--muted)", cursor: "pointer", fontWeight: 600 }}
        >
          ← <span style={{ color: "var(--pink)" }}>Tratamientos</span> / {t.name}
        </span>
      </div>

      <div style={{ position: "relative", height: 300, overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
        <img
          src={t.img}
          alt={t.name}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(61,32,53,0.88) 0%, transparent 55%)" }} />
        <div style={{ position: "relative", padding: "36px 40px", color: "#fff" }}>
          <span className="tag" style={{ color: "#7ee8e8" }}>{t.cat}</span>
          <h1 className="serif" style={{ fontSize: 38, fontWeight: 400, marginTop: 6, marginBottom: 14 }}>
            {t.name}
          </h1>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[
              { icon: <ClockIcon />, label: t.dur },
              { icon: <CalendarIcon />, label: t.ses },
            ].map((item, i) => (
              <span
                key={i}
                style={{ fontSize: 13, fontWeight: 600, background: "rgba(255,255,255,0.15)", backdropFilter: "blur(6px)", padding: "5px 16px", borderRadius: 50, display: "flex", alignItems: "center", gap: 6 }}
              >
                {item.icon} {item.label}
              </span>
            ))}
            <span style={{ fontSize: 15, fontWeight: 700, color: "#7ee8e8" }}>{t.price}</span>
          </div>
        </div>
      </div>

      <div className="sec">
        <div className="grid-2-col" style={{ gap: 28 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ background: "#fff", border: "1.5px solid var(--border)", borderRadius: 18, padding: 26 }}>
              <p style={{ fontSize: 12, fontWeight: 700, marginBottom: 14, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)" }}>Descripción</p>
              <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.85, fontWeight: 600 }} dangerouslySetInnerHTML={{ __html: t.desc }} />
            </div>

            {t.steps && t.steps.length > 0 && (
              <div style={{ background: "#fff", border: "1.5px solid var(--border)", borderRadius: 18, padding: 26 }}>
                <p style={{ fontSize: 12, fontWeight: 700, marginBottom: 16, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)" }}>Cómo funciona</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {t.steps.map((step, i) => (
                    <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div className="step-num">{i + 1}</div>
                      <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.65, fontWeight: 600 }}>{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {t.benefits && t.benefits.length > 0 && (
              <div style={{ background: "#fff", border: "1.5px solid var(--border)", borderRadius: 18, padding: 26 }}>
                <p style={{ fontSize: 12, fontWeight: 700, marginBottom: 16, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)" }}>Beneficios</p>
                {t.benefits.map((b, i) => (
                  <div key={i} className="check-item">
                    <span><CheckIcon /></span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            )}

            {t.ideal && (
              <div style={{ background: "#fff", border: "1.5px solid var(--border)", borderRadius: 18, padding: 26 }}>
                <p style={{ fontSize: 12, fontWeight: 700, marginBottom: 14, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)" }}>Para quién es ideal</p>
                <div className="check-item">
                  <span style={{ color: "var(--pink)" }}><ArrowIcon /></span>
                  <span>{typeof t.ideal === 'string' ? t.ideal : t.ideal.join(', ')}</span>
                </div>
              </div>
            )}

            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn-primary" style={{ flex: 1 }} onClick={() => navigate("/agendar")}>
                Agendar ahora
              </button>
              <button className="btn-outline-teal" onClick={() => navigate("/tratamientos")}>
                Volver
              </button>
            </div>

            <div style={{ background: "linear-gradient(135deg, var(--pink-light), var(--teal-light))", border: "1.5px solid var(--border)", borderRadius: 18, padding: 22, textAlign: "center" }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.10em", textTransform: "uppercase", marginBottom: 8 }}>
                Precio del tratamiento
              </p>
              <p className="serif" style={{ fontSize: 34, color: "var(--pink)", fontWeight: 400 }}>{t.price}</p>
              <p style={{ fontSize: 11, color: "var(--muted)", fontWeight: 600, marginTop: 4 }}>Incluye diagnóstico sin costo</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

function ClockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
