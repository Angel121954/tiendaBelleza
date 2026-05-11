const WC_BASE = import.meta.env.VITE_WC_URL;
const WC_KEY = import.meta.env.VITE_WC_KEY;
const WC_SECRET = import.meta.env.VITE_WC_SECRET;

function wcHeaders() {
  const auth = btoa(`${WC_KEY}:${WC_SECRET}`);
  return { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json' };
}

async function wcFetch(endpoint) {
  const res = await fetch(`${WC_BASE}/wp-json/wc/v3/${endpoint}`, { headers: wcHeaders() });
  if (!res.ok) throw new Error(`WooCommerce error: ${res.status} ${res.statusText}`);
  return res.json();
}

function toFrontendFormat(wcProduct) {
  const cat = wcProduct.categories?.[0];
  return {
    id: wcProduct.slug,
    wcId: wcProduct.id,
    cat: cat?.slug || '',
    catLabel: cat?.name || '',
    name: wcProduct.name,
    shortDesc: wcProduct.short_description?.replace(/<[^>]*>/g, '') || '',
    price: `$${(+wcProduct.price).toLocaleString('es-CO')}`,
    priceNum: +wcProduct.price || 0,
    img: wcProduct.images?.[0]?.src || '',
    desc: wcProduct.description?.replace(/<[^>]*>/g, '') || '',
    ingredients: (wcProduct.attributes || []).find((a) => a.name === 'Ingredientes')?.options || [],
    stock: wcProduct.stock_quantity ?? null,
    stockStatus: wcProduct.stock_status,
  };
}

export async function getProducts() {
  const data = await wcFetch('products');
  return (Array.isArray(data) ? data : []).map(toFrontendFormat);
}

export async function getProductById(slug) {
  const data = await wcFetch(`products?slug=${encodeURIComponent(slug)}&per_page=1`);
  const products = Array.isArray(data) ? data : [];
  if (!products.length) return null;
  return toFrontendFormat(products[0]);
}

export async function getCategories() {
  const data = await wcFetch('products/categories');
  const all = Array.isArray(data) ? data : [];
  return [
    { value: 'todos', label: 'Todos' },
    ...all.map((c) => ({
      value: c.slug,
      label: c.name,
    })),
  ];
}

export async function createOrder(orderData) {
  const res = await fetch(`${WC_BASE}/wp-json/wc/v3/orders`, {
    method: 'POST',
    headers: wcHeaders(),
    body: JSON.stringify(orderData),
  });
  if (!res.ok) throw new Error(`WooCommerce order error: ${res.status} ${res.statusText}`);
  return res.json();
}

export async function getProductsByCategory(categorySlug) {
  const data = await wcFetch(`products?category=${categorySlug}`);
  return (Array.isArray(data) ? data : []).map(toFrontendFormat);
}
