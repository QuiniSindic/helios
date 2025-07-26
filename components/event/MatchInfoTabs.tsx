import { MatchData } from '@/types/custom.types';
import { PredictionObject } from '@/types/database/table.types';
import { useState } from 'react';
import { MatchInfoPredictionsTab } from './MatchInfoPredictionsTab';
import { MatchInfoTab } from './MatchInfoTab';

type TabKey = 'match' | 'predictions';

interface MatchInfoTabsProps {
  event: MatchData;
  predictions: PredictionObject[];
  isFinished?: boolean;
  isInProgress?: boolean; // Indica si el partido está en curso
  notStarted?: boolean; // Indica si el partido no ha iniciado
  refetchAllPreds?: () => void; // Función para recargar las predicciones
  loadingAllPreds?: boolean; // Indica si las predicciones están cargando
}

export const MatchInfoTabs: React.FC<MatchInfoTabsProps> = ({
  event,
  predictions,
  loadingAllPreds,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('match');

  return (
    <>
      <div className="flex border-b mb-4">
        <button
          onClick={() => setActiveTab('match')}
          className={`flex-1 py-2 text-center ${
            activeTab === 'match'
              ? 'border-b-2 border-secondary font-semibold'
              : 'text-gray-500'
          }`}
        >
          Partido
        </button>
        <button
          onClick={() => setActiveTab('predictions')}
          className={`flex-1 py-2 text-center ${
            activeTab === 'predictions'
              ? 'border-b-2 border-secondary font-semibold'
              : 'text-gray-500'
          }`}
        >
          Predicciones
        </button>
      </div>

      {/* Contenido de la pestaña Partido */}
      {activeTab === 'match' && (
        <MatchInfoTab event={event} isFinished isInProgress notStarted />
      )}

      {activeTab === 'predictions' && (
        <MatchInfoPredictionsTab
          predictions={predictions}
          loadingAllPreds={loadingAllPreds}
        />
      )}
    </>
  );
};
