'use client';

import { Switch, VisuallyHidden } from '@heroui/react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const current = theme === 'system' ? systemTheme : theme;
  const isDark = current === 'dark';

  return (
    <Switch
      isSelected={isDark}
      onValueChange={(on) => setTheme(on ? 'dark' : 'light')}
      size="lg"
      classNames={{
        base: 'bg-transparent',
        wrapper: `
          bg-gray-200 dark:bg-[#272727]
          group-data-[selected=true]:bg-gray-200
          dark:group-data-[selected=true]:bg-[#272727]
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
