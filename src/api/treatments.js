import { getCached, setCache } from './cache';

const WP_BASE = import.meta.env.VITE_WP_URL;

async function apiFetch(endpoint) {
  const url = `${WP_BASE}/wp-json/poder-capilar/v1/${endpoint}`;
  const cached = getCached(url);
  if (cached) return cached;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);
  const data = await res.json();
  setCache(url, data);
  return data;
}

export async function getTreatments(category = 'todos') {
  const params = category !== 'todos' ? `?category=${encodeURIComponent(category)}` : '';
  const data = await apiFetch(`tratamientos${params}`);
  return data.items || [];
}

export async function getTreatmentById(slug) {
  const data = await apiFetch(`tratamientos?slug=${encodeURIComponent(slug)}&per_page=1`);
  if (!data.items || data.items.length === 0) return null;
  return data.items[0];
}

export async function getTreatmentCategories() {
  return apiFetch('tratamientos/categories');
}

export async function getFeaturedTreatments() {
  const data = await apiFetch('tratamientos?featured=true');
  return data.items || [];
}
