import { useState, useMemo } from 'react';
import { treatments } from '../data/treatments';

export function useTreatments() {
  const [filter, setFilter] = useState('todos');

  const filtered = useMemo(
    () => (filter === 'todos' ? treatments : treatments.filter((t) => t.cat === filter)),
    [filter]
  );

  const categories = ['todos', ...new Set(treatments.map((t) => t.cat))];

  return { treatments: filtered, filter, setFilter, categories };
}
