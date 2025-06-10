import { usePaginated } from '@/shared/hooks/usePaginated';
import { fetchDecisionsPage } from '../services/decisionService';
import { useAuth } from '@/features/auth/model/useAuth';
import type { Decision } from '../types/decision';

export function usePaginatedDecisions() {
  const { user } = useAuth();
  return usePaginated<Decision>(fetchDecisionsPage, user?.uid);
}
