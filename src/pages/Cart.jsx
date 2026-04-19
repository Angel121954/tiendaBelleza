import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Footer from "../components/layout/Footer";

export default function Cart() {
  const { items, removeItem, updateQty, total, clearCart } = useCart();
  const navigate = useNavigate();

  const fmt = (n) => `$${n.toLocaleString("es-CO")}`;

  if (items.length === 0) {
    return (
      <main>
        <div
          style={{
            minHeight: "55vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: 40,
          }}
        >
          <div style={{ fontSize: 64, marginBottom: 16 }}>🛍️</div>
          <h2 className="serif" style={{ fontSize: 28, marginBottom: 10 }}>
            Tu carrito está vacío
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "var(--muted)",
              fontWeight: 600,
              marginBottom: 24,
            }}
          >
            Explora nuestra tienda y encuentra los productos perfectos para tu
            cabello.
          </p>
          <button className="btn-primary" onClick={() => navigate("/tienda")}>
            Ir a la tienda
          </button>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      {/* HEADER */}
      <div
        style={{
          padding: "32px 40px",
          borderBottom: "1.5px solid var(--border)",
        }}
      >
        <span className="tag" style={{ display: "block", marginBottom: 6 }}>
          Mi carrito
        </span>
        <h1 className="serif" style={{ fontSize: 32, fontWeight: 400 }}>
          Resumen de compra
        </h1>
      </div>

      <div className="sec">
        <div className="grid-2-col" style={{ gap: 26, alignItems: "start" }}>
          {/* ITEMS */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {items.map((item) => (
              <div
                key={item.id}
                className="card"
                style={{
                  display: "flex",
                  gap: 16,
                  padding: 16,
                  overflow: "hidden",
                }}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "cover",
                    borderRadius: 12,
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <span className="tag-pink" style={{ fontSize: 10 }}>
                    {item.catLabel}
                  </span>
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      margin: "4px 0 4px",
                    }}
                  >
                    {item.name}
                  </p>
                  <p
                    style={{
                      fontSize: 12,
                      color: "var(--muted)",
                      fontWeight: 600,
                      marginBottom: 10,
                    }}
                  >
                    {item.shortDesc}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 8,
                    }}
                  >
                    {/* QTY */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        border: "1.5px solid var(--border)",
                        borderRadius: 50,
                        padding: "5px 14px",
                      }}
                    >
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontSize: 16,
                          color: "var(--pink)",
                          fontWeight: 700,
                          lineHeight: 1,
                        }}
                      >
                        −
                      </button>
                      <span style={{ fontSize: 14, fontWeight: 700 }}>
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontSize: 16,
                          color: "var(--pink)",
                          fontWeight: 700,
                          lineHeight: 1,
                        }}
                      >
                        +
                      </button>
                    </div>

                    <span className="price" style={{ fontSize: 14 }}>
                      {fmt(item.priceNum * item.qty)}
                    </span>

                    <button
                      onClick={() => removeItem(item.id)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: 12,
                        color: "var(--muted)",
                        fontWeight: 600,
                      }}
                    >
                      🗑 Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 12,
                color: "var(--muted)",
                fontWeight: 600,
                textAlign: "left",
              }}
            >
              Vaciar carrito
            </button>
          </div>

          {/* SUMMARY */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                background: "#fff",
                border: "1.5px solid var(--border)",
                borderRadius: 18,
                padding: 24,
              }}
            >
              <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 18 }}>
                Resumen del pedido
              </p>

              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 10,
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--muted)",
                  }}
                >
                  <span>
                    {item.name} × {item.qty}
                  </span>
                  <span>{fmt(item.priceNum * item.qty)}</span>
                </div>
              ))}

              <div
                style={{
                  borderTop: "1.5px solid var(--border)",
                  marginTop: 16,
                  paddingTop: 16,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--muted)",
                    marginBottom: 6,
                  }}
                >
                  <span>Subtotal</span>
                  <span>{fmt(total)}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--teal)",
                    marginBottom: 16,
                  }}
                >
                  <span>🚚 Envío</span>
                  <span>Gratis</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 18,
                    fontWeight: 700,
                  }}
                >
                  <span>Total</span>
                  <span style={{ color: "var(--pink)" }}>{fmt(total)}</span>
                </div>
              </div>

              <button
                className="btn-primary"
                style={{
                  width: "100%",
                  padding: "14px 0",
                  fontSize: 14,
                  marginTop: 20,
                }}
                onClick={() =>
                  alert("Proceso de pago en construcción. ¡Pronto disponible!")
                }
              >
                Proceder al pago
              </button>

              <a
                href="https://wa.me/573104226967"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "block",
                  textAlign: "center",
                  marginTop: 12,
                  fontSize: 13,
                  color: "var(--teal)",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                💬 Pedir por WhatsApp
              </a>
            </div>

            {/* Benefits */}
            <div
              style={{
                background: "var(--cream)",
                borderRadius: 16,
                padding: 18,
              }}
            >
              {[
                { icon: "🚚", text: "Envío gratis en pedidos sobre $80.000" },
                { icon: "✅", text: "Productos 100% naturales y probados" },
                { icon: "💕", text: "Garantía de satisfacción" },
              ].map((b) => (
                <div
                  key={b.text}
                  style={{
                    display: "flex",
                    gap: 10,
                    marginBottom: 10,
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--muted)",
                  }}
                >
                  <span>{b.icon}</span>
                  <span>{b.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
