import * as yup from 'yup';

export const TEXT_REGEX = /^[a-zA-Zа-яА-ЯёЁіІїЇєЄ'.,!?\-\s"]+$/u;

export const decisionSchema = yup.object({
  situation: yup
    .string()
    .required('Situation is required')
    .matches(TEXT_REGEX, 'Only text is allowed (no numbers or special symbols)'),
  decision: yup
    .string()
    .required('Decision is required')
    .matches(TEXT_REGEX, 'Only text is allowed (no numbers or special symbols)'),
  reasoning: yup
    .string()
    .transform((value) => (value == null ? '' : value))
    .notRequired()
    .matches(TEXT_REGEX, 'Only text is allowed (no numbers or special symbols)')
    .default(''),
});

export type DecisionFormData = yup.InferType<typeof decisionSchema>;
