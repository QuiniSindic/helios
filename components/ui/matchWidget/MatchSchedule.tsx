import { formattedDate, formattedTime } from '@/utils/date.utils';

interface MatchScheduleProps {
  date: string;
}

export const MatchSchedule = ({ date }: MatchScheduleProps) => {
  const eventDate = new Date(date);

  const dateFormatted = formattedDate(eventDate);
  const timeFormatted = formattedTime(eventDate);

  return (
    <p className="text-gray-500 dark:text-white text-sm md:text-base text-center">
      {dateFormatted}
      <br className="sm:hidden" />
      <span className="hidden sm:inline"> - </span>
      {timeFormatted}h
    </p>
  );
};
