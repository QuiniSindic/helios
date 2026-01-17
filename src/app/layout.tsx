import '@/src/styles/globals.css';
import type { Metadata } from 'next';
import { League_Spartan } from 'next/font/google';
import LayoutBody from './layoutBody';
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
          <LayoutBody>{children}</LayoutBody>
        </Providers>
      </body>
    </html>
  );
}
