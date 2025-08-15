import { Prediction } from '@/types/database/table.types';

export default function StatusBanner({
  status,
  myPrediction,
}: {
  status: string;
  myPrediction?: Prediction | null;
}) {
  if (status === 'NS' && myPrediction) {
    return (
      <p className="text-center mb-2">
        Tu predicción (editable): {myPrediction.homeScore} -{' '}
        {myPrediction.awayScore}
      </p>
    );
  }
  return null;
}
