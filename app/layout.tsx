import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { League_Spartan } from 'next/font/google';
import { Providers } from './providers';

const leagueSpartan = League_Spartan({
  variable: '--font-league-spartan',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Helios',
  description:
    'Pronostica con tus amigos los resultados de los eventos deportivos más relevantes',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${leagueSpartan.className} flex flex-col min-h-screen`}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
