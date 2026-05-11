import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../api/woocommerce";
import { getProductById as getLocalProduct } from "../data/products";
import { useCart } from "../context/CartContext";
import Footer from "../components/layout/Footer";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [p, setP] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getProductById(id)
      .then((product) => { if (mounted) setP(product); })
      .catch(() => { if (mounted) setP(getLocalProduct(id) || null); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [id]);

  const handleAdd = () => {
    if (!p) return;
    addItem(p, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  if (loading) {
    return (
      <main>
        <div className="sec">
          <div className="grid-2-col" style={{ gap: 40, alignItems: "start" }}>
            <div className="skeleton" style={{ width: "100%", aspectRatio: "1/1", borderRadius: 20 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div className="skeleton" style={{ height: 14, width: "30%" }} />
              <div className="skeleton" style={{ height: 26, width: "70%" }} />
              <div className="skeleton" style={{ height: 14, width: "50%" }} />
              <div className="skeleton" style={{ height: 40, width: "40%", marginTop: 10 }} />
              <div className="skeleton" style={{ height: 48, width: "100%", marginTop: 10 }} />
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!p) {
    return (
      <main>
        <div style={{ padding: "80px 40px", textAlign: "center" }}>
          <h2>Producto no encontrado</h2>
          <button className="btn-primary" style={{ marginTop: 20 }} onClick={() => navigate("/tienda")}>
            Ver tienda
          </button>
        </div>
        <Footer />
      </main>
    );
  }

  const stockOk = p.stock === null || p.stock > 5;

  return (
    <main>
      <div style={{ padding: "16px 40px", borderBottom: "1.5px solid var(--border)" }}>
        <span
          onClick={() => navigate("/tienda")}
          style={{ fontSize: 13, color: "var(--muted)", cursor: "pointer", fontWeight: 600 }}
        >
          ← <span style={{ color: "var(--pink)" }}>Tienda</span> / {p.name}
        </span>
      </div>

      <div className="sec">
        <div className="product-detail-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36 }}>
          <div style={{ borderRadius: 20, overflow: "hidden", minHeight: 360, background: "var(--cream)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 40px rgba(61,32,53,0.08)" }}>
            <img src={p.img} alt={p.name} style={{ width: "100%", height: 380, objectFit: "cover", display: "block" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div>
              <span className="tag-pink">{p.catLabel}</span>
              <h1 className="serif" style={{ fontSize: 32, fontWeight: 400, margin: "8px 0 6px" }}>{p.name}</h1>
              <p style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600 }}>{p.shortDesc}</p>
            </div>

            <div className="price" style={{ fontSize: 30 }}>{p.price}</div>

            <div style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.85, fontWeight: 600 }} dangerouslySetInnerHTML={{ __html: p.desc }} />

            {p.ingredients && p.ingredients.length > 0 && (
              <div style={{ background: "var(--cream)", borderRadius: 14, padding: 20 }}>
                <p style={{ fontSize: 11, fontWeight: 700, marginBottom: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)" }}>
                  Ingredientes clave
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {p.ingredients.map((ing) => (
                    <span key={ing} style={{ background: "#fff", border: "1.5px solid var(--border)", borderRadius: 50, padding: "5px 16px", fontSize: 12, fontWeight: 600, color: "var(--muted)" }}>
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {p.stock !== null && p.stock !== undefined && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 700, color: stockOk ? "var(--teal)" : "var(--pink)" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: stockOk ? "var(--teal)" : "var(--pink)", display: "inline-block", flexShrink: 0 }} />
                {stockOk ? `En stock (${p.stock} unidades)` : `Pocas unidades (${p.stock} disponibles)`}
              </div>
            )}

            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, border: "1.5px solid var(--border)", borderRadius: 50, padding: "8px 20px" }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "var(--pink)", fontWeight: 700, lineHeight: 1 }}>−</button>
                <span style={{ fontSize: 15, fontWeight: 700, minWidth: 22, textAlign: "center" }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "var(--pink)", fontWeight: 700, lineHeight: 1 }}>+</button>
              </div>
              <button
                className={added ? "btn-teal" : "btn-primary"}
                style={{ flex: 1, padding: "13px 0", fontSize: 14, transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                onClick={handleAdd}
              >
                {added ? (
                  <><CheckIcon /> Agregado al carrito</>
                ) : (
                  "Agregar al carrito"
                )}
              </button>
            </div>

            <button className="btn-outline" style={{ width: "100%" }} onClick={() => navigate("/carrito")}>
              Ver carrito
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .product-detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Footer />
    </main>
  );
}

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
