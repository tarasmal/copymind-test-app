import * as yup from 'yup';

export const TEXT_REGEX = /^[a-zA-Zа-яА-ЯёЁіІїЇєЄ'.,!?\-\s"]+$/u;

export const decisionSchema = yup.object({
  situation: yup
    .string()
    .trim()
    .required('Situation is required')
    .min(1, 'Situation cannot be empty')
    .matches(TEXT_REGEX, 'Only text is allowed (no numbers or special symbols)'),
  decision: yup
    .string()
    .trim()
    .required('Decision is required')
    .min(1, 'Decision cannot be empty')
    .matches(TEXT_REGEX, 'Only text is allowed (no numbers or special symbols)'),
  reasoning: yup
    .string()
    .trim()
    .notRequired()
    .min(1, 'Decision cannot be empty')
    .test(
      'is-text-or-empty',
      'Only text is allowed (no numbers or special symbols)',
      (value) => !value || TEXT_REGEX.test(value),
    )
    .nullable()
    .default(''),
});

export type DecisionFormData = yup.InferType<typeof decisionSchema>;
