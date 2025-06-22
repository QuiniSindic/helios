'use client';

import { PredictionObject } from '@/types/database/table.types';
import { Spinner } from '@heroui/react';
import React from 'react';
import UsersPredictions from './UserPredictions';

interface MatchInfoPredictionsTabProps {
  predictions: PredictionObject[];
  loadingAllPreds?: boolean; // Indica si las predicciones están cargando
}

export const MatchInfoPredictionsTab: React.FC<
  MatchInfoPredictionsTabProps
> = ({ predictions, loadingAllPreds }) => {
  return (
    <>
      {loadingAllPreds && (
        <div className="flex justify-center text-center items-center min-h-screen">
          <Spinner
            classNames={{ label: 'text-foreground mt-4' }}
            label="Cargando predicciones de usuarios..."
            variant="wave"
            color="secondary"
          />
        </div>
      )}

      {!loadingAllPreds && predictions.length === 0 && (
        <div className="text-center mb-2">
          <p className="text-red-500">No hay predicciones de usuarios</p>
        </div>
      )}

      {!loadingAllPreds && predictions.length > 0 && (
        <UsersPredictions predictions={predictions} />
      )}
    </>
  );
};
