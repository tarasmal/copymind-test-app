import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { auth } from '@/shared/lib/firebase';
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

export async function addNewDecision(input: DecisionFormData) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authorized');

  const firestoreObj = mapDecisionToFirestoreCreate({
    ...input,
    userId: user.uid,
    status: DecisionStatus.PROCESSING,
    llmResult: null,
    createdAt: serverTimestamp(),
  });

  await addDecisionRaw(firestoreObj);
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
