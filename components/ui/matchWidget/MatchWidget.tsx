import EventTeamsData from '@/components/ui/matchWidget/EventTeamsData';
import { MatchSchedule } from '@/components/ui/matchWidget/MatchSchedule';
import { MatchData } from '@/types/custom.types';

interface MatchWidgetProps {
  event: MatchData;
  isLive?: boolean;
  isFinished?: boolean;
}

export default function MatchWidget({
  event,
  isLive = false,
  isFinished = false,
}: MatchWidgetProps) {
  return (
    <div
      key={event.id}
      className="relative bg-white dark:bg-[#272727] mb-4 p-3 md:p-4 rounded-lg shadow-md cursor-pointer transition-all duration-200 sm:hover:shadow-lg sm:hover:scale-[1.02] active:scale-[0.98] sm:active:scale-100 flex flex-row sm:flex-col items-center"
    >
      {isLive && isLive === true && (
        <div className="absolute top-2 right-2 flex items-center mr-2 sm:mr-4">
          <span className="mr-1 text-sm font-semibold">Live</span>
          <div className="bg-red-600 h-4 w-4 rounded-full animate-pulse"></div>
        </div>
      )}
      <EventTeamsData event={event} showScore={isFinished} />
      <div className="mt-4 ml-auto sm:ml-0 sm:mt-4">
        <MatchSchedule
          isLive={isLive}
          isFinished={isFinished}
          event={event}
          // TODO: revisar el making del kickoff porque falla el UTC
          date={new Date(event.kickoff).toISOString()}
        />
      </div>
    </div>
  );
}
