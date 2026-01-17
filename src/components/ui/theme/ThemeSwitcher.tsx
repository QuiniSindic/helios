'use client';

import { useThemeMode } from '@/src/hooks/useThemeMode';
import { Switch, VisuallyHidden } from '@heroui/react';
import { Moon, Sun } from 'lucide-react';

export function ThemeSwitcher() {
  const { mounted, isDark, toggleTheme } = useThemeMode();

  if (!mounted) return null;

  return (
    <Switch
      isSelected={isDark}
      onValueChange={toggleTheme}
      size="lg"
      classNames={{
        base: 'bg-transparent',
        wrapper: `
          bg-gray-200 dark:bg-quinisindic-grey
          group-data-[selected=true]:bg-gray-200
          dark:group-data-[selected=true]:bg-quinisindic-grey
        `,
        thumb: 'bg-white',
      }}
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <Moon className={className} />
        ) : (
          <Sun className={className} />
        )
      }
    >
      <VisuallyHidden>Toggle theme</VisuallyHidden>
    </Switch>
  );
}
