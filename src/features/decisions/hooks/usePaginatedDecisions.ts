import { useEffect, useRef, useState } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '@/shared/lib/firebase';
import { usePaginated } from '@/shared/hooks/usePaginated';
import { fetchDecisionsPage } from '../services/decisionService';
import { useAuth } from '@/features/auth/model/useAuth';
import type { Decision } from '../types/decision';

export function usePaginatedDecisions() {
  const { user } = useAuth();
  const { items, loading, hasMore, loadMore } = usePaginated<Decision>(
    fetchDecisionsPage,
    user?.uid,
  );

  const [displayed, setDisplayed] = useState<Decision[]>([]);

  useEffect(() => {
    setDisplayed(items);
  }, [items]);

  const subscriptions = useRef<Record<string, () => void>>({});

  useEffect(() => {
    displayed.forEach((decision) => {
      if (decision.status === 'PROCESSING' && !subscriptions.current[decision.id]) {
        const ref = doc(db, 'decisions', decision.id);
        const unsubscribe = onSnapshot(ref, (snap) => {
          if (snap.exists()) {
            const updated = snap.data() as Decision;
            setDisplayed((prev) =>
              prev.map((d) => (d.id === updated.id ? { ...d, ...updated } : d)),
            );
          }
        });
        subscriptions.current[decision.id] = unsubscribe;
      }
    });

    Object.keys(subscriptions.current).forEach((id) => {
      const stillVisible = displayed.some((d) => d.id === id && d.status === 'PROCESSING');
      if (!stillVisible) {
        subscriptions.current[id]?.();
        delete subscriptions.current[id];
      }
    });

    return () => {
      Object.values(subscriptions.current).forEach((unsub) => unsub());
      subscriptions.current = {};
    };
  }, [displayed]);

  return { items: displayed, loading, hasMore, loadMore };
}
