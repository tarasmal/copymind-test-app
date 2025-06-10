import { forwardRef, TextareaHTMLAttributes } from 'react';

type Props = {
  label: string;
  error?: string;
  required?: boolean;
  minRows?: number;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'ref'>;

const FormTextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, error, required, minRows = 2, ...rest }, ref) => (
    <div>
      <label className="block mb-1 font-medium">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <textarea
        className={`w-full p-2 border rounded min-h-[${minRows * 20}px] ${error ? 'border-red-400' : ''}`}
        ref={ref}
        required={required}
        {...rest}
      />
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  ),
);

FormTextArea.displayName = 'FormTextArea';
export default FormTextArea;
