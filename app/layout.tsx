import Header from "@/components/layout/header";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Helios",
  description:
    "Pronostica con tus amigos los resultados de los eventos deportivos más relevantes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
