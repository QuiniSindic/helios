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
  const initialStyle =
    'no-arrows mt-2 bg-white dark:bg-gray-800 w-16 h-16 rounded-xl text-black dark:text-white text-2xl text-center border border-secondary';
  const filledStyle =
    'no-arrows mt-2 bg-secondary w-16 h-16 rounded-xl text-white text-2xl text-center';

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
      className={isEmpty ? initialStyle : filledStyle}
    />
  );
}
