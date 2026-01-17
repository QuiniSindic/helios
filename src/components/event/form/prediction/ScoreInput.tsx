interface ScoreInputProps {
  value?: number | string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function ScoreInput({
  value,
  onChange,
  disabled,
}: ScoreInputProps) {
  const strValue = value === undefined || value === null ? '' : String(value);
  const isEmpty = strValue === '';

  return (
    <input
      disabled={disabled}
      type="number"
      inputMode="numeric"
      min={0}
      step={1}
      value={strValue}
      onChange={(e) => onChange(e.target.value)}
      className={`
        no-arrows w-16 h-16 rounded-2xl text-center text-2xl font-bold tabular-nums
        transition-all duration-200 outline-none
        ${
          disabled
            ? 'bg-gray-200 dark:bg-gray-700 text-gray-400'
            : isEmpty
              ? 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100'
              : 'bg-secondary text-white shadow-md'
        }
        focus:ring-secondary/70 focus:border-secondary
      `}
    />
  );
}
