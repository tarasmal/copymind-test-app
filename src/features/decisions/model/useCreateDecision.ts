import { useState } from 'react';
import { addNewDecision } from '../services/decisionService';
import { DecisionFormData } from '@/features/decisions/model/decisionValidation';

export function useCreateDecision() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submit = async (input: DecisionFormData) => {
    setError(null);
    setSuccess(false);
    setLoading(true);
    try {
      await addNewDecision(input);
      setSuccess(true);
      return true;
    } catch (e: unknown) {
      setError('Something went wrong. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error, success };
}
