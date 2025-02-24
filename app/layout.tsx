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
      <body className={`${leagueSpartan.className} antialiased`}>
        <Providers>
          <Header />
          {children}
          <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-center">&copy; 2025 Helios project</p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
