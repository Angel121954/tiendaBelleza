import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/layout/Footer";
import { getTreatments } from "../api/treatments";
import { benefitPills as localBenefitPills } from "../data/treatments";

const gradients = [
  'linear-gradient(135deg, var(--pink-light), var(--teal-light))',
  'linear-gradient(135deg, var(--teal-light), var(--pink-light))',
];

const fallbackPills = localBenefitPills.map((b, i) => ({
  ...b,
  gradient: gradients[i % gradients.length],
}));

export default function Benefits() {
  const [active, setActive] = useState("");
  const [benefitPills, setBenefitPills] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    getTreatments()
      .then((items) => {
        if (!mounted) return;
        const pills = items.map((t, i) => ({
          id: t.id,
          label: t.name?.split(' ')[0] || t.cat,
          title: t.name,
          time: t.dur || '60 min',
          price: t.price ? `Desde ${t.price}` : '',
          desc: t.shortDesc || '',
          benefits: t.benefits || [],
          ideal: typeof t.ideal === 'string' ? [t.ideal] : (t.ideal || []),
          steps: t.steps || [],
          gradient: gradients[i % gradients.length],
        }));
        setBenefitPills(pills);
        if (!mounted) return;
        setActive(pills[0]?.id || '');
      })
      .catch(() => {
        if (!mounted) return;
        setBenefitPills(fallbackPills);
        setActive(fallbackPills[0]?.id || '');
      })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const current = benefitPills.find((b) => b.id === active);

  return (
    <main>
      <div style={{ position: "relative", minHeight: 250, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", overflow: "hidden", padding: "64px 40px" }}>
        <img
          src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=1400&q=85&fit=crop"
          alt="Beneficios capilares"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(77,191,191,0.65) 0%, rgba(61,32,53,0.78) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 560 }}>
          <span className="tag" style={{ color: "#7ee8e8", display: "block", marginBottom: 10 }}>Por qué elegirnos</span>
          <h1 className="serif" style={{ fontSize: 46, fontWeight: 400, color: "#fff", marginBottom: 14 }}>
            Beneficios de nuestros tratamientos
          </h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", fontWeight: 600, lineHeight: 1.7 }}>
            Selecciona un tratamiento para conocer en detalle sus beneficios y cómo funciona.
          </p>
        </div>
      </div>

      {loading ? (
        <div style={{ padding: "32px 40px" }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 30, justifyContent: "center" }}>
            {[1,2,3,4].map((i) => (
              <div key={i} className="skeleton" style={{ height: 34, width: 100, borderRadius: 50 }} />
            ))}
          </div>
          <div className="skeleton" style={{ height: 220, width: "100%", borderRadius: 20, marginBottom: 24 }} />
          <div className="grid-2-col" style={{ gap: 18 }}>
            <div className="skeleton" style={{ height: 220, width: "100%", borderRadius: 18 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="skeleton" style={{ height: 150, width: "100%", borderRadius: 18 }} />
              <div className="skeleton" style={{ height: 200, width: "100%", borderRadius: 18 }} />
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <div className="skeleton" style={{ height: 48, width: 200, borderRadius: 50, margin: "0 auto" }} />
          </div>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", padding: "32px 40px 0", justifyContent: "center" }}>
            {benefitPills.map((b) => (
              <button key={b.id} className={`bpill${active === b.id ? " on" : ""}`} onClick={() => setActive(b.id)}>
                {b.label}
              </button>
            ))}
          </div>

          {current && (
            <div className="sec" style={{ maxWidth: 920, margin: "0 auto" }}>
              <div style={{ background: current.gradient, borderRadius: 20, padding: "36px 32px", textAlign: "center", marginBottom: 24 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 16, color: "var(--pink)" }}>
                  <LeafIcon size={52} />
                </div>
                <h2 className="serif" style={{ fontSize: 30, fontWeight: 400, marginBottom: 8 }}>{current.title}</h2>
                <span className="tag">{current.time} · {current.price}</span>
                <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.75, marginTop: 16, maxWidth: 540, marginLeft: "auto", marginRight: "auto", fontWeight: 600 }}>
                  <span dangerouslySetInnerHTML={{ __html: current.desc }} />
                </p>
              </div>

              <div className="grid-2-col" style={{ gap: 18 }}>
                <div style={{ background: "#fff", border: "1.5px solid var(--border)", borderRadius: 18, padding: 26 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 16, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--dark)" }}>Beneficios</p>
                  {current.benefits.map((b, i) => (
                    <div key={i} className="check-item">
                      <span><CheckIcon /></span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ background: "#fff", border: "1.5px solid var(--border)", borderRadius: 18, padding: 26 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 14, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--dark)" }}>Para quién es ideal</p>
                    {current.ideal.map((item, i) => (
                      <div key={i} className="check-item">
                        <span style={{ color: "var(--pink)" }}><ArrowIcon /></span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ background: "#fff", border: "1.5px solid var(--border)", borderRadius: 18, padding: 26 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 16, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--dark)" }}>Cómo funciona</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
                      {current.steps.map((step, i) => (
                        <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                          <div className="step-num">{i + 1}</div>
                          <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.65, fontWeight: 600 }}>{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ textAlign: "center", marginTop: 32 }}>
                <button className="btn-primary" style={{ padding: "14px 40px", fontSize: 14 }} onClick={() => navigate("/agendar")}>
                  Agendar ahora
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <Footer />
    </main>
  );
}

function LeafIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8C8 10 5.9 16.17 3.82 19.96c.19-.07.37-.14.55-.22C6 18.86 7.5 18 9 18c3 0 5-2 8-2s5 .5 7 2c0-9-4-12-7-10z" />
      <path d="M3 22c0-4 2-8 6-10" />
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
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
