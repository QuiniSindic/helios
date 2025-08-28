'use client';

import {
  eventTypeLabels,
  MatchData,
  MatchEvent,
} from '@/types/events/events.types';
import React from 'react';

interface MatchInfoProps {
  event: MatchData;
  isInProgress?: boolean;
  notStarted?: boolean;
  isFinished?: boolean;
}

// TODO: implementar backend con los incidentes de partido porque ahora no hay nada
export const MatchInfoTab: React.FC<MatchInfoProps> = ({
  event,
  // isInProgress,
  // notStarted,
  // isFinished,
}) => {
  const actions = event?.events;
  const hasNoActions =
    actions?.length === 0 || actions === undefined || actions === null;

  return (
    <div className="match-info-container px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Acciones del Partido
      </h1>

      {hasNoActions ? (
        <p className="text-center text-gray-500">
          No hay acciones registradas.
        </p>
      ) : (
        // Grid en móvil, 2 columnas en sm, lista en lg
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {actions.map((action: MatchEvent, idx: number) => {
            const minute =
              typeof action.minute === 'number'
                ? `${action.minute}${action.extraMinute ? `+${action.extraMinute}` : ''}`
                : (action.minute ?? '');
            const label = eventTypeLabels[action.type] || 'Acción';

            return (
              <div
                key={idx}
                className={
                  'flex flex-col sm:flex-row items-center sm:items-start ' +
                  'bg-white dark:bg-gray-800 shadow rounded-2xl p-4 ' +
                  'lg:bg-transparent lg:dark:bg-transparent lg:shadow-none lg:border lg:rounded ' +
                  'lg:px-4 lg:py-2'
                }
              >
                <span className="text-sm font-mono text-secondary mb-2 sm:mb-0 sm:mr-4">
                  {minute}&apos;
                </span>
                <div className="flex-1">
                  <p className="text-base font-semibold">{label}</p>
                  {action.playerName && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {action.playerName}
                    </p>
                  )}
                  {action.extra && (
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      Asistencia: {action.extra}
                    </p>
                  )}
                  {action.score && (
                    <p className="text-sm font-bold mt-1">{action.score}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* <div className="mt-6 text-center">
        {notStarted && <p className="text-gray-700">Partido no iniciado</p>}
        {isInProgress && <p className="text-red-500">Partido en curso</p>}
        {isFinished && <p className="text-gray-500">Partido finalizado</p>}
      </div> */}
    </div>
  );
};
