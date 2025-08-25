import React from 'react';

interface ActionDataProps {
  playerName?: string;
  teamName: string;
  assist?: string;
}

export const ActionData: React.FC<ActionDataProps> = ({
  playerName,
  teamName,
  assist,
}) => (
  <div className="min-w-0 flex-1 leading-tight">
    <div className="flex items-baseline gap-2">
      {playerName && (
        <span
          className="truncate text-[15px] font-medium text-gray-800 dark:text-gray-100"
          title={playerName}
        >
          {playerName}
        </span>
      )}
      <span
        className="truncate text-sm text-gray-500 dark:text-gray-400"
        title={teamName}
      >
        ({teamName})
      </span>
    </div>

    {assist && assist !== '-' && (
      <div
        className="truncate text-xs text-gray-500 dark:text-gray-400"
        title={`Asistencia: ${assist}`}
      >
        Asistencia: {assist}
      </div>
    )}
  </div>
);
