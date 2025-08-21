import { menuItems } from '@/constants/menuLinks';
import { NavbarMenu, NavbarMenuItem } from '@heroui/react';
import Link from 'next/link';

interface MobileNavbarMenuProps {
  onNavigate: (path: string) => void;
}

export const MobileNavbarMenu = ({ onNavigate }: MobileNavbarMenuProps) => {
  return (
    <NavbarMenu className="flex flex-col gap-2 items-start">
      {menuItems.map((item) => (
        <NavbarMenuItem key={item.path} className="w-full">
          <Link
            href={item.path}
            onClick={() => onNavigate(item.path)}
            className="block w-full py-2 text-foreground"
          >
            {item.name}
          </Link>
        </NavbarMenuItem>
      ))}

      {/* <Divider className="my-2 w-full" />

      <NavbarMenuItem className="w-full flex items-center justify-between">
        <span className="text-sm text-foreground/70">Tema</span>
        <ThemeSwitcher />
      </NavbarMenuItem> */}
    </NavbarMenu>
  );
};
