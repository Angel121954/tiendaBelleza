import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../data/products";
import { useCart } from "../context/CartContext";
import Footer from "../components/layout/Footer";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const p = getProductById(id);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!p) {
    return (
      <div style={{ padding: "80px 40px", textAlign: "center" }}>
        <h2>Producto no encontrado</h2>
        <button
          className="btn-primary"
          style={{ marginTop: 20 }}
          onClick={() => navigate("/tienda")}
        >
          Ver tienda
        </button>
      </div>
    );
  }

  const handleAdd = () => {
    addItem(p, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

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
          onClick={() => navigate("/tienda")}
          style={{
            fontSize: 13,
            color: "var(--muted)",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          ← <span style={{ color: "var(--pink)" }}>Tienda</span> / {p.name}
        </span>
      </div>

      {/* CONTENT */}
      <div className="sec">
        <div
          className="product-detail-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}
        >
          {/* IMAGE */}
          <div
            style={{
              borderRadius: 18,
              overflow: "hidden",
              minHeight: 340,
              background: "var(--cream)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={p.img}
              alt={p.name}
              style={{
                width: "100%",
                height: 360,
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          {/* INFO */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <span className="tag-pink">{p.catLabel}</span>
              <h1
                className="serif"
                style={{ fontSize: 30, fontWeight: 400, margin: "8px 0 6px" }}
              >
                {p.name}
              </h1>
              <p
                style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600 }}
              >
                {p.shortDesc}
              </p>
            </div>

            <div className="price" style={{ fontSize: 28 }}>
              {p.price}
            </div>

            <p
              style={{
                fontSize: 14,
                color: "var(--muted)",
                lineHeight: 1.8,
                fontWeight: 600,
              }}
            >
              {p.desc}
            </p>

            {/* Ingredientes */}
            <div
              style={{
                background: "var(--cream)",
                borderRadius: 14,
                padding: 18,
              }}
            >
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  marginBottom: 10,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                }}
              >
                Ingredientes clave
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {p.ingredients.map((ing) => (
                  <span
                    key={ing}
                    style={{
                      background: "#fff",
                      border: "1.5px solid var(--border)",
                      borderRadius: 50,
                      padding: "4px 14px",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--muted)",
                    }}
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Stock */}
            <p
              style={{
                fontSize: 12,
                color: p.stock > 5 ? "var(--teal)" : "var(--pink)",
                fontWeight: 700,
              }}
            >
              {p.stock > 5
                ? `✓ En stock (${p.stock} unidades)`
                : `⚠ Pocas unidades (${p.stock} disponibles)`}
            </p>

            {/* QTY + ADD */}
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  border: "1.5px solid var(--border)",
                  borderRadius: 50,
                  padding: "8px 18px",
                }}
              >
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 18,
                    color: "var(--pink)",
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  −
                </button>
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    minWidth: 20,
                    textAlign: "center",
                  }}
                >
                  {qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 18,
                    color: "var(--pink)",
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  +
                </button>
              </div>
              <button
                className={added ? "btn-teal" : "btn-primary"}
                style={{
                  flex: 1,
                  padding: "13px 0",
                  fontSize: 14,
                  transition: "all 0.3s",
                }}
                onClick={handleAdd}
              >
                {added ? "✓ ¡Agregado!" : "Agregar al carrito"}
              </button>
            </div>

            <button
              className="btn-outline"
              style={{ width: "100%" }}
              onClick={() => navigate("/carrito")}
            >
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
