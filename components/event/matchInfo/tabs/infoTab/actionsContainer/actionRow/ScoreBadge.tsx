import React from 'react';

export const ScoreBadge: React.FC<{ score?: string }> = ({ score }) => {
  if (score) {
    return (
      <span
        className="ml-2 inline-flex h-6 min-w-[40px] items-center justify-center rounded-full 
                 border border-gray-200 bg-gray-100 px-2 text-xs font-semibold tabular-nums 
                 text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        title={score}
      >
        {score}
      </span>
    );
  }

  return <span className="ml-2 h-6" />;
};
