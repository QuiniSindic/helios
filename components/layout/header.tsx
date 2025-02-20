'use client';

import { useAuth } from '@/hooks/useAuth';
import QuinisindicLogo from '@/icons/QuinisindicLogo';
import { createClient } from '@/utils/supabase/client';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@heroui/navbar';
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/react';
// import { User } from "@supabase/supabase-js";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const menuItems = [
  { name: 'Eventos', path: '/events' },
  { name: 'Predicciones', path: '/predictions' },
  { name: 'Quiniela', path: '/quiniela' },
  { name: 'Resultados', path: '/results' },
];

export default function Header() {
  const supabase = createClient();
  const router = useRouter();
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSticky, setIsSticky] = React.useState<'sticky' | 'static'>('sticky');

  // useEffect(() => {
  //   // console.log('user =>', user);
  // }, [user]);

  React.useEffect(() => {
    if (window.innerWidth < 526) {
      setIsSticky('static');
    }
  }, []);

  const handleMenuItemClick = (path: string) => {
    setIsMenuOpen(false); // Cierra el menú
    setTimeout(() => router.push(path), 0); // Navega después del cierre del menú
  };

  // console.log("myUser", myUser);
  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      position={isSticky}
      isBlurred={false}
      isMenuOpen={isMenuOpen} // Enlazamos el estado manualmente
      // className="mb-4"
    >
      {/* Toggle icon */}
      <NavbarMenuToggle
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        className="sm:hidden text-foreground"
      />

      {/* Logo y marca */}
      <NavbarContent
        as="div"
        justify="center"
        className="flex justify-center sm:justify-between w-full"
      >
        <NavbarBrand className="flex items-center justify-center w-full sm:justify-start sm:w-auto">
          <Link href="/">
            <QuinisindicLogo />
          </Link>
          <Link href="/">
            <span className="text-lg font-bold hidden sm:inline text-foreground">
              QuiniSindic
            </span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Menu en mobile */}
      <NavbarMenu className="flex flex-col gap-4 items-center">
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.path}>
            <button
              onClick={() => handleMenuItemClick(item.path)}
              className="text-inherit"
            >
              {item.name}
            </button>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>

      {/* Menú desktop + Avatar */}
      <NavbarContent as="div" justify="end">
        {/* Menu en desktop */}
        <NavbarContent
          className="hidden sm:flex gap-4 text-foreground"
          justify="end"
        >
          {menuItems.map((item) => (
            <NavbarItem key={item.path}>
              <button
                onClick={() => handleMenuItemClick(item.path)}
                className="text-inherit"
              >
                {item.name}
              </button>
            </NavbarItem>
          ))}
        </NavbarContent>

        {/* Avatar */}
        {user && user !== null ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform cursor-pointer text-foreground-50"
                color="secondary"
                name={user.email?.substring(0, 2).toUpperCase()}
                size="sm"
                // src={myUser.user_metadata || "https://i.pravatar.cc/150"}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Conectado como</p>
                <p className="font-semibold">{user.email}</p>
              </DropdownItem>
              <DropdownItem key="settings">Configuración</DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                onPress={async () => {
                  await supabase.auth.signOut();
                  // setMyUser(null);
                  router.push('/');
                }}
              >
                Cerrar Sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <Link href="/login">
            <Avatar
              isBordered
              showFallback
              as="button"
              className="transition-transform cursor-pointer text-foreground-50"
              color="secondary"
              size="sm"
            />
          </Link>
        )}
      </NavbarContent>
    </Navbar>
  );
}
