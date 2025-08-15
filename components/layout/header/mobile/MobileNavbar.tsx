import { NavbarContent, NavbarMenuToggle } from '@heroui/react';
import { AvatarActions } from '../Avatar';
import { Brand } from '../Brand';

interface MobileNavbarProps {
  isMenuOpen: boolean;
}

export const MobileNavbar = ({ isMenuOpen }: MobileNavbarProps) => {
  return (
    <>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          className="text-foreground"
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden" justify="center">
        <Brand />
      </NavbarContent>

      <NavbarContent className="sm:hidden" justify="end">
        <AvatarActions />
      </NavbarContent>
    </>
  );
};
