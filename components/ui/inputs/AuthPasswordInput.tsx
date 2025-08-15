'use client';

import { FormData } from '@/types/auth/auth.types';
import { EyeIcon } from 'lucide-react';
import React from 'react';
import { FieldError, RegisterOptions, UseFormRegister } from 'react-hook-form';
import EyeShowIcon from '../icons/EyeShowIcon';
import AuthInput from './AuthInput';

type Props = {
  name: keyof FormData;
  label?: string;
  placeholder?: string;
  register: UseFormRegister<FormData>;
  rules?: RegisterOptions<FormData, keyof FormData>;
  error?: FieldError;
};

export default function AuthPasswordInput({
  name = 'password',
  placeholder = 'Contraseña',
  register,
  rules,
  error,
}: Props) {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <div className="space-y-1">
      <div className="relative">
        <AuthInput
          name={name}
          type={isVisible ? 'text' : 'password'}
          placeholder={placeholder}
          register={register}
          rules={rules}
          error={error}
        />

        <button
          type="button"
          onClick={() => setIsVisible((v) => !v)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          aria-label={isVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        >
          {isVisible ? (
            <EyeShowIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      </div>
    </div>
  );
}
