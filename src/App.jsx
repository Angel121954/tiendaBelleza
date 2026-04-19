import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Treatments from "./pages/Treatments";
import TreatmentDetail from "./pages/TreatmentDetail";
import Benefits from "./pages/Benefits";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tratamientos" element={<Treatments />} />
          <Route path="/tratamientos/:id" element={<TreatmentDetail />} />
          <Route path="/beneficios" element={<Benefits />} />
          <Route path="/tienda" element={<Shop />} />
          <Route path="/tienda/:id" element={<ProductDetail />} />
          <Route path="/agendar" element={<Booking />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/carrito" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
