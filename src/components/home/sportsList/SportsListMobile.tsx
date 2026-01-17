import { LeagueListButton } from '@/src/components/ui/buttons/LeagueListButton';
import { OptionsListButton } from '@/src/components/ui/buttons/OptionsListButton';
import { SportListButton } from '@/src/components/ui/buttons/SportsListButton';
import { sportsList } from '@/src/constants/mappers';

interface SportsListMobileProps {
  selectedSport: string | null;
  selectedLeague: string | null;
  toggleSport: (sport: string) => void;
  handleLeagueSelect: (league: string) => void;
}

export const SportsListMobile = ({
  selectedSport,
  selectedLeague,
  toggleSport,
  handleLeagueSelect,
}: SportsListMobileProps) => {
  return (
    <div className="block lg:hidden">
      <div className="overflow-x-auto flex gap-3 scrollbar-hide sm:mb-2 px-1 snap-x snap-mandatory">
        {sportsList.map((sport) => (
          <SportListButton
            key={sport.name}
            sport={sport}
            isSelected={selectedSport === sport.name}
            onClick={() => toggleSport(sport.name)}
          />
        ))}
      </div>

      {selectedSport && (
        <div className="my-2 text-center text-white rounded-lg overflow-x-auto flex gap-2 scrollbar-hide px-1 snap-x">
          {sportsList
            .find((s) => s.name === selectedSport)
            ?.leagues.map((league) => (
              <LeagueListButton
                key={league}
                league={league}
                isSelected={selectedLeague === league}
                onClick={() => handleLeagueSelect(league)}
              />
            ))}
        </div>
      )}

      {/* clasificación en mobile (+ results?) */}
      {selectedSport && selectedLeague && (
        <div className="my-2 text-center text-foreground-50 rounded-lg overflow-x-auto flex gap-2 scrollbar-hide px-1 snap-x">
          <OptionsListButton
            key="standing"
            title="Clasificación"
            isSelected={false}
            onClick={() =>
              window.dispatchEvent(new CustomEvent('open-standings'))
            }
          />

          <OptionsListButton
            key="results"
            title="Resultados"
            isSelected={false}
            onClick={() =>
              window.dispatchEvent(new CustomEvent('open-results'))
            }
          />
        </div>
      )}
    </div>
  );
};
