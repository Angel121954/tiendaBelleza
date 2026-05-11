import { getCached, setCache } from './cache';

const WP_BASE = import.meta.env.VITE_WP_URL;
const PLACEHOLDER = 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&q=80&fit=crop&crop=center';

async function apiFetch(endpoint) {
  const url = `${WP_BASE}/wp-json/poder-capilar/v1/${endpoint}`;
  const cached = getCached(url);
  if (cached) return cached;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);
  const data = await res.json();
  setCache(url, data);
  return data;
}

function toFrontendFormat(p) {
  return {
    id: p.id,
    wcId: p.wcId,
    cat: p.cat,
    catLabel: p.catLabel,
    name: p.name,
    shortDesc: p.shortDesc?.replace(/<[^>]*>/g, '') || '',
    price: p.price,
    priceNum: p.priceNum || 0,
    img: p.img || PLACEHOLDER,
    desc: p.desc?.replace(/<[^>]*>/g, '') || '',
    ingredients: p.ingredients || [],
    stock: p.stock ?? null,
  };
}

export async function getProducts(category) {
  const params = category && category !== 'todos' ? `?category=${encodeURIComponent(category)}` : '';
  const data = await apiFetch(`products${params}`);
  return (Array.isArray(data) ? data : []).map(toFrontendFormat);
}

export async function getProductById(slug) {
  const data = await apiFetch(`products?slug=${encodeURIComponent(slug)}`);
  const products = Array.isArray(data) ? data : [];
  if (!products.length) return null;
  return toFrontendFormat(products[0]);
}

export async function getCategories() {
  return apiFetch('products/categories');
}

export async function createOrder(orderData) {
  const res = await fetch(`${WP_BASE}/wp-json/poder-capilar/v1/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  if (!res.ok) throw new Error(`Error al crear pedido: ${res.status}`);
  return res.json();
}

export async function getProductsByCategory(categorySlug) {
  return getProducts(categorySlug);
}
