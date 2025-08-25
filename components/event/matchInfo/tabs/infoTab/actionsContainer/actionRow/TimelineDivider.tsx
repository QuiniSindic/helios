'use client';
import React from 'react';

interface TimelineDividerProps {
  title?: string;
  children?: React.ReactNode;
}

export const TimelineDivider: React.FC<TimelineDividerProps> = ({
  title,
  children,
}) => {
  if (title) {
    return (
      <div className="space-y-3">
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-400 dark:border-gray-600"></div>
          <span className="mx-2 text-gray-500 dark:text-gray-400 flex items-center justify-center">
            {title}
          </span>
          <div className="flex-grow border-t border-gray-400 dark:border-gray-600"></div>
        </div>
        <div>{children}</div>
      </div>
    );
  }

  return <div className="space-y-3">{children}</div>;
};
