import { Partido } from '@/types/quiniela.types';
import QuinielaWidget from './QuinielaWidget';

interface PredictionsProps {
  partidos: Partido[];
  predictions: string[];
}

export default function Predictions({
  partidos,
  predictions,
}: PredictionsProps) {
  return (
    <div className="grid gap-4">
      {partidos.map((partido, index) => (
        <QuinielaWidget
          key={index}
          partido={partido}
          isLastMatch={index === 14}
          predictions={predictions}
        />
      ))}
      <div className="flex justify-center">
        <button
          className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-secondary/90 transition-colors"
          //   onClick={() => console.log(predicciones)}
        >
          Guardar Quiniela
        </button>
      </div>
    </div>
  );
}
