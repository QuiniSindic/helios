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

  const emailValue = watch('email');
  const passwordValue = watch('password');

  const onSubmit = async (data: FormData) => {
    setError(null);
    setLoading(true);
    const { email, password } = data;

    const url = isLogin ? '/api/auth/sign-in' : '/api/auth/sign-up';

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
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
