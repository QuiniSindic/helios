type LeagueListButtonProps = {
  league: string;
  isSelected: boolean;
  onClick: () => void;
  disabled?: boolean;
  roleType?: 'tab' | 'toggle';
};

export const LeagueListButton = ({
  league,
  isSelected,
  onClick,
  disabled = false,
  roleType = 'tab', // suele ser un tab en listas de ligas
}: LeagueListButtonProps) => {
  const ariaProps =
    roleType === 'tab'
      ? { role: 'tab', 'aria-selected': isSelected }
      : { 'aria-pressed': isSelected };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={league}
      {...ariaProps}
      className={[
        // layout
        'snap-center h-10 px-3 rounded-lg whitespace-nowrap text-sm font-medium',
        // color states
        isSelected
          ? 'bg-focus text-secondary'
          : 'bg-secondary text-white border border-white/10',
        // transitions separadas
        'transition-colors duration-300',
        'transition-transform duration-150',
        // hover/active (suave)
        'sm:hover:shadow-lg sm:hover:scale-[1.02]',
        'active:scale-[0.98] sm:active:scale-100',
        // focus accesible
        'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-focus/70',
        'ring-offset-background',
        // respeta reduced motion
        'motion-reduce:transition-none motion-reduce:transform-none',
        // disabled
        disabled ? 'opacity-50 cursor-not-allowed' : '',
      ].join(' ')}
    >
      {league}
    </button>
  );
};
