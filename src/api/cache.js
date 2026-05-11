const CACHE_PREFIX = "pc_cache_";
const TTL = 60 * 1000;

function cacheKey(url) {
  let k = url;
  const base = import.meta.env.VITE_WP_URL;
  if (k.startsWith(base)) k = k.slice(base.length);
  return k.replace(/[^a-z0-9]/gi, "_").slice(0, 100);
}

export function getCached(url) {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + cacheKey(url));
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > TTL) {
      localStorage.removeItem(CACHE_PREFIX + cacheKey(url));
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

export function setCache(url, data) {
  try {
    localStorage.setItem(
      CACHE_PREFIX + cacheKey(url),
      JSON.stringify({ data, ts: Date.now() })
    );
  } catch {}
}
