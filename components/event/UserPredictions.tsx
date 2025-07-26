import { fetchUsers } from '@/services/predictions.service';
import { PredictionObject, UserProfile } from '@/types/database/table.types';
import { Avatar, Spinner } from '@heroui/react';
import { useQuery } from '@tanstack/react-query';

interface UsersPredictionsProps {
  predictions: PredictionObject[];
}

const UsersPredictions = ({ predictions }: UsersPredictionsProps) => {
  const userIds = predictions.map((p) => p.profile_id as string);

  const {
    data: users,
    isLoading,
    error,
  } = useQuery<Record<string, UserProfile>>({
    queryKey: ['users', predictions],
    queryFn: async () => fetchUsers(userIds),
    enabled: predictions.length > 0,
  });

  if (isLoading) {
    return (
      <Spinner
        classNames={{ label: 'text-foreground mt-4' }}
        label="Cargando predicciones de usuarios..."
        variant="wave"
        color="secondary"
      />
    );
  }

  if (error) {
    console.error('Error fetching users:', error);
    return <p>Error al cargar los usuarios.</p>;
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Predicciones para este evento</h1>

      {predictions.length === 0 ? (
        <p>No hay predicciones disponibles.</p>
      ) : (
        predictions.map((prediction) => {
          const user = users?.[prediction.profile_id as string];

          return (
            <div
              key={prediction.id}
              className="border border-secondary rounded p-4 mb-2 flex flex-col items-center"
            >
              <Avatar
                src={user?.avatar_url || undefined}
                alt={user?.username || 'Usuario desconocido'}
                size="lg"
                radius="full"
              />

              <h2 className="text-xl font-semibold mt-2">
                {user?.username || 'Usuario desconocido'}
              </h2>

              <p className="mt-1">
                <span className="font-semibold">Predicción:</span>{' '}
                {prediction.prediction.home_score} -{' '}
                {prediction.prediction.away_score}
              </p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default UsersPredictions;
