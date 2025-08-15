import { FormData } from '@/types/auth/auth.types';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import AuthInput from '../ui/inputs/AuthInput';
import AuthPasswordInput from '../ui/inputs/AuthPasswordInput';

interface CredentialsProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

export const Credentials = ({ register, errors }: CredentialsProps) => {
  return (
    <div className="space-y-4">
      <AuthInput
        name="email"
        type="email"
        label="Correo electrónico"
        placeholder="Correo electrónico"
        register={register}
        rules={{
          required: 'El correo es obligatorio',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Correo invalido',
          },
        }}
        error={errors.email}
      />

      <AuthPasswordInput
        name="password"
        placeholder="Contraseña"
        register={register}
        rules={{
          required: 'La contraseña es obligatoria',
          minLength: { value: 6, message: 'Mínimo 6 caracteres' },
        }}
        error={errors.password}
      />
    </div>
  );
};
