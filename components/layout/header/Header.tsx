'use client';

import { Navbar } from '@heroui/navbar';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { DesktopNavbar } from './desktop/DesktopNavbar';
import { MobileNavbar } from './mobile/MobileNavbar';
import { MobileNavbarMenu } from './mobile/MobileNavbarMenu';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSticky, setIsSticky] = React.useState<'sticky' | 'static'>('sticky');

  // Evitar salto de layout por SSR: decide stickiness en cliente
  React.useEffect(() => {
    const isSmall = window.matchMedia('(max-width: 525px)').matches;
    setIsSticky(isSmall ? 'static' : 'sticky');
  }, []);

  React.useEffect(() => {
    // cada vez que cambia la ruta, cerramos el menú móvil
    setIsMenuOpen(false);
  }, [pathname]);

  const handleNavigate = (path: string) => {
    setIsMenuOpen(false);
    setTimeout(() => router.push(path), 0);
  };

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      maxWidth="full"
      position={isSticky}
      isBlurred={false}
    >
      <MobileNavbar isMenuOpen={isMenuOpen} />

      <DesktopNavbar onNavigate={handleNavigate} />

      <MobileNavbarMenu onNavigate={handleNavigate} />
    </Navbar>
  );
}
