import { useState, useMemo } from 'react';
import { products } from '../data/products';

export function useProducts() {
  const [filter, setFilter] = useState('todos');

  const filtered = useMemo(
    () => (filter === 'todos' ? products : products.filter((p) => p.cat === filter)),
    [filter]
  );

  return { products: filtered, filter, setFilter };
}
