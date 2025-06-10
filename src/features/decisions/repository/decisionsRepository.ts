import { db } from '@/shared/lib/firebase';
import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
  where,
} from 'firebase/firestore';
import { Decision, DECISIONS_PER_PAGE } from '../types/decision';

export async function addDecisionRaw(
  data: Omit<Decision, 'id' | 'createdAt'> & { createdAt?: any },
) {
  return addDoc(collection(db, 'decisions'), data);
}

export async function getDecisionsPageRaw({
  userId,
  lastDoc,
}: {
  userId: string;
  lastDoc?: QueryDocumentSnapshot<DocumentData>;
}) {
  let q = query(
    collection(db, 'decisions'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
    limit(DECISIONS_PER_PAGE),
  );
  if (lastDoc) q = query(q, startAfter(lastDoc));
  return await getDocs(q);
}
