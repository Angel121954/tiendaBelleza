import { useState, useEffect, useMemo } from 'react';
import { getProducts, getCategories } from '../api/woocommerce';
import { products as fallbackProducts, categories as fallbackCategories } from '../data/products';

export function useProducts() {
  const [filter, setFilter] = useState('todos');
  const [all, setAll] = useState([]);
  const [cats, setCats] = useState(fallbackCategories);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    Promise.all([getProducts(), getCategories()])
      .then(([products, categories]) => {
        if (!mounted) return;
        setAll(products);
        setCats(categories);
      })
      .catch((err) => {
        if (!mounted) return;
        console.warn('WooCommerce API fallback a datos locales:', err.message);
        setAll(fallbackProducts);
        setCats(fallbackCategories);
        setError(err.message);
      })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(
    () => (filter === 'todos' ? all : all.filter((p) => p.cat === filter)),
    [filter, all]
  );

  return { products: filtered, allProducts: all, filter, setFilter, categories: cats, loading, error };
}
