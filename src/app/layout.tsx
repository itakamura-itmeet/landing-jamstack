// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs'; // Importar ClerkProvider
import { esES } from '@clerk/localizations'; // Importar localización (¡extra!)

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Landing Jamstack',
  description: 'Creado con Next.js, Supabase, Clerk y Netlify',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Envolver todo con ClerkProvider
    <ClerkProvider localization={esES}> {/* Opcional: Poner los botones en español */}
      <html lang="es">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}