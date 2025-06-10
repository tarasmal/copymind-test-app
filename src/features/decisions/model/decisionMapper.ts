import { Decision, DecisionStatus, LlmResult } from '../types/decision';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

export function mapFirestoreDecisionToEntity(doc: QueryDocumentSnapshot<DocumentData>): Decision {
  const data = doc.data();
  return {
    id: doc.id,
    situation: data.situation ?? '',
    decision: data.decision ?? '',
    status: data.status ?? DecisionStatus.PROCESSING,
    reasoning: data.reasoning ?? '',
    createdAt: data.createdAt,
    llmError: data.llmError ?? undefined,
    llmResult: data.llmResult ?? null,
  };
}

export function mapDecisionToFirestoreCreate(input: {
  userId: string;
  situation: string;
  decision: string;
  status: DecisionStatus;
  reasoning: string | null;
  createdAt?: any;
  llmResult: LlmResult | null;
}) {
  return {
    userId: input.userId,
    situation: input.situation,
    decision: input.decision,
    status: input.status,
    reasoning: input.reasoning ?? '',
    createdAt: input.createdAt,
    llmResult: input.llmResult,
  };
}
