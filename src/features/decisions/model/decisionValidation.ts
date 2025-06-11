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
    .transform((value) => (value ? value.trim() : null))
    .notRequired()
    .nullable()
    .test(
      'is-text-or-empty',
      'Only text is allowed (no numbers or special symbols) and must not be empty if provided',
      (value) => {
        if (value == null) return true;
        return TEXT_REGEX.test(value) && value.length > 0;
      },
    ),
});

export type DecisionFormData = yup.InferType<typeof decisionSchema>;
