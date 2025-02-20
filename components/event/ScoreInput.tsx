import React from 'react';

interface ScoreInputProps {
  value?: number | string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ScoreInput({ value, onChange }: ScoreInputProps) {
  return (
    <input
      type="number"
      value={value}
      onChange={onChange}
      className="mt-2 bg-secondary w-16 h-16 rounded-xl text-white text-2xl text-center"
    />
  );
}
