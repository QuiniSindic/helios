import React from 'react';

// interface ScoreInputProps {
//   value?: number | string;
//   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

export default function ScoreInput() {
  const [value, setValue] = React.useState<number | string>('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const initialStyle =
    'no-arrows mt-2 bg-white w-16 h-16 rounded-xl text-black text-2xl text-center border border-secondary';
  const filledStyle =
    'no-arrows mt-2 bg-secondary w-16 h-16 rounded-xl text-white text-2xl text-center';

  // Consideramos vacío si es undefined o una cadena vacía
  const isEmpty = value === undefined || value === '';

  console.log('isEmpty =>', isEmpty);
  console.log('value =>', value);

  return (
    <input
      type="number"
      value={value}
      onChange={onChange}
      className={isEmpty ? initialStyle : filledStyle}
    />
  );
}
