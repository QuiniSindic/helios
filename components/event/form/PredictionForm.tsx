'use client';

import { FormValues, MatchData } from '@/types/events/events.types';
import { Button } from '@heroui/react';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScoreInputsContainer } from './ScoreInputsContainer';
import TeamHeader from './TeamHeader';

interface Props {
  event: MatchData;
  initialPrediction: { home: number | string; away: number | string };
  disabled?: boolean; // deshabilita inputs si no es NS
  isLoggedIn: boolean;
  onSubmit: (vals: FormValues) => Promise<void>;
}

export default function PredictionForm({
  event,
  initialPrediction,
  disabled = false,
  isLoggedIn,
  onSubmit,
}: Props) {
  const defaults = useMemo<FormValues>(
    () => ({
      home:
        initialPrediction.home === '' || initialPrediction.home === null
          ? ''
          : String(initialPrediction.home),
      away:
        initialPrediction.away === '' || initialPrediction.away === null
          ? ''
          : String(initialPrediction.away),
    }),
    [initialPrediction.home, initialPrediction.away],
  );

  const { handleSubmit, reset, watch, setValue } = useForm<FormValues>({
    defaultValues: defaults,
  });

  const [saving, setSaving] = useState(false);
  const home = watch('home');
  const away = watch('away');
  const isValid = home.trim() !== '' && away.trim() !== '';
  const isNS = event.status === 'NS';
  const isFT = event.status === 'FT';
  const matchIsLive = !isNS && !isFT;
  const hasPrediction = defaults.home !== '' || defaults.away !== '';
  const inputsDisabled = disabled || matchIsLive;

  // ✅ reset cuando cambia partido o llega userPred
  useEffect(() => {
    reset(defaults);
  }, [event.id, defaults, reset]);

  const clamp = (v: string) => {
    // solo enteros [0..99]
    if (v === '') return v;
    const n = Math.max(0, Math.min(99, parseInt(v, 10) || 0));
    return String(n);
  };

  const renderInputs = () => {
    if (isFT) {
      return (
        <p className="my-6 text-gray-500 text-center">
          El partido ya finalizó.{' '}
          {!hasPrediction &&
            ' No tenías ninguna predicción activa para este partido.'}
          {hasPrediction &&
            ` Tu predicción fue ${defaults.home} - ${defaults.away}`}
          .
        </p>
      );
    }

    if (matchIsLive && !hasPrediction) {
      return (
        <p className="my-6 text-gray-500 text-center">
          No tenías ninguna predicción activa para este partido.
        </p>
      );
    }

    return (
      <ScoreInputsContainer
        home={home}
        away={away}
        setValue={setValue}
        clamp={clamp}
        disabled={inputsDisabled}
      />
    );
  };

  return (
    <form
      onSubmit={handleSubmit(async (vals) => {
        try {
          setSaving(true);
          await onSubmit({ home: clamp(vals.home), away: clamp(vals.away) });
        } finally {
          setSaving(false);
        }
      })}
      className="flex flex-col items-center"
    >
      <TeamHeader event={event} />

      {renderInputs()}

      {/* botón guardar/actualizar */}
      {isNS && (
        <div className="flex justify-center mt-2 w-full">
          {isLoggedIn ? (
            <Button
              type="submit"
              isLoading={saving}
              disabled={!isValid || saving}
              className={`group relative text-white flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md
                ${!isValid ? 'bg-gray-400 cursor-not-allowed' : 'bg-secondary hover:bg-secondary/90'}`}
            >
              {hasPrediction ? 'Actualizar predicción' : 'Guardar predicción'}
            </Button>
          ) : (
            // si tienes tu SaveButton custom, colócalo aquí
            <Button disabled>Inicia sesión para guardar</Button>
          )}
        </div>
      )}
    </form>
  );
}
