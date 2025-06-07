import { MatchData } from '@/types/custom.types';
import { formatWithDayjs } from '@/utils/date.utils';

interface MatchScheduleProps {
  date: string;
  isLive?: boolean;
  isFinished?: boolean;
  event: MatchData;
}

export const MatchSchedule = ({
  date,
  isLive,
  isFinished,
  event,
}: MatchScheduleProps) => {
  const dateFormatted = formatWithDayjs(date);

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
        </p>
      )}
    </>
  );
};
