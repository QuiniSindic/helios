import { getUserByProfileId } from '@/services/database.service';
import { PredictionObject, UserProfile } from '@/types/database/table.types';
import { Avatar } from '@heroui/react';
import React from 'react';

interface UsersPredictionsProps {
  predictions: PredictionObject[];
}

const UsersPredictions = ({ predictions }: UsersPredictionsProps) => {
  const [users, setUsers] = React.useState<Record<string, UserProfile>>({});

  React.useEffect(() => {
    const fetchUsers = async () => {
      const uniqueProfileIds = Array.from(
        new Set(predictions.map((p) => p.profile_id)),
      );

      const usersData: Record<string, UserProfile> = {};

      // Ejecutamos las llamadas en paralelo
      await Promise.all(
        uniqueProfileIds.map(async (profileId) => {
          try {
            const userData = await getUserByProfileId(profileId as string);
            usersData[profileId as string] = userData[0];
          } catch (error) {
            console.error(
              `Error al obtener usuario con profile_id ${profileId}`,
              error,
            );
          }
        }),
      );
      setUsers(usersData);
    };

    if (predictions.length > 0) {
      fetchUsers();
    }
  }, []);

  // TODO: fix react query
  //     const {
  //     data: users,
  //     isLoading,
  //     error,
  //   } = useQuery<Record<string, UserProfile>>({
  //     queryKey: ['users', predictions],
  //     queryFn: async () => {
  //       const users: Record<string, UserProfile> = {};

  //       for (const prediction of predictions) {
  //         if (!users[prediction.profile_id as string]) {
  //           const user = await getUserByProfileId(prediction.profile_id as string);
  //           users[prediction.profile_id as string] = user;
  //         }
  //       }

  //       return users;
  //     },
  //     enabled: predictions.length > 0,
  //   });

  return (
    <div>
      <h1>Predicciones de tus amigos</h1>

      {predictions.length === 0 && <p>No hay predicciones disponibles.</p>}

      {predictions.map((prediction) => (
        <div
          key={prediction.id}
          className="border border-secondary rounded p-4 mb-2 flex flex-col items-center"
        >
          <Avatar
            src={users[prediction.profile_id as string]?.avatar_url as string}
            alt={users[prediction.profile_id as string]?.username}
            size="lg"
            radius="full"
          />

          <h2 className="text-xl font-semibold mt-2">
            {users[prediction.profile_id as string]?.username ||
              'Usuario desconocido'}
          </h2>

          <p className="mt-1">
            <span className="font-semibold">Predicción:</span>{' '}
            {prediction.prediction.home_score} -{' '}
            {prediction.prediction.away_score}
          </p>
        </div>
      ))}
    </div>
  );
};

export default UsersPredictions;
