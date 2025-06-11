'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/shared/lib/firebase';
import { Decision } from '@/features/decisions/types/decision';
import ErrorMessage from '@/shared/ui/ErrorMessage';
import LoadingScreen from '@/shared/ui/LoadingScreen';
import ProtectedRoute from '@/shared/ui/ProtectedRoute';

export default function DecisionDetailsPage() {
  const { id } = useParams() as { id: string };
  const [decision, setDecision] = useState<Decision | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDecision() {
      try {
        setLoading(true);
        setError(null);
        const snap = await getDoc(doc(db, 'decisions', id));
        if (!snap.exists()) {
          setError('Decision not found.');
          setLoading(false);
          return;
        }
        setDecision({ id: snap.id, ...snap.data() } as Decision);
      } catch (e) {
        setError('Failed to fetch decision');
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchDecision();
  }, [id]);

  if (loading) return <LoadingScreen />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!decision) return null;

  return (
    <ProtectedRoute>
      <div className="max-w-xl mx-auto mt-16 p-8 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-6">Decision details</h1>
        <div className="mb-4">
          <strong>Situation:</strong>
          <div className="whitespace-pre-line">{decision.situation}</div>
        </div>
        <div className="mb-4">
          <strong>Decision:</strong>
          <div className="whitespace-pre-line">{decision.decision}</div>
        </div>
        {decision.reasoning && (
          <div className="mb-4">
            <strong>Reasoning:</strong>{' '}
            <div className="whitespace-pre-line">{decision.reasoning}</div>
          </div>
        )}
        <div className="mb-4">
          <strong>Status:</strong>{' '}
          <span
            className={
              decision.status === 'COMPLETED'
                ? 'text-green-600'
                : decision.status === 'PROCESSING'
                  ? 'text-yellow-600'
                  : 'text-red-600'
            }
          >
            {decision.status}
          </span>
        </div>

        {/* Результат моделі */}
        {decision.llmResult && (
          <div className="mb-4">
            <h2 className="font-semibold mb-2">Model analysis:</h2>
            <div>
              <strong>Type:</strong> {decision.llmResult.type}
            </div>
            <div>
              <strong>Cognitive insights:</strong>
              <ul className="list-disc ml-6">
                {decision.llmResult.cognitive_insights.map((cog: string, idx: number) => (
                  <li key={idx}>{cog}</li>
                ))}
              </ul>
            </div>
            <div>
              <strong>Alternatives not considered:</strong>
              <ul className="list-disc ml-6">
                {decision.llmResult.alternatives_not_considered.map((alt: string, idx: number) => (
                  <li key={idx}>{alt}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {decision.llmError && <ErrorMessage error={decision.llmError} />}
      </div>
    </ProtectedRoute>
  );
}
