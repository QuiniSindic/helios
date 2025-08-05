import { BACKEND_URL } from '@/core/config';
import { FormData } from '@/types/auth/login.types';
import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import HasAccount from './HasAccount';
import PasswordInput from './PasswordInput';

interface FormAuthProps {
  isLogin?: boolean;
}

const FormAuth = ({ isLogin }: FormAuthProps) => {
  const router = useRouter();
  const [error, setError] = React.useState<Error | null>(null);
  const [loading, setLoading] = React.useState(false);
  const { register, watch, handleSubmit } = useForm<FormData>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const userNameValue = watch('username');
  const emailValue = watch('email');
  const passwordValue = watch('password');

  const onSubmit = async (data: FormData) => {
    setError(null);
    setLoading(true);
    const { email, password, username } = data;

    const url = isLogin ? '/auth/login' : '/auth/signup';

    try {
      const res = await fetch(`${BACKEND_URL}${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, username }),
      });

      const response = await res.json();
      const { error } = response;

      if (error) {
        setError(new Error(error));
        return;
      }

      router.push('/');
    } catch (error) {
      console.error('Error =>', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {!isLogin && (
        <div className="rounded-md shadow-sm space-y-4">
          <input
            {...register('username')}
            type="text"
            required
            className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-[#272727] dark:border-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors duration-200"
            placeholder="Nombre de usuario"
          />
        </div>
      )}
      <div className="rounded-md shadow-sm space-y-4">
        <div>
          <input
            {...register('email')}
            type="email"
            required
            className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-[#272727] dark:border-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors duration-200"
            placeholder="Correo electrónico"
          />
        </div>
        <div>
          <PasswordInput register={register} />
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-sm text-center">
          Credenciales incorrectas. Por favor, inténtalo de nuevo.
        </div>
      )}

      <Button
        type="submit"
        isLoading={loading}
        className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white transition-colors duration-200 
              ${
                !emailValue || !passwordValue
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-secondary hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary'
              }
              `}
      >
        {isLogin ? 'Inicia sesión' : 'Registrarse'}
      </Button>

      <HasAccount isLogin={isLogin} />
    </form>
  );
};

export default FormAuth;
