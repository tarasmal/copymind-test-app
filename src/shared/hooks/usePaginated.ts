import { useEffect, useState } from 'react';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

type PaginatedResult<T> = {
  items: T[];
  lastDoc: QueryDocumentSnapshot<DocumentData, DocumentData> | undefined;
  hasMore: boolean;
};

type FetchPage<T> = (params: {
  lastDoc?: QueryDocumentSnapshot<DocumentData, DocumentData> | undefined;
  userId: string;
}) => Promise<PaginatedResult<T>>;

export function usePaginated<T>(fetchPage: FetchPage<T>, userId: string | undefined) {
  const [items, setItems] = useState<T[]>([]);
  const [lastDoc, setLastDoc] = useState<
    QueryDocumentSnapshot<DocumentData, DocumentData> | undefined
  >(undefined);
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
    setLastDoc(undefined);
    setHasMore(true);
    if (userId) loadMore();
  }, [userId]);

  return { items, loading, hasMore, loadMore, setItems };
}
