export const NoDataToDisplay = ({ title }: { title: string }) => {
  return (
    <div
      className="
        rounded-xl border bg-white/70 dark:bg-black/20
        border-gray-200/70 dark:border-white/10
        backdrop-blur-sm p-6 text-center text-gray-600 dark:text-white/70
      "
    >
      {title}
    </div>
  );
};
