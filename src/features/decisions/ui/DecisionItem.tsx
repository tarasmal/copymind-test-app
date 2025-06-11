import { Decision, DecisionStatus } from '../types/decision';
import Spinner from '@/shared/ui/Spinner';
import Link from 'next/link';
import ErrorMessage from '@/shared/ui/ErrorMessage';

type Props = { decision: Decision };

const statusStyles: Record<string, string> = {
  [DecisionStatus.PROCESSING]: 'text-yellow-600 bg-yellow-100',
  [DecisionStatus.COMPLETED]: 'text-green-700 bg-green-100',
  [DecisionStatus.ERROR]: 'text-red-700 bg-red-100',
};

export default function DecisionItem({ decision }: Props) {
  const { situation, decision: text, reasoning, status, createdAt, llmError } = decision;
  const statusClass = statusStyles[status] || 'text-gray-500 bg-gray-100';

  return (
    <li className="py-4 flex flex-col gap-2">
      <Link
        href={`/decision/${decision.id}`}
        className="block hover:bg-gray-100 rounded p-4 transition"
      >
        <div className="font-bold line-clamp-1">{situation}</div>
        <div className="text-sm text-gray-700 line-clamp-1">{text}</div>
        {reasoning && (
          <div className="text-xs text-gray-500 line-clamp-2">Reasoning: {reasoning}</div>
        )}

        <div className="flex items-center gap-2 text-xs">
          <span
            className={`px-2 py-0.5 rounded-full font-semibold ${statusClass} flex items-center gap-1`}
          >
            {status === DecisionStatus.PROCESSING && <Spinner size={16} />}
            {status}
          </span>
          <span className="text-gray-400">
            {createdAt?.toDate?.() ? createdAt.toDate().toLocaleString() : ''}
          </span>
        </div>

        {llmError && <ErrorMessage error={llmError} />}
      </Link>
    </li>
  );
}
