import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useProducts } from "../hooks/useProducts";
import Footer from "../components/layout/Footer";

export default function Shop() {
  const [activeCat, setActiveCat] = useState("todos");
  const { addItem } = useCart();
  const navigate = useNavigate();
  const { products, categories, loading } = useProducts();

  const filtered = activeCat === "todos" ? products : products.filter((p) => p.cat === activeCat);

  const handleAdd = (e, product) => {
    e.stopPropagation();
    addItem(product);
  };

  return (
    <main>
      <div style={{ position: "relative", minHeight: 220, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", overflow: "hidden", padding: "50px 40px" }}>
        <img
          src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1400&q=85&fit=crop&crop=center"
          alt="Productos capilares"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(232,99,138,0.65) 0%, rgba(61,32,53,0.74) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <span className="tag" style={{ display: "block", marginBottom: 8, color: "#f9b8cc" }}>Tienda en línea</span>
          <h1 className="serif" style={{ fontSize: 44, fontWeight: 400, color: "#fff" }}>Productos capilares</h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", marginTop: 10, fontWeight: 600 }}>
            Los mismos productos que usamos en nuestros tratamientos
          </p>
        </div>
      </div>

      <div className="sec">
        <div style={{ display: "flex", gap: 10, marginBottom: 30, flexWrap: "wrap" }}>
          {categories.map((c) => (
            <button
              key={c.value}
              className={activeCat === c.value ? "btn-primary" : "btn-outline"}
              style={{ fontSize: 12, padding: "8px 18px" }}
              onClick={() => setActiveCat(c.value)}
            >
              {c.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="g3">
            {[1,2,3,4,5,6].map((i) => (
              <div key={i} className="card" style={{ padding: 0, overflow: "hidden" }}>
                <div className="skeleton" style={{ width: "100%", height: 200 }} />
                <div style={{ padding: 18 }}>
                  <div className="skeleton" style={{ height: 12, width: "30%", marginBottom: 6 }} />
                  <div className="skeleton" style={{ height: 14, width: "80%", marginBottom: 4 }} />
                  <div className="skeleton" style={{ height: 12, width: "50%", marginBottom: 14 }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div className="skeleton" style={{ height: 14, width: "22%" }} />
                    <div className="skeleton" style={{ height: 32, width: "30%", borderRadius: 50 }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="g3">
            {filtered.map((p) => (
              <div
                key={p.id}
                className="card"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/tienda/${p.id}`)}
              >
                <div style={{ height: 200, overflow: "hidden" }}>
                  <img
                    src={p.img}
                    alt={p.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
                <div style={{ padding: 18 }}>
                  <span className="tag-pink">{p.catLabel}</span>
                  <h3 style={{ fontSize: 14, fontWeight: 700, margin: "6px 0 4px" }}>{p.name}</h3>
                  <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 14, fontWeight: 600 }}>{p.shortDesc}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className="price">{p.price}</span>
                    <button
                      className="btn-teal"
                      style={{ fontSize: 12, padding: "8px 14px" }}
                      onClick={(e) => handleAdd(e, p)}
                    >
                      + Agregar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "70px 0", color: "var(--muted)" }}>
            <div style={{ marginBottom: 18, display: "flex", justifyContent: "center" }}>
              <BagIcon size={52} />
            </div>
            <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>Sin productos en esta categoría</p>
            <p style={{ fontSize: 13 }}>Prueba con otra categoría o explora todos los productos.</p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}

function BagIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--border)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}
