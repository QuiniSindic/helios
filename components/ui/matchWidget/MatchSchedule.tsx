import { Match } from '@/types/la_liga/la_liga.types';
import { formattedDate, formattedTime } from '@/utils/date.utils';

interface MatchScheduleProps {
  date: string;
  isLive?: boolean;
  isFinished?: boolean;
  event: Match;
}

export const MatchSchedule = ({
  date,
  isLive,
  isFinished,
  event,
}: MatchScheduleProps) => {
  const eventDate = new Date(date);

  const dateFormatted = formattedDate(eventDate);
  const timeFormatted = formattedTime(eventDate);

  return (
    <>
      {isLive &&
        (() => {
          switch (event.status) {
            case 'FirstHalf':
              return (
                <p className="text-gray-500 dark:text-white text-sm md:text-base text-center">
                  Primera parte
                </p>
              );
            case 'SecondHalf':
              return (
                <p className="text-gray-500 dark:text-white text-sm md:text-base text-center">
                  Segunda parte
                </p>
              );
            case 'HalfTime':
              return (
                <p className="text-gray-500 dark:text-white text-sm md:text-base text-center">
                  Descanso
                </p>
              );
            // case 60:
            //   return (
            //     <p className="text-gray-500 dark:text-white text-sm md:text-base text-center">
            //       Pospuesto
            //     </p>
            //   );
            case 'Canceled':
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
      {isFinished && (
        <p className="text-gray-500 dark:text-white text-sm md:text-base text-center">
          Finalizado
        </p>
      )}
      {!isLive && !isFinished && (
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
