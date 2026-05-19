const APP_URL = import.meta.env.VITE_APP_URL || "podercapilar.com";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Footer from "../components/layout/Footer";

export default function Cart() {
  const { items, removeItem, updateQty, total, clearCart } = useCart();
  const navigate = useNavigate();

  const fmt = (n) => `$${n.toLocaleString("es-CO")}`;

  const whatsappMsg = () => {
    const lines = items.map(
      (i, idx) =>
        `${idx + 1}. ${i.name} x${i.qty} — ${fmt(i.priceNum * i.qty)}`,
    );
    const msg = [
      `¡Hola! Acabo de visualizar tu sitio web ${APP_URL} y me gustaría hacer un pedido:`,
      "",
      ...lines,
      "",
      `Total: ${fmt(total)}`,
      "",
      "Gracias, quedo atento a la confirmación.",
    ].join("\n");
    return encodeURIComponent(msg);
  };

  if (items.length === 0) {
    return (
      <main>
        <div
          style={{
            minHeight: "58vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: 40,
          }}
        >
          <div style={{ marginBottom: 20, color: "var(--border)" }}>
            <BagIcon size={68} />
          </div>
          <h2 className="serif" style={{ fontSize: 28, marginBottom: 10 }}>
            Tu carrito está vacío
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "var(--muted)",
              fontWeight: 600,
              marginBottom: 26,
              maxWidth: 320,
              lineHeight: 1.7,
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
      <div
        style={{
          padding: "36px 40px",
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
        <div className="grid-2-col" style={{ gap: 28, alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {items.map((item) => (
              <div
                key={item.id}
                className="card"
                style={{ display: "flex", gap: 16, padding: 16 }}
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
                      margin: "4px 0 3px",
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
                          fontSize: 18,
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
                          fontSize: 18,
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
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        transition: "color 0.2s",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.color = "var(--pink)")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.color = "var(--muted)")
                      }
                    >
                      <TrashIcon /> Eliminar
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
                transition: "color 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "var(--pink)")}
              onMouseOut={(e) => (e.currentTarget.style.color = "var(--muted)")}
            >
              Vaciar carrito
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                background: "#fff",
                border: "1.5px solid var(--border)",
                borderRadius: 18,
                padding: 26,
              }}
            >
              <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>
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
                  marginTop: 18,
                  paddingTop: 18,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--muted)",
                    marginBottom: 8,
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
                    marginBottom: 18,
                  }}
                >
                  <span
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <TruckIcon /> Envío
                  </span>
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

              <a
                href={`https://wa.me/573104226967?text=${whatsappMsg()}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 7,
                  textAlign: "center",
                  marginTop: 14,
                  fontSize: 13,
                  color: "var(--teal)",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                <WhatsAppIcon /> Pedir por WhatsApp
              </a>
            </div>

            <div
              style={{
                background: "var(--cream)",
                borderRadius: 16,
                padding: 20,
              }}
            >
              {[
                {
                  icon: <TruckIcon />,
                  text: "Envío gratis en pedidos sobre $80.000",
                },
                {
                  icon: <CheckIcon />,
                  text: "Productos 100% naturales y probados",
                },
                { icon: <HeartIcon />, text: "Garantía de satisfacción" },
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
                    alignItems: "center",
                  }}
                >
                  <span style={{ color: "var(--teal)", flexShrink: 0 }}>
                    {b.icon}
                  </span>
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

function BagIcon({ size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}
function TrashIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" />
    </svg>
  );
}
function TruckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
    >
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  );
}
function WhatsAppIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

