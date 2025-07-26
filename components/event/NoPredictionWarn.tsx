import { MatchData } from '@/types/custom.types';

interface NoPredictionWarnProps {
  status: MatchData['status'];
  // prediction: any; // FIX tipado
}

export const NoPredictionWarn: React.FC<NoPredictionWarnProps> = ({
  status,
}) => {
  const notStarted = status === 'NS';

  return (
    notStarted && (
      <div className="text-center mb-4">
        <h1>Realiza la predicción para el siguiente partido</h1>
      </div>
    )
  );
};
