// api/woocommerce.js
// Integración futura con WooCommerce REST API
// https://woocommerce.github.io/woocommerce-rest-api-docs/

const WC_BASE = import.meta.env.VITE_WC_URL;
const WC_KEY = import.meta.env.VITE_WC_KEY;
const WC_SECRET = import.meta.env.VITE_WC_SECRET;

function wcHeaders() {
  const auth = btoa(`${WC_KEY}:${WC_SECRET}`);
  return { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json' };
}

export async function getProducts() {
  const res = await fetch(`${WC_BASE}/wp-json/wc/v3/products`, { headers: wcHeaders() });
  return res.json();
}

export async function createOrder(orderData) {
  const res = await fetch(`${WC_BASE}/wp-json/wc/v3/orders`, {
    method: 'POST',
    headers: wcHeaders(),
    body: JSON.stringify(orderData),
  });
  return res.json();
}
