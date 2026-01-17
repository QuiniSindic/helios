'use client';

import { Button } from '@heroui/react';

interface SubmitButtonProps {
  isLoading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

export default function SubmitButton({
  isLoading,
  disabled,
  children,
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      isLoading={isLoading}
      isDisabled={disabled}
      className={`group w-full justify-center py-2 px-4 text-sm font-medium rounded-md text-white transition-colors
        ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-secondary hover:bg-secondary/90 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-secondary'}
      `}
    >
      {children}
    </Button>
  );
}
