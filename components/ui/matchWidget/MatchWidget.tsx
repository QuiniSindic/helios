import CompetitionBadge from '@/components/ui/matchWidget/CompetitionBadge';
import EventTeamsData from '@/components/ui/matchWidget/EventTeamsData';
import { MatchSchedule } from '@/components/ui/matchWidget/MatchSchedule';
import { leaguesIdMap } from '@/constants/mappers';
import { MatchData } from '@/types/events/events.types';
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

  const competitionId = event?.competitionid;

  const competitionName =
    Object.keys(leaguesIdMap).find(
      (key) => leaguesIdMap[key] === competitionId,
    ) || 'Competición desconocida';

  return (
    <div
      key={event.id}
      className="relative bg-white dark:bg-[#272727] mb-4 p-3 md:p-4
      rounded-lg shadow-md cursor-pointer transition-all duration-200
      sm:hover:shadow-lg sm:hover:scale-[1.02] active:scale-[0.98] sm:active:scale-100
      flex flex-row sm:flex-col items-center gap-3 py-4"
    >
      {isLive && <LiveBadge />}

      <EventTeamsData event={event} showScore={showScore} />

      <div className="ml-8 sm:ml-0 mt-0 sm:mt-4 flex flex-col items-end sm:items-center w-full sm:w-auto">
        <CompetitionBadge
          id={competitionId}
          name={competitionName}
          className={`mb-2 ${isLive ? 'mt-4' : ''}`}
        />
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
