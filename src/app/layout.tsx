import type { Metadata } from 'next';
import './globals.css';
import Header from '@/shared/ui/Header';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Decision Journal',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-black min-h-screen">
        <Header />
        <main className="pt-20 max-w-3xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
