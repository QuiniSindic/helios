'use client';

import { useAuth } from '@/hooks/useAuth';
import { NavbarContent } from '@heroui/react';
import Link from 'next/link';
import { Brand } from '../Brand';

interface DesktopNavbarProps {
  onNavigate: (path: string) => void; // lo mantenemos por compat, no lo usamos
  onDesktopMenuToggle: () => void;
}

export const DesktopNavbar = ({ onDesktopMenuToggle }: DesktopNavbarProps) => {
  const { data: user, isLoading } = useAuth();
  const isLogged = !!user && !isLoading;

  return (
    <>
      {/* IZQ: Hamburguesa (siempre en desktop) */}
      <NavbarContent className="hidden sm:flex" justify="start">
        <button
          onClick={onDesktopMenuToggle}
          className="inline-flex items-center justify-center w-10 h-10 rounded-md hover:bg-white/10 transition-colors"
          aria-label="Abrir menú lateral"
        >
          <svg
            className="w-5 h-5 text-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </NavbarContent>

      {/* CENTRO: Brand (centrado absolutamente) */}
      <NavbarContent
        justify="center"
        className="hidden sm:flex absolute left-1/2 transform -translate-x-1/2"
      >
        <Brand />
      </NavbarContent>

      {/* DCHA: acciones (según login) */}
      <NavbarContent className="hidden sm:flex gap-2" justify="end">
        {!isLogged ? (
          <>
            <Link
              href="/login"
              className="inline-flex items-center justify-center h-9 px-3 rounded-full text-sm font-semibold border border-white/10"
            >
              Iniciar sesión
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center h-9 px-3 rounded-full text-sm font-semibold bg-secondary text-white hover:bg-secondary/90"
            >
              Regístrate
            </Link>
          </>
        ) : (
          // Con sesión: vacío (todo va dentro del menú)
          <span className="w-0" aria-hidden />
        )}
      </NavbarContent>
    </>
  );
};
