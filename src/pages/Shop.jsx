import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { products, categories } from "../data/products";
import Footer from "../components/layout/Footer";

export default function Shop() {
  const [activeCat, setActiveCat] = useState("todos");
  const { addItem } = useCart();
  const navigate = useNavigate();

  const filtered =
    activeCat === "todos"
      ? products
      : products.filter((p) => p.cat === activeCat);

  const handleAdd = (e, product) => {
    e.stopPropagation();
    addItem(product);
  };

  return (
    <main>
      {/* HEADER */}
      <div
        style={{
          position: "relative",
          minHeight: 220,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          overflow: "hidden",
          padding: "50px 40px",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1400&q=85&fit=crop&crop=center"
          alt="Productos capilares"
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
              "linear-gradient(135deg, rgba(232,99,138,0.65) 0%, rgba(61,32,53,0.72) 100%)",
          }}
        />
        <div style={{ position: "relative", zIndex: 2 }}>
          <span
            className="tag"
            style={{ display: "block", marginBottom: 8, color: "#f9b8cc" }}
          >
            Tienda en línea
          </span>
          <h1
            className="serif"
            style={{ fontSize: 42, fontWeight: 400, color: "#fff" }}
          >
            Productos capilares
          </h1>
          <p
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.85)",
              marginTop: 10,
              fontWeight: 600,
            }}
          >
            Los mismos productos que usamos en nuestros tratamientos
          </p>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="sec">
        {/* FILTER BUTTONS */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 28,
            flexWrap: "wrap",
          }}
        >
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

        {/* GRID */}
        <div className="g3">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="card"
              style={{ cursor: "pointer", overflow: "hidden" }}
              onClick={() => navigate(`/tienda/${p.id}`)}
            >
              <div style={{ height: 190, overflow: "hidden" }}>
                <img
                  src={p.img}
                  alt={p.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.3s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>
              <div style={{ padding: 16 }}>
                <span className="tag-pink">{p.catLabel}</span>
                <h3
                  style={{ fontSize: 14, fontWeight: 700, margin: "5px 0 4px" }}
                >
                  {p.name}
                </h3>
                <p
                  style={{
                    fontSize: 12,
                    color: "var(--muted)",
                    marginBottom: 14,
                    fontWeight: 600,
                  }}
                >
                  {p.shortDesc}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
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

        {filtered.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "60px 0",
              color: "var(--muted)",
            }}
          >
            <p style={{ fontSize: 40, marginBottom: 12 }}>🛍️</p>
            <p style={{ fontWeight: 600 }}>
              No hay productos en esta categoría
            </p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
