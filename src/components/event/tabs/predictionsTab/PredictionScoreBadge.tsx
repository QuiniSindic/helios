type PredictionScoreBadgeProps = {
  home: number;
  away: number;
};

export const PredictionScoreBadge: React.FC<PredictionScoreBadgeProps> = ({
  home,
  away,
}) => {
  return (
    <span
      className="
      inline-flex items-center justify-center rounded-full px-2.5 h-7
      text-sm font-semibold tabular-nums
      bg-gray-100 text-gray-800 border border-gray-200
      dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700
    "
      title={`${home} - ${away}`}
    >
      {home} – {away}
    </span>
  );
};
