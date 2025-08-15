import { NavbarContent } from '@heroui/react';
import { AvatarActions } from '../Avatar';
import { Brand } from '../Brand';
import { DesktopNavbarMenu } from './DesktopNavbarMenu';

interface DesktopNavbarProps {
  onNavigate: (path: string) => void;
}

export const DesktopNavbar = ({ onNavigate }: DesktopNavbarProps) => {
  return (
    <div className="hidden sm:flex w-full justify-between">
      <NavbarContent>
        <Brand />
      </NavbarContent>
      <NavbarContent justify="end">
        <DesktopNavbarMenu onNavigate={onNavigate} />
        <AvatarActions />
      </NavbarContent>
    </div>
  );
};
