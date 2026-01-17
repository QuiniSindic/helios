export const ScoreBadgeForm = ({ score }: { score?: string }) => {
  return (
    <span
      className="ml-2 inline-flex h-8 min-w-[48px] items-center justify-center rounded-full 
                 border border-gray-200 bg-gray-100 px-2 text-base font-bold tabular-nums 
                 text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
      title={score || 'vs'}
    >
      {score ?? 'vs'}
    </span>
  );
};
