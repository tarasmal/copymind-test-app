type SpinnerProps = {
  className?: string;
  size?: number;
  colorClass?: string;
};

export default function Spinner({
  className = '',
  size = 16,
  colorClass = 'text-gray-400',
}: SpinnerProps) {
  return (
    <svg
      className={`animate-spin ${colorClass} ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        d="M4 12a8 8 0 018-8"
      />
    </svg>
  );
}
