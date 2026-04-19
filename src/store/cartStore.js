// El estado del carrito se maneja en src/context/CartContext.jsx
// Este archivo puede usarse para lógica adicional (ej: persistencia en localStorage)

export const formatPrice = (num) =>
  `$${num.toLocaleString('es-CO')}`;
