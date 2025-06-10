'use client';
import DecisionForm from '@/features/decisions/ui/DecisionForm';
import { DecisionFormData } from '@/features/decisions/model/decisionValidation';
import { useCreateDecision } from '@/features/decisions/model/useCreateDecision';

export default function NewDecisionPage() {
  const { submit, loading, error, success } = useCreateDecision();
  const handleSubmit = async (data: DecisionFormData) => {
    await submit(data);
  };
  return (
    <div className="max-w-xl mx-auto mt-16 p-8 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Add new decision</h1>
      <DecisionForm
        onSubmitAction={handleSubmit}
        loading={loading}
        success={success}
        error={error}
      />
    </div>
  );
}
