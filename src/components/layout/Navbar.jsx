import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import logoLuisaAyslin from "../../assets/logoLuisaAyslin.png";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/tratamientos", label: "Tratamientos" },
  { to: "/beneficios", label: "Beneficios" },
  { to: "/tienda", label: "Tienda" },
  { to: "/agendar", label: "Agendar" },
  { to: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const navigate = useNavigate();

  const navLinkClass = ({ isActive }) => ({
    fontSize: "13px",
    color: isActive ? "var(--pink)" : "var(--muted)",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontFamily: '"Nunito", sans-serif',
    fontWeight: 700,
    letterSpacing: "0.02em",
    textDecoration: "none",
    transition: "color 0.2s",
  });

  return (
    <>
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 40px",
          background: "rgba(255,255,255,0.96)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1.5px solid var(--border)",
          position: "sticky",
          top: 0,
          zIndex: 200,
        }}
      >
        {/* LOGO */}
        <Link to="/" style={{ display: "flex", alignItems: "center" }}>
          <img
            src={logoLuisaAyslin}
            alt="Luisa & Ayslin"
            style={{ height: 50, width: "auto", objectFit: "contain" }}
          />
        </Link>

        {/* DESKTOP LINKS */}
        <div
          className="desktop-nav"
          style={{ display: "flex", gap: 22, alignItems: "center" }}
        >
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              style={navLinkClass}
            >
              {l.label}
            </NavLink>
          ))}
          <button
            className="btn-primary"
            onClick={() => navigate("/agendar")}
            style={{ padding: "10px 20px", fontSize: 13 }}
          >
            Reservar cita
          </button>
          <CartBtn count={count} />
        </div>

        {/* MOBILE: cart + hamburger */}
        <div
          className="mobile-nav-right"
          style={{ display: "flex", alignItems: "center", gap: 14 }}
        >
          <CartBtn count={count} />
          <button
            onClick={() => setOpen(!open)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 6 }}
            aria-label="Menú"
          >
            <HamburgerIcon open={open} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "#fff",
            zIndex: 190,
            display: "flex",
            flexDirection: "column",
            padding: "100px 36px 40px",
          }}
        >
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              style={{
                fontSize: 18,
                padding: "16px 0",
                borderBottom: "1px solid var(--border)",
                color: "var(--dark)",
                textDecoration: "none",
                fontWeight: 700,
                letterSpacing: "0.01em",
              }}
            >
              {l.label}
            </Link>
          ))}
          <button
            className="btn-primary"
            onClick={() => { navigate("/agendar"); setOpen(false); }}
            style={{ marginTop: 32, padding: 15, fontSize: 15 }}
          >
            Reservar cita
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) { .desktop-nav { display: none !important; } }
        @media (min-width: 901px) { .mobile-nav-right { display: none !important; } }
      `}</style>
    </>
  );
}

function CartBtn({ count }) {
  return (
    <Link
      to="/carrito"
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: 17,
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 4,
        textDecoration: "none",
        color: "var(--dark)",
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
      {count > 0 && <span className="cart-badge">{count}</span>}
    </Link>
  );
}

function HamburgerIcon({ open }) {
  const style = {
    display: "block",
    width: 22,
    height: 2,
    background: "var(--dark)",
    borderRadius: 2,
    transition: "all 0.3s",
    marginBottom: 5,
  };
  return (
    <div style={{ width: 22 }}>
      <span style={{ ...style, transform: open ? "translateY(7px) rotate(45deg)" : "none" }} />
      <span style={{ ...style, opacity: open ? 0 : 1 }} />
      <span style={{ ...style, transform: open ? "translateY(-7px) rotate(-45deg)" : "none", marginBottom: 0 }} />
    </div>
  );
}
