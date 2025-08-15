'use client';
import { useAuth } from '@/hooks/useAuth';

export default function Welcome() {
  const { data: user, isLoading, isFetching } = useAuth();
  const loading = isLoading || isFetching;

  if (loading) {
    return <></>;
  }

  if (!user) {
    return (
      <div className="bg-secondary text-white p-4 rounded-lg shadow-md mb-4">
        <h2 className="text-2xl font-bold mb-4">Bienvenido</h2>
        <h2 className="text-lg font-semibold mb-4">
          Por favor inicia sesión para guardar tus predicciones.
        </h2>
      </div>
    );
  }
}
