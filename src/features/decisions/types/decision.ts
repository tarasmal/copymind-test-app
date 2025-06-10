export type DateField = { toDate?: () => Date } | null | undefined;

export enum DecisionStatus {
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR',
}

export type LlmResult = {
  alternatives_not_considered: string[];
  cognitive_insights: string[];
  type: string;
};

export type Decision = {
  id: string;
  situation: string;
  decision: string;
  status: DecisionStatus | string;
  reasoning?: string;
  createdAt?: DateField;
  llmError?: string;
  llmResult: LlmResult | null;
};

export const DECISIONS_PER_PAGE = 10;
