import { useGetUsersUsernames } from '@/hooks/useUsers';
import { Prediction } from '@/types/database/table.types';
import { Avatar, Spinner } from '@heroui/react';

interface UsersPredictionsProps {
  predictions: Prediction[];
}

const UsersPredictions = ({ predictions }: UsersPredictionsProps) => {
  const userIds = predictions.map((p) => p.userId);
  const { data: users = {}, isLoading, error } = useGetUsersUsernames(userIds);

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
          const user = users[prediction.userId];

          return (
            <div
              key={prediction.id}
              className="border border-secondary rounded p-4 mb-2 flex flex-col items-center"
            >
              <Avatar
                src={undefined} // TODO hacer algo con una foto de perfil
                classNames={{
                  base: 'bg-secondary flex items-center justify-center',
                  icon: 'text-white',
                }}
                showFallback
                alt={user?.username}
                size="lg"
                radius="full"
              />

              <h2 className="text-xl font-semibold mt-2">{user?.username}</h2>

              <p className="mt-1">
                <span className="font-semibold">Predicción:</span>{' '}
                {prediction.homeScore} - {prediction.awayScore}
              </p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default UsersPredictions;
