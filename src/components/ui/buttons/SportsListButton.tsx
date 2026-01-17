import clsx from 'clsx';
import { memo } from 'react';

type SportListButtonProps = {
  sport: { name: string };
  isSelected: boolean;
  onClick: () => void;
  disabled?: boolean;
  // Si esto actúa como pestañas, pásalo como "tab"
  roleType?: 'toggle' | 'tab';
};

export const SportListButton = memo(function SportListButton({
  sport,
  isSelected,
  onClick,
  disabled = false,
  roleType = 'toggle',
}: SportListButtonProps) {
  const ariaProps =
    roleType === 'tab'
      ? { role: 'tab', 'aria-selected': isSelected }
      : { 'aria-pressed': isSelected };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={sport.name}
      {...ariaProps}
      className={clsx(
        'flex-1 snap-center h-11 px-4 rounded-lg font-semibold',
        // Colores
        isSelected ? 'bg-focus text-secondary' : 'bg-secondary text-white',
        // Transiciones separadas por propiedad
        'transition-colors duration-300',
        'transition-transform duration-150',
        // Efecto hover/active (sin exagerar en móvil)
        'sm:hover:shadow-lg sm:hover:scale-[1.02]',
        'active:scale-[0.98] sm:active:scale-100',
        // Accesibilidad focus
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-focus/70',
        'ring-offset-background',
        // Respeta reduced motion
        'motion-reduce:transition-none motion-reduce:transform-none',
        // Estados deshabilitado
        disabled && 'opacity-50 cursor-not-allowed',
      )}
    >
      {sport.name}
    </button>
  );
});
