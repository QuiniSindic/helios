import React from 'react';

export const MinuteBadge: React.FC<{ label: string }> = ({ label }) => (
  <span
    className="
      inline-flex h-7 min-w-[42px] items-center justify-center
      rounded-full px-2.5 text-sm font-semibold tabular-nums
      bg-secondary/10 text-secondary
      dark:bg-secondary/20 dark:text-secondary
    "
    title={`Minuto ${label}`}
  >
    {label}
  </span>
);
