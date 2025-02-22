interface ScoreInputProps {
  value?: number | string;
  onChange: (value: string) => void;
}

export default function ScoreInput({ value, onChange }: ScoreInputProps) {
  const initialStyle =
    'no-arrows mt-2 bg-white w-16 h-16 rounded-xl text-black text-2xl text-center border border-secondary';
  const filledStyle =
    'no-arrows mt-2 bg-secondary w-16 h-16 rounded-xl text-white text-2xl text-center';

  // Consideramos vacío si es undefined o una cadena vacía
  const isEmpty = value === undefined || value === '';

  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={isEmpty ? initialStyle : filledStyle}
    />
  );
}
