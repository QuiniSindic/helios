import { menuItems } from '@/constants/menuLinks';
import { NavbarContent, NavbarItem } from '@heroui/react';
import Link from 'next/link';

interface DesktopNavbarProps {
  onNavigate: (path: string) => void;
}

export const DesktopNavbarMenu = ({ onNavigate }: DesktopNavbarProps) => {
  return (
    <NavbarContent
      className="hidden sm:flex gap-4 text-foreground"
      justify="end"
    >
      {menuItems.map((item) => (
        <NavbarItem key={item.path}>
          {/* <button
            onClick={() => handleMenuItemClick(item.path)}
            className="text-inherit"
          >
            {item.name}
          </button> */}
          <Link
            href={item.path}
            onClick={() => onNavigate(item.path)}
            className="block w-full py-2 text-foreground"
          >
            {item.name}
          </Link>
        </NavbarItem>
      ))}
    </NavbarContent>
  );
};
