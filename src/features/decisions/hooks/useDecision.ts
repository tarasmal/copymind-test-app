import { useEffect, useState } from 'react';
import { Decision } from '@/features/decisions/types/decision';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/shared/lib/firebase';

export function useDecision(id: string) {
  const [decision, setDecision] = useState<Decision | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;
    async function fetchDecision() {
      try {
        setLoading(true);
        setError(null);
        const snap = await getDoc(doc(db, 'decisions', id));
        if (!snap.exists()) {
          if (!cancelled) setError('Decision not found.');
          return;
        }
        if (!cancelled) setDecision({ id: snap.id, ...snap.data() } as Decision);
      } catch (e) {
        if (!cancelled) setError('Failed to fetch decision');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchDecision();
    return () => {
      cancelled = true;
    };
  }, [id]);

  return { decision, loading, error };
}
