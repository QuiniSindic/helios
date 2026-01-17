'use client';

import { useThemeMode } from '@/src/hooks/useThemeMode';
import { Button } from '@heroui/react';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggleButton() {
  const { mounted, isDark, toggleTheme } = useThemeMode();

  if (!mounted) {
    return (
      <Button isIconOnly variant="light" radius="full" className="opacity-0">
        <div className="w-5 h-5" />
      </Button>
    );
  }

  return (
    <Button
      isIconOnly
      variant="light"
      radius="full"
      aria-label="Toggle theme"
      onPress={toggleTheme}
      className="outline-none text-default-500 hover:bg-gray-200/50 dark:hover:bg-quinisindic-grey/50"
    >
      {isDark ? (
        <Sun size={20} className="transition-all" />
      ) : (
        <Moon size={20} className="transition-all" />
      )}
    </Button>
  );
}
