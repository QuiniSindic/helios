'use client';
import { useAuth } from '@/hooks/useAuth';

export default function Welcome() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="bg-secondary text-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Cargando</h2>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-secondary text-white p-4 rounded-lg shadow-md mb-4">
        <h2 className="text-2xl font-bold mb-4">Bienvenido</h2>
        <h2 className="text-lg font-semibold mb-4">
          Por favor inicia sesión si quieres realizar alguna predicción.
        </h2>
      </div>
    );
  }

  // si logeas no hace falta mostrar nada
  // return (
  //   <div className="mb-4 mx-4 sm:mx-8 md:mx-8 lg:mx-12 xl:mx-12">
  //     <div className="bg-secondary text-white p-4 rounded-lg shadow-md">
  //       <h2 className="text-2xl font-bold mb-4">Bienvenido {user.email}</h2>
  //       <h2 className="text-lg font-semibold mb-4">
  //         Estos son los eventos de hoy.
  //       </h2>
  //     </div>
  //   </div>
  // );
}
