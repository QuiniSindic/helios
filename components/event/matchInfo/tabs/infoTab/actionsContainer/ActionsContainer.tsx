import { FINAL_STATUSES, MatchData } from '@/types/custom.types';
import { ActionGroups } from '@/types/events/events.types';
import { Divider } from '@heroui/react';
import { ActionRow } from './actionRow/ActionRow';
import { TimelineDivider } from './actionRow/TimelineDivider';

interface ActionsContainerProps {
  event: MatchData;
  groups: ActionGroups;
}

export const ActionsContainer: React.FC<ActionsContainerProps> = ({
  event,
  groups,
}) => {
  const showFinalDivider = FINAL_STATUSES.includes(event.status);
  const showHalftimeDivider = event.status > '45';

  return (
    <div className="px-4 py-2 lg:px-8">
      <h2 className="text-2xl font-bold text-center mb-4">
        Acciones del partido
      </h2>

      <Divider className="my-4" />

      <div>
        {showFinalDivider && <TimelineDivider title="Final" />}

        {groups.secondHalf.length > 0 && (
          <TimelineDivider>
            {groups.secondHalf.map((ev, i) => (
              <ActionRow key={`fh-${i}`} matchEvent={ev} event={event} />
            ))}
          </TimelineDivider>
        )}

        {showHalftimeDivider && <TimelineDivider title="Descanso" />}

        {groups.firstHalf.length > 0 && (
          <TimelineDivider>
            {groups.firstHalf.map((ev, i) => (
              <ActionRow key={`sh-${i}`} matchEvent={ev} event={event} />
            ))}
          </TimelineDivider>
        )}

        <TimelineDivider title="Inicio" />
      </div>
    </div>
  );
};
