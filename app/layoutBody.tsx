'use client';

import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header/Header';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function LayoutBody({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage =
    pathname?.startsWith('/login') || pathname?.startsWith('/sign-up');

  return (
    <div className="flex min-h-screen flex-col">
      {!isAuthPage && <Header />}
      <main className="flex-1 flex flex-col">{children}</main>
      {!isAuthPage && <Footer />}
    </div>
  );
}
