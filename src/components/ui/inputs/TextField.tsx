'use client';

import clsx from 'clsx';
import React, { forwardRef } from 'react';

export type TextFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size'
> & {
  label?: string;
  /** Mensaje de ayuda (debajo). Si hay error, se ignora en favor del error. */
  helperText?: string;
  /** Mensaje de error. Controlas su presencia desde react-hook-form. */
  errorText?: string;
  /** Ocultar label visualmente pero mantener accesible. */
  hideLabel?: boolean;
  /** Icono/elemento a la izquierda del input. */
  leftIcon?: React.ReactNode;
  /** Contenedor extra (por si quieres controlar márgenes desde fuera). */
  containerClassName?: string;
  /** Clases extra para el input. */
  inputClassName?: string;
  rightSlot?: React.ReactNode;
};

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      id,
      label,
      helperText,
      errorText,
      hideLabel = !!label,
      leftIcon,
      className,
      containerClassName,
      inputClassName,
      rightSlot,
      type = 'text',
      ...inputProps
    },
    ref,
  ) => {
    const inputId =
      id || inputProps.name || `tf-${Math.random().toString(36).slice(2)}`;
    const hasError = !!errorText;

    return (
      <div className={clsx('w-full', containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className={clsx(
              'block text-sm font-medium text-gray-700 dark:text-white/80 mb-1',
              hideLabel && 'sr-only',
            )}
          >
            {label}
          </label>
        )}

        <div
          className={clsx(
            'relative flex items-center rounded-xl border transition-colors',
            'bg-white/80 border-gray-300 text-gray-900',
            'dark:bg-[#272727] dark:border-gray-600 dark:text-white',
            hasError
              ? 'ring-2 ring-danger/60 border-danger'
              : 'focus-within:ring-2 focus-within:ring-secondary focus-within:border-secondary',
            className,
          )}
        >
          {leftIcon && (
            <span className="pl-3 text-gray-400 dark:text-gray-300 shrink-0">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            type={type}
            spellCheck={false}
            aria-invalid={hasError}
            aria-describedby={
              hasError
                ? `${inputId}-error`
                : helperText
                  ? `${inputId}-help`
                  : undefined
            }
            className={clsx(
              'peer w-full bg-transparent outline-hidden placeholder:text-gray-400 dark:placeholder:text-white/40',
              leftIcon ? 'px-3 py-2 pl-2' : 'px-3 py-2',
              'h-11 rounded-xl',
              rightSlot ? 'pr-12' : '',
              inputClassName,
            )}
            {...inputProps}
          />

          {rightSlot && (
            <div className="pointer-events-auto absolute right-2 top-1/2 -translate-y-1/2">
              {rightSlot}
            </div>
          )}
        </div>

        {hasError ? (
          <p
            id={`${inputId}-error`}
            className="mt-1 text-xs text-danger"
            aria-live="polite"
          >
            {errorText}
          </p>
        ) : helperText ? (
          <p
            id={`${inputId}-help`}
            className="mt-1 text-xs text-gray-500 dark:text-white/60"
          >
            {helperText}
          </p>
        ) : null}
      </div>
    );
  },
);

TextField.displayName = 'TextField';
export default TextField;
