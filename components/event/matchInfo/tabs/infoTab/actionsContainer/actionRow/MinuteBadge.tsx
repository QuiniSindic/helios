import React from 'react';

export const MinuteBadge: React.FC<{ label: string }> = ({ label }) => {
  return (
    <span
      className="inline-flex h-7 items-center justify-center rounded-full px-2.5 text-sm 
               bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100"
      title={`Minuto ${label}`}
    >
      {label}
    </span>
  );
};
