import { API_LOGO_COMPETITION_URL } from '@/core/config';
import { TeamPrediction } from './TeamPrediction';

interface TeamPredictionContainerProps {
  event: {
    homeTeam: {
      name: string;
      img: string;
    };
    awayTeam: {
      name: string;
      img: string;
    };
  };
  homeScore: string;
  awayScore: string;
  setHomeScore: (score: string) => void;
  setAwayScore: (score: string) => void;
}

export const TeamPredictionContainer = ({
  event,
  homeScore,
  awayScore,
  setHomeScore,
  setAwayScore,
}: TeamPredictionContainerProps) => {
  return (
    <div className="flex justify-around mb-4">
      <TeamPrediction
        name={event.homeTeam.name}
        imgSrc={
          `${API_LOGO_COMPETITION_URL}${event.homeTeam.img as string}` ||
          '/globe.svg'
        } //src={event.home.img as string}
        score={homeScore}
        onChange={setHomeScore}
      />
      <TeamPrediction
        name={event.awayTeam.name}
        imgSrc={
          `${API_LOGO_COMPETITION_URL}${event.awayTeam.img as string}` ||
          '/globe.svg'
        } //src={event.away.img as string}
        score={awayScore}
        onChange={setAwayScore}
      />
    </div>
  );
};
