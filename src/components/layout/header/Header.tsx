'use client';

import { Navbar } from '@heroui/react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { DesktopNavbar } from './desktop/DesktopNavbar';
import { DesktopNavbarMenu } from './desktop/DesktopNavbarMenu';
import { MobileNavbar } from './mobile/MobileNavbar';
import { MobileNavbarMenu } from './mobile/MobileNavbarMenu';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = React.useState(false);

  const [isSticky, setIsSticky] = React.useState<'sticky' | 'static'>('sticky');

  // Evitar salto de layout por SSR: decide stickiness en cliente
  React.useEffect(() => {
    const isSmall = window.matchMedia('(max-width: 525px)').matches;
    setIsSticky(isSmall ? 'static' : 'sticky');
  }, []);

  React.useEffect(() => {
    // cada vez que cambia la ruta, cerramos el menú móvil
    setIsMobileMenuOpen(false);
    setIsDesktopMenuOpen(false);
  }, [pathname]);

  const handleNavigate = (path: string) => {
    setIsMobileMenuOpen(false);
    setIsDesktopMenuOpen(false);
    setTimeout(() => router.push(path), 0);
  };

  return (
    <Navbar
      onMenuOpenChange={setIsMobileMenuOpen}
      isMenuOpen={isMobileMenuOpen}
      maxWidth="full"
      position={isSticky}
      isBlurred={false}
    >
      {/* se ve siempre pero solo resolucion movil */}
      <MobileNavbar isMenuOpen={isMobileMenuOpen} />

      {/* se ve siempre pero solo resolucion pc */}
      <DesktopNavbar
        onNavigate={handleNavigate}
        onDesktopMenuToggle={() => setIsDesktopMenuOpen(!isDesktopMenuOpen)}
      />

      {/* solo se ve en movil */}
      <MobileNavbarMenu onNavigate={handleNavigate} />

      {/* crear un drawer para desktop para abrir ese y no el del mobile */}
      <DesktopNavbarMenu
        open={isDesktopMenuOpen}
        onClose={() => setIsDesktopMenuOpen(false)}
        onNavigate={handleNavigate}
      />
    </Navbar>
  );
}
