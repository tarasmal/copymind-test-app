'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { decisionSchema, DecisionFormData } from '@/features/decisions/model/decisionValidation';
import FormTextArea from '@/shared/ui/FormTextArea';

type Props = {
  onSubmitAction: (data: DecisionFormData) => Promise<void> | void;
  loading?: boolean;
  success?: boolean;
  error?: string | null;
};

export default function DecisionForm({ onSubmitAction, loading, success, error }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<DecisionFormData>({
    resolver: yupResolver(decisionSchema),
    mode: 'onChange',
    defaultValues: {
      situation: '',
      decision: '',
      reasoning: '',
    },
  });

  const internalSubmit = async (data: DecisionFormData) => {
    await onSubmitAction(data);
    reset();
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(internalSubmit)}>
      <FormTextArea
        label="Situation"
        required
        minRows={3}
        error={errors.situation?.message}
        {...register('situation')}
      />
      <FormTextArea
        label="Decision"
        required
        minRows={2}
        error={errors.decision?.message}
        {...register('decision')}
      />
      <FormTextArea
        label="Reasoning (optional)"
        minRows={2}
        error={errors.reasoning?.message}
        {...register('reasoning')}
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {success && <div className="text-green-600 text-sm">Decision submitted!</div>}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4 disabled:opacity-50 hover:cursor-pointer"
        disabled={loading || !isValid}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
