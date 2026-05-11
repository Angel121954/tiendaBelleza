import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/layout/Footer";
import { getTreatments } from "../api/treatments";
import { treatments as localTreatments } from "../data/treatments";

export default function Home() {
  const navigate = useNavigate();
  const [treatments, setTreatments] = useState([]);

  useEffect(() => {
    getTreatments()
      .then(setTreatments)
      .catch(() => setTreatments(localTreatments));
  }, []);

  return (
    <main>
      <div style={{ position: "relative", minHeight: 580, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <img
          src="https://images.unsplash.com/photo-1560869713-7d0a29430803?w=1600&q=90&fit=crop&crop=center"
          alt="Tratamiento capilar profesional"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(61,32,53,0.74) 0%, rgba(61,32,53,0.50) 60%, rgba(77,191,191,0.18) 100%)" }} />
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "80px 24px 100px", maxWidth: 680, width: "100%" }}>
          <div
            className="badge-handmade"
            style={{ margin: "0 auto 24px", width: "fit-content", background: "rgba(255,255,255,0.15)", borderColor: "rgba(255,255,255,0.35)", color: "#fff" }}
          >
            <DiamondIcon />
            Hecho a mano · Con amor
          </div>
          <h1 className="serif" style={{ fontSize: 60, fontWeight: 400, lineHeight: 1.13, marginBottom: 22, color: "#fff" }}>
            Tu cabello,
            <br />
            <em style={{ color: "#f9b8cc" }}>transformado</em>
            <br />
            <span style={{ color: "#7ee8e8", fontSize: 42 }}>con amor.</span>
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.88)", lineHeight: 1.8, marginBottom: 34, fontWeight: 500, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
            Tratamientos especializados en hidratación, reparación y crecimiento saludable. Cuidado capilar con el toque especial de Poder Capilar.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              className="btn-primary"
              onClick={() => navigate("/agendar")}
              style={{ padding: "14px 32px", fontSize: 14 }}
            >
              Reservar cita
            </button>
            <button
              onClick={() => navigate("/tratamientos")}
              style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "2px solid rgba(255,255,255,0.6)", padding: "12px 28px", borderRadius: 50, fontFamily: '"Nunito", sans-serif', fontSize: 14, fontWeight: 700, cursor: "pointer", backdropFilter: "blur(6px)", transition: "background 0.2s" }}
            >
              Ver tratamientos
            </button>
          </div>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 48, flexWrap: "wrap" }}>
            {[
              { val: "+500", label: "Clientas felices", color: "var(--pink)" },
              { val: "98%",  label: "Satisfacción",     color: "var(--teal)" },
              { val: "3+",   label: "Años exp.",        color: "var(--pink)" },
              { val: "12",   label: "Tratamientos",     color: "var(--teal)" },
            ].map((s) => (
              <div key={s.label} style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(14px)", borderRadius: 16, padding: "14px 22px", textAlign: "center", boxShadow: "0 6px 24px rgba(0,0,0,0.14)", minWidth: 90 }}>
                <p style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.val}</p>
                <p style={{ fontSize: 10, color: "var(--muted)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 2 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sec" style={{ background: "var(--cream)" }}>
        <div style={{ textAlign: "center", marginBottom: 38 }}>
          <span className="tag" style={{ display: "block", marginBottom: 10 }}>Nuestros servicios</span>
          <h2 className="serif" style={{ fontSize: 38, fontWeight: 400 }}>Tratamientos diseñados para ti</h2>
        </div>
        <div className="g3">
          {treatments.map((t) => (
            <div
              key={t.id}
              className="card"
              style={{ cursor: "pointer", borderColor: t.featured ? "var(--pink)" : "var(--border)", borderWidth: t.featured ? 2 : 1.5 }}
              onClick={() => navigate(`/tratamientos/${t.id}`)}
            >
              <div style={{ position: "relative", height: 170, overflow: "hidden" }}>
                <img
                  src={t.img}
                  alt={t.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(61,32,53,0.55) 0%, transparent 60%)" }} />
                {t.featured && (
                  <div style={{ position: "absolute", top: 10, right: 10, background: "var(--pink)", color: "#fff", fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 12px", borderRadius: 50 }}>
                    Popular
                  </div>
                )}
                <span style={{ position: "absolute", bottom: 10, left: 14, color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  {t.cat}
                </span>
              </div>
              <div style={{ padding: "18px 20px" }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 7 }}>{t.name}</h3>
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, marginBottom: 14, fontWeight: 600 }}>{t.shortDesc}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="price">Desde {t.price}</span>
                  <span style={{ fontSize: 12, color: "var(--pink)", fontWeight: 700 }}>Ver más →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sec">
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div className="divider-deco"><i /></div>
          <span className="tag" style={{ display: "block", marginBottom: 10 }}>Resultados reales</span>
          <h2 className="serif" style={{ fontSize: 38, fontWeight: 400 }}>Antes &amp; Después</h2>
        </div>
        <div className="g3">
          {[
            { img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&q=80&fit=crop", label: "Hidratación intensiva", sub: "1 sesión · Resultado inmediato" },
            { img: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=500&q=80&fit=crop&crop=top", label: "Reconstrucción capilar", sub: "3 sesiones · Cabello reparado" },
            { img: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=500&q=80&fit=crop&crop=faces", label: "Crecimiento activo", sub: "2 meses · Resultado visible" },
          ].map((item) => (
            <div key={item.label} className="card" style={{ overflow: "hidden" }}>
              <div style={{ position: "relative", height: 170, overflow: "hidden" }}>
                <img src={item.img} alt={item.label} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(40%)", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(245,208,220,0.5) 0%, transparent 50%, rgba(230,247,247,0.5) 100%)" }} />
                {["Antes", "Después"].map((lbl, i) => (
                  <div key={lbl} style={{ position: "absolute", top: 10, [i === 0 ? "left" : "right"]: 12, background: i === 0 ? "rgba(194,71,110,0.9)" : "rgba(77,191,191,0.9)", color: "#fff", fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "3px 10px", borderRadius: 50 }}>
                    {lbl}
                  </div>
                ))}
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 1.5, height: "100%", background: "rgba(255,255,255,0.7)" }} />
                </div>
              </div>
              <div style={{ padding: "14px 18px" }}>
                <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{item.label}</p>
                <p style={{ fontSize: 11, color: "var(--muted)", fontWeight: 600 }}>{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sec" style={{ background: "linear-gradient(135deg, var(--pink-light) 0%, var(--teal-light) 100%)" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <span className="tag" style={{ display: "block", marginBottom: 10 }}>Ellas ya lo vivieron</span>
          <h2 className="serif" style={{ fontSize: 38, fontWeight: 400 }}>Lo que dicen nuestras clientas</h2>
        </div>
        <div className="g3">
          {[
            { text: "Mi cabello quedó increíble. Suave y brillante desde la primera sesión. Las chicas de Poder Capilar son lo máximo.", name: "Valentina R.", city: "Cali", initials: "VR", color: "var(--pink)" },
            { text: "Hice 3 sesiones de reconstrucción y el cambio es impresionante. 100% recomendado, se nota el amor con que trabajan.", name: "Camila M.", city: "Palmira", initials: "CM", color: "var(--teal)" },
            { text: "En dos meses noté mucho más cabello y más fuerte. La atención es súper personalizada y amorosa.", name: "Luisa T.", city: "Cali", initials: "LT", color: "var(--pink)" },
          ].map((t) => (
            <div key={t.name} style={{ background: "#fff", border: "1.5px solid var(--border)", borderRadius: 18, padding: 26, boxShadow: "0 4px 24px rgba(61,32,53,0.06)" }}>
              <div style={{ display: "flex", gap: 2, color: "#f59e0b", marginBottom: 12 }}>
                {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
              </div>
              <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.75, marginBottom: 18, fontWeight: 600, fontStyle: "italic" }}>
                "{t.text}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: t.color === "var(--pink)" ? "var(--pink-light)" : "var(--teal-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: t.color }}>
                  {t.initials}
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700 }}>{t.name}</p>
                  <p style={{ fontSize: 11, color: "var(--muted)" }}>{t.city}</p>
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

function DiamondIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="12 2 22 12 12 22 2 12" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
