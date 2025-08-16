'use client';

import { FormData } from '@/types/auth/auth.types';
import { FieldError, RegisterOptions, UseFormRegister } from 'react-hook-form';

type Props = {
  name: keyof FormData;
  label?: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<FormData>;
  rules?: RegisterOptions<FormData, keyof FormData>;
  error?: FieldError;
};

export default function AuthInput({
  name,
  type = 'text',
  placeholder,
  register,
  rules,
  error,
}: Props) {
  return (
    <div className="space-y-1">
      <input
        id={name}
        {...register(name, rules)}
        type={type}
        placeholder={placeholder}
        className="appearance-none rounded-lg block w-full px-3 py-2 border border-default-300 placeholder-foreground/60 text-foreground dark:text-white dark:bg-[#272727] dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors"
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <p id={`${name}-error`} className="text-xs text-danger">
          {error.message}
        </p>
      )}
    </div>
  );
}
