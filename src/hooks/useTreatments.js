import { useState, useEffect, useMemo } from 'react';
import { getTreatments, getTreatmentCategories } from '../api/treatments';
import { treatments as fallbackTreatments } from '../data/treatments';

export function useTreatments() {
  const [filter, setFilter] = useState('todos');
  const [all, setAll] = useState([]);
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    Promise.all([getTreatments(), getTreatmentCategories()])
      .then(([items, categories]) => {
        if (!mounted) return;
        setAll(items);
        setCats(categories);
      })
      .catch((err) => {
        if (!mounted) return;
        console.warn('Treatments API fallback a datos locales:', err.message);
        setAll(fallbackTreatments);
        setCats([
          { value: 'todos', label: 'Todos' },
          ...['Hidratación', 'Reparación', 'Crecimiento'].map((c) => ({ value: c, label: c })),
        ]);
        setError(err.message);
      })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(
    () => (filter === 'todos' ? all : all.filter((t) => t.cat === filter)),
    [filter, all]
  );

  return { treatments: filtered, allTreatments: all, filter, setFilter, categories: cats, loading, error };
}
