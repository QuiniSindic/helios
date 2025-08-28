import type { MatchData } from '@/types/events/events.types';
import { Spinner } from '@heroui/react';
import React from 'react';

interface MatchInfoOddsTabProps {
  event: MatchData;
  loadingAllOdds?: boolean;
}

const formatOdd = (odd?: number | string) => {
  if (odd == null) return '–';
  const n = Number(odd);
  if (!isFinite(n) || n <= 0) return '–';
  return n % 1 === 0 ? n.toString() : n.toFixed(2);
};

export const MatchInfoOddsTab: React.FC<MatchInfoOddsTabProps> = ({
  event,
  loadingAllOdds,
}) => {
  const odds = event?.Odds;

  if (loadingAllOdds) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner />
      </div>
    );
  }

  if (!odds) {
    return (
      <div className="flex items-center justify-center py-12 text-sm text-white/70">
        No hay cuotas disponibles todavía.
      </div>
    );
  }

  const entries = [
    { label: event.homeTeam.name, odd: Number(odds.homeOdd), key: 'home' },
    { label: 'Empate', odd: Number(odds.drawOdd), key: 'draw' },
    { label: event.awayTeam.name, odd: Number(odds.awayOdd), key: 'away' },
  ];

  // Favourite = lowest price (highest implied probability)
  const favouriteKey = entries.reduce((min, e) =>
    e.odd < min.odd ? e : min,
  ).key;

  return (
    <div className="p-4 sm:p-6 shadow-lg backdrop-blur">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 cursor-pointer">
        {entries.map(({ label, odd, key }) => {
          const isFavourite = key === favouriteKey;
          return (
            <div
              key={key}
              className={[
                'group rounded-2xl border bg-black/30 p-4 transition',
                'border-white/10 hover:border-white/20 hover:bg-black/40',
                isFavourite ? 'ring-1 ring-purple-400/60' : '',
              ].join(' ')}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-white/80">
                  {label}
                </span>
                {isFavourite && (
                  <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-purple-200">
                    Favorito
                  </span>
                )}
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold leading-none text-white">
                  {formatOdd(odd)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MatchInfoOddsTab;
