import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import EyeIcon from '../ui/icons/EyeIcon';
import EyeShowIcon from '../ui/icons/EyeShowIcon';

interface PasswordInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
}

const PasswordInput = ({ register }: PasswordInputProps) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="relative">
      <input
        {...register('password')}
        type={isVisible ? 'text' : 'password'}
        required
        className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-[#272727] dark:border-gray-600 dark:placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors duration-200"
        placeholder="Contraseña"
      />
      <button
        type="button"
        onClick={toggleVisibility}
        className="absolute inset-y-0 right-0 pr-3 flex items-center"
        aria-label="toggle password visibility"
      >
        {isVisible ? (
          <EyeShowIcon className="text-2xl text-default-400 pointer-events-none" />
        ) : (
          <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
