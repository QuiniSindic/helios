'use client';

import clsx from 'clsx';
import { EyeIcon } from 'lucide-react';
import { forwardRef, useId, useState } from 'react';
import TextField, { TextFieldProps } from './TextField';

type PasswordFieldProps = Omit<TextFieldProps, 'type'> & {
  /** 'current-password' en login, 'new-password' en signup */
  autoComplete?: 'current-password' | 'new-password';
};

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ autoComplete = 'current-password', ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const uid = useId();
    const inputId = props.id || props.name || uid;

    return (
      <TextField
        ref={ref}
        id={inputId}
        type={visible ? 'text' : 'password'}
        hideLabel={props.hideLabel ?? true}
        autoComplete={autoComplete}
        enterKeyHint={props.enterKeyHint ?? 'done'}
        rightSlot={
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            aria-pressed={visible}
            className="
              grid place-items-center h-9 w-9
              rounded-lg text-default-400 hover:text-default-500
              focus:outline-hidden focus-visible:ring-2 focus-visible:ring-secondary
            "
          >
            <EyeIcon className={clsx('h-5 w-5', visible && 'opacity-90')} />
          </button>
        }
        {...props}
      />
    );
  },
);

PasswordField.displayName = 'PasswordField';
export default PasswordField;
