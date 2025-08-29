'use client';

import { useAuth } from '@/hooks/useAuth';
import { NavbarContent, NavbarMenuToggle } from '@heroui/react';
import Link from 'next/link';
import { Brand } from '../Brand';

interface MobileNavbarProps {
  isMenuOpen: boolean;
}

export const MobileNavbar = ({ isMenuOpen }: MobileNavbarProps) => {
  const { data: user, isLoading } = useAuth();

  // Mientras carga, muestra el layout "logeado" para evitar saltos visuales
  const isLogged = !!user && !isLoading;

  return (
    <>
      {isLogged ? (
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
            {/* vacio para que quede todo en su sitio */}
            <span className="inline-block w-9" aria-hidden />
          </NavbarContent>
        </>
      ) : (
        <>
          <NavbarContent className="sm:hidden" justify="start">
            <Brand />
          </NavbarContent>

          <NavbarContent className="sm:hidden" justify="center">
            {/* vacio para que Brand quede a la izquierda */}
          </NavbarContent>

          <NavbarContent className="sm:hidden gap-2" justify="end">
            <Link
              href="/login"
              className="inline-flex items-center justify-center h-9 px-3 rounded-full text-sm font-semibold border border-white/10 text-nowrap"
            >
              Iniciar sesión
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center h-9 px-3 rounded-full text-sm font-semibold bg-secondary text-white hover:bg-secondary/90"
            >
              Regístrate
            </Link>
          </NavbarContent>
        </>
      )}
    </>
  );
};
