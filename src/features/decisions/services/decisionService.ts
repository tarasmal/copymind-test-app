import { QueryDocumentSnapshot, DocumentData, updateDoc, doc } from 'firebase/firestore';
import { auth, db } from '@/shared/lib/firebase';
import { DecisionFormData } from '@/features/decisions/model/decisionValidation';
import { Decision, DECISIONS_PER_PAGE, DecisionStatus } from '@/features/decisions/types/decision';
import {
  mapDecisionToFirestoreCreate,
  mapFirestoreDecisionToEntity,
} from '../model/decisionMapper';
import {
  addDecisionRaw,
  getDecisionsPageRaw,
} from '@/features/decisions/repository/decisionsRepository';
import { serverTimestamp } from '@firebase/database';
import { analyzeDecision } from '@/shared/services/llmService';

export async function addNewDecision(input: DecisionFormData) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authorized');

  const firestoreObj = mapDecisionToFirestoreCreate({
    ...input,
    userId: user.uid,
    status: DecisionStatus.PROCESSING,
    llmResult: null,
    createdAt: serverTimestamp(),
    reasoning: input.reasoning ?? null,
  });
  const ref = await addDecisionRaw(firestoreObj);
  await updateDoc(ref, { id: ref.id });
  analyzeAndUpdateDecision(ref.id, input);
}

export async function fetchDecisionsPage({
  lastDoc,
  userId,
}: {
  lastDoc?: QueryDocumentSnapshot<DocumentData>;
  userId: string;
}) {
  const snap = await getDecisionsPageRaw({ userId, lastDoc });

  const items: Decision[] = snap.docs.map(mapFirestoreDecisionToEntity);

  return {
    items,
    lastDoc: snap.docs[snap.docs.length - 1] as QueryDocumentSnapshot<DocumentData> | undefined,
    hasMore: snap.size === DECISIONS_PER_PAGE,
  };
}

export async function analyzeAndUpdateDecision(id: string, input: DecisionFormData) {
  try {
    const llmResult = await analyzeDecision(input);
    await updateDoc(doc(db, 'decisions', id), {
      llmResult,
      status: DecisionStatus.COMPLETED,
    });
  } catch (e: any) {
    await updateDoc(doc(db, 'decisions', id), {
      status: DecisionStatus.ERROR,
      llmError: String(e),
    });
  }
}
