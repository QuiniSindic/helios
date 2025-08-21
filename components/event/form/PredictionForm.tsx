'use client';

import { MatchData } from '@/types/custom.types';
import { Button } from '@heroui/react';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import ScoreInput from '../ScoreInput';
import TeamHeader from './TeamHeader';

type FormValues = { home: string; away: string };

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

      <div className="flex justify-around gap-8 my-4">
        <div className="flex flex-col items-center">
          <ScoreInput
            value={home}
            onChange={(v) => setValue('home', clamp(v))}
            disabled={disabled}
          />
          <span className="mt-2 text-sm opacity-80">Local</span>
        </div>

        <div className="flex flex-col items-center">
          <ScoreInput
            value={away}
            onChange={(v) => setValue('away', clamp(v))}
            disabled={disabled}
          />
          <span className="mt-2 text-sm opacity-80">Visitante</span>
        </div>
      </div>

      {/* botón guardar/actualizar */}
      {event.status === 'NS' && (
        <div className="flex justify-center mt-2 w-full">
          {isLoggedIn ? (
            <Button
              type="submit"
              isLoading={saving}
              disabled={!isValid || saving}
              className={`group relative text-white flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md
                ${!isValid ? 'bg-gray-400 cursor-not-allowed' : 'bg-secondary hover:bg-secondary/90'}`}
            >
              {defaults.home !== '' || defaults.away !== ''
                ? 'Actualizar predicción'
                : 'Guardar predicción'}
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
