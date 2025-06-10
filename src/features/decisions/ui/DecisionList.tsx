import DecisionItem from './DecisionItem';
import { Decision } from '@/features/decisions/types/decision';
import { usePaginatedDecisions } from '@/features/decisions/hooks/usePaginatedDecisions';

export default function DecisionList() {
  const { items, loading, hasMore, loadMore } = usePaginatedDecisions();

  if (!items.length && loading) return <div>Loading...</div>;
  if (!items.length) return <div>No decisions found.</div>;

  return (
    <div className="max-w-xl mx-auto mt-10">
      <ul className="divide-y divide-gray-200">
        {items.map((d: Decision) => (
          <DecisionItem key={d.id} decision={d} />
        ))}
      </ul>
      {hasMore && (
        <button
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:cursor-pointer"
          onClick={loadMore}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Load more'}
        </button>
      )}
    </div>
  );
}
