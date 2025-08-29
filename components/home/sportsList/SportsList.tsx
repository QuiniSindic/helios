'use client';
import { useSportsFilter } from '@/store/sportsLeagueFilterStore';
import { SportsListDesktop } from './SportsListDesktop';
import { SportsListMobile } from './SportsListMobile';

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
      <SportsListMobile
        selectedSport={selectedSport}
        selectedLeague={selectedLeague}
        toggleSport={toggleSport}
        handleLeagueSelect={handleLeagueSelect}
      />

      {/* Versión para pantallas grandes (desktop) */}
      <SportsListDesktop
        selectedSport={selectedSport}
        selectedLeague={selectedLeague}
        toggleSport={toggleSport}
        handleLeagueSelect={handleLeagueSelect}
      />
    </>
  );
}
