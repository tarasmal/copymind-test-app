import { useEffect, useState } from 'react';
import { DocumentData } from 'firebase/firestore';

type PaginatedResult<T> = {
  items: T[];
  lastDoc: DocumentData;
  hasMore: boolean;
};

type FetchPage<T> = (params: {
  lastDoc?: DocumentData;
  userId: string;
}) => Promise<PaginatedResult<T>>;

export function usePaginated<T>(fetchPage: FetchPage<T>, userId: string | undefined) {
  const [items, setItems] = useState<T[]>([]);
  const [lastDoc, setLastDoc] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    if (!userId || !hasMore || loading) return;
    setLoading(true);
    const page = await fetchPage({ lastDoc, userId });
    setItems((prev) => [...prev, ...page.items]);
    setLastDoc(page.lastDoc);
    setHasMore(page.hasMore);
    setLoading(false);
  };

  useEffect(() => {
    setItems([]);
    setLastDoc(null);
    setHasMore(true);
    if (userId) loadMore();
  }, [userId]);

  return { items, loading, hasMore, loadMore, setItems };
}
