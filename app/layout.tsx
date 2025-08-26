import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header/Header';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { League_Spartan } from 'next/font/google';
import { Providers } from './providers';

const leagueSpartan = League_Spartan({
  variable: '--font-league-spartan',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Quinisindic',
  description:
    'Pronostica con tus amigos los resultados de los eventos deportivos más relevantes',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${leagueSpartan.className}`}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
