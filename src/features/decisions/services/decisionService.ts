import { db } from '@/shared/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth } from '@/shared/lib/firebase';
import { DecisionFormData } from '@/features/decisions/model/decisionValidation';

export enum DecisionStatus {
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
}

export async function addNewDecision(input: DecisionFormData) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authorized');

  await addDoc(collection(db, 'decisions'), {
    userId: user.uid,
    ...input,
    createdAt: serverTimestamp(),
    status: DecisionStatus.PROCESSING,
    llmResult: null,
  });
}
