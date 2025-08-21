'use client';
import { sportsList } from '@/constants/mappers';
import { useSportsFilter } from '@/store/sportsLeagueFilterStore';

export default function SportsList() {
  const { selectedSport, setSelectedSport, selectedLeague, setSelectedLeague } =
    useSportsFilter();

  const handleLeagueSelect = (league: string) => {
    setSelectedLeague(league);
  };

  const toggleSport = (sport: string) => {
    setSelectedSport(sport);
  };

  return (
    <>
      {/* Versión para pantallas pequeñas (mobile) */}
      <div className="block lg:hidden">
        <div className="overflow-x-auto flex space-x-4 scrollbar-hide sm:mb-2">
          {sportsList.map((sport) => (
            <button
              key={sport.name}
              onClick={() => toggleSport(sport.name)}
              className={`flex-1 px-4 py-2 rounded-lg whitespace-nowrap transition-colors duration-300 ${
                selectedSport === sport.name
                  ? 'bg-focus text-secondary'
                  : 'bg-secondary text-white'
              }`}
            >
              {sport.name}
            </button>
          ))}
        </div>

        {selectedSport && (
          <div className="my-2 text-center bg-secondary text-white rounded-lg overflow-x-auto flex space-x-4 scrollbar-hide">
            {sportsList
              .find((sport) => sport.name === selectedSport)
              ?.leagues.map((league) => (
                <button
                  key={league}
                  onClick={() => handleLeagueSelect(league)}
                  className={`flex-1 px-4 py-2 whitespace-nowrap transition-colors duration-300 ${
                    selectedLeague === league ? 'bg-focus text-secondary' : ''
                  }`}
                >
                  {league}
                </button>
              ))}
          </div>
        )}
      </div>

      {/* Versión para pantallas grandes (desktop) */}
      <div className="hidden lg:flex gap-4 w-1/5">
        <main className="flex-1 bg-secondary text-white p-4 rounded-lg w-60">
          <h1 className="text-2xl font-bold text-center border-b-2 border-white mb-4">
            Deportes
          </h1>

          {sportsList.map((sport) => (
            <div key={sport.name} className="mb-4">
              <button
                onClick={() => toggleSport(sport.name)}
                className={`w-full text-left py-2 px-2 rounded-md font-bold text-xl transition-colors duration-300 ${
                  selectedSport === sport.name
                    ? 'bg-focus text-white'
                    : 'hover:bg-white/10 text-gray-200'
                }`}
              >
                {sport.name}
              </button>

              <ul className="ml-4 mt-1 border-l border-white/20 pl-2">
                {sport.leagues.map((league) => (
                  <li
                    key={league}
                    onClick={() => handleLeagueSelect(league)}
                    className={`py-1 pl-2 cursor-pointer text-md transition-colors duration-300 ${
                      selectedLeague === league
                        ? 'text-focus font-semibold'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {league}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </main>
      </div>
    </>
  );
}
