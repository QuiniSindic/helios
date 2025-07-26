import EventTeamsData from '@/components/ui/matchWidget/EventTeamsData';
import { MatchSchedule } from '@/components/ui/matchWidget/MatchSchedule';
import { MatchData } from '@/types/custom.types';
import LiveBadge from './LiveBadge';

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
  const showScore = isFinished || isLive;
  return (
    <div
      key={event.id}
      className="relative bg-white dark:bg-[#272727] mb-4 p-3 md:p-4 rounded-lg shadow-md cursor-pointer transition-all duration-200 sm:hover:shadow-lg sm:hover:scale-[1.02] active:scale-[0.98] sm:active:scale-100 flex flex-row sm:flex-col items-center"
    >
      {isLive && isLive === true && <LiveBadge />}
      <EventTeamsData event={event} showScore={showScore} />
      <div className="mt-4 ml-8 sm:ml-0 sm:mt-4">
        <MatchSchedule
          isLive={isLive}
          isFinished={isFinished}
          event={event}
          date={event.kickoff}
        />
      </div>
    </div>
  );
}
