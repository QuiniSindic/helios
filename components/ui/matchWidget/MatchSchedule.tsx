import { ParsedEvent } from '@/types/sofascoreTypes/parsedEvents.types';
import { formattedDate, formattedTime } from '@/utils/date.utils';

interface MatchScheduleProps {
  date: string;
  isLive?: boolean;
  event: ParsedEvent;
}

export const MatchSchedule = ({ date, isLive, event }: MatchScheduleProps) => {
  const eventDate = new Date(date);

  const dateFormatted = formattedDate(eventDate);
  const timeFormatted = formattedTime(eventDate);

  return (
    <>
      {isLive &&
        (() => {
          switch (event.status.code) {
            case 6:
              return (
                <p className="text-gray-500 dark:text-white text-sm md:text-base text-center">
                  Primera parte
                </p>
              );
            case 7:
              return (
                <p className="text-gray-500 dark:text-white text-sm md:text-base text-center">
                  Segunda parte
                </p>
              );
            case 31:
              return (
                <p className="text-gray-500 dark:text-white text-sm md:text-base text-center">
                  Descanso
                </p>
              );
            case 31:
              return (
                <p className="text-gray-500 dark:text-white text-sm md:text-base text-center">
                  Descanso
                </p>
              );
            case 60:
              return (
                <p className="text-gray-500 dark:text-white text-sm md:text-base text-center">
                  Pospuesto
                </p>
              );
            case 70:
              return (
                <p className="text-gray-500 dark:text-white text-sm md:text-base text-center">
                  Cancelado
                </p>
              );
            default:
              return (
                <p className="text-gray-500 dark:text-white text-sm md:text-base text-center">
                  <p className="text-gray-500 dark:text-white text-sm md:text-base text-center">
                    {dateFormatted}
                    <br className="sm:hidden" />
                    <span className="hidden sm:inline"> - </span>
                    {timeFormatted}h
                  </p>
                </p>
              );
          }
        })()}
      {!isLive && (
        <p className="text-gray-500 dark:text-white text-sm md:text-base text-center">
          {dateFormatted}
          <br className="sm:hidden" />
          <span className="hidden sm:inline"> - </span>
          {timeFormatted}h
        </p>
      )}
    </>
  );
};
