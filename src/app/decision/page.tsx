'use client';
import DecisionList from '@/features/decisions/ui/DecisionList';
import ProtectedRoute from '@/shared/ui/ProtectedRoute';

export default function DecisionsPage() {
  return (
    <ProtectedRoute>
      <h1 className="text-2xl font-bold mb-6 text-center mt-12">Your Decisions</h1>
      <DecisionList />
    </ProtectedRoute>
  );
}
