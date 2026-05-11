import { useState, useEffect, useMemo } from 'react';
import { getProducts, getCategories } from '../api/woocommerce';

export function useProducts() {
  const [filter, setFilter] = useState('todos');
  const [all, setAll] = useState([]);
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    Promise.all([getProducts(), getCategories()])
      .then(([products, categories]) => {
        if (!mounted) return;
        setAll(products);
        setCats(categories);
      })
      .catch(() => {})
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(
    () => (filter === 'todos' ? all : all.filter((p) => p.cat === filter)),
    [filter, all]
  );

  return { products: filtered, allProducts: all, filter, setFilter, categories: cats, loading };
}
