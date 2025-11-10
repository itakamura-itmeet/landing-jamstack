// src/app/page.tsx
import { UserButton, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-10">Landing Jamstack</h1>

      {/* Estos componentes controlan qué ve el usuario.
        Es 'Client Component' por defecto, por eso no necesitamos 'use client'.
      */}

      <SignedOut>
        {/* Mostrar si el usuario NO está logueado */}
        <p className="mb-4">¡Bienvenido! Por favor, inicia sesión.</p>
        <SignInButton mode="modal">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Iniciar Sesión
          </button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        {/* Mostrar si el usuario SÍ está logueado */}
        <p className="mb-4">¡Has iniciado sesión!</p>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>

    </main>
  );
}