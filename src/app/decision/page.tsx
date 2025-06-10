'use client';
import DecisionList from '@/features/decisions/ui/DecisionList';
import ProtectedRoute from '@/shared/ui/ProtectedRoute';
import Link from 'next/link';
import { ROUTES } from '@/shared/constants/routes';

export default function DecisionsPage() {
  return (
    <ProtectedRoute>
      <h1 className="text-2xl font-bold mb-6 text-center mt-12">Your Decisions</h1>
      <div className="flex justify-center mb-8">
        <Link
          href={ROUTES.DECISION_NEW}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition font-semibold text-base text-center"
        >
          Add new
        </Link>
      </div>
      <DecisionList />
    </ProtectedRoute>
  );
}
