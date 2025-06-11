import { DecisionFormData } from '@/features/decisions/model/decisionValidation';

export async function analyzeDecision(input: DecisionFormData) {
  const res = await fetch(process.env.NEXT_PUBLIC_LLM_API_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}
