'use client';

import { UserButton, useUser, useAuth } from '@clerk/nextjs';
import { createSupabaseClient } from '../../lib/supabaseClient';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const { user } = useUser();
  const { getToken } = useAuth(); // para pedir el JWT de Clerk
  const [profiles, setProfiles] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSupabaseData() {
      setLoading(true);

      // 1. pedir el token a Clerk (usa el template "supabase" que creaste)
      const token = await getToken({ template: 'supabase' });

      // 2. crear cliente de supabase con ese token
      const supabase = createSupabaseClient(token || undefined);

      // 3. ya puedes consultar con RLS
      const { data, error } = await supabase.from('user_profiles').select('*');

      if (error) {
        console.error(error);
      } else {
        setProfiles(data);
      }

      setLoading(false);
    }

    fetchSupabaseData();
  }, [getToken]);

  return (
    <div className="p-24">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <UserButton afterSignOutUrl="/" />
      </header>
      <main>
        <p className="mb-4">
          Bienvenido, {user?.firstName || 'Usuario'}.
        </p>
        <p className="mb-4 text-sm text-gray-600">
          Tu ID de Clerk: {user?.id}
        </p>

        <h2 className="text-xl font-semibold">Perfiles de Usuario (desde Supabase):</h2>
        {loading && <p>Cargando datos...</p>}

        {!loading && profiles && (
          <pre className="bg-gray-100 p-4 rounded-md mt-4 overflow-auto text-black">
            {JSON.stringify(profiles, null, 2)}
          </pre>
        )}

        {/* Este mensaje ahora debería cambiar */}
        {!loading && profiles?.length === 0 && (
          <p className="text-green-500 mt-4">
            ¡Conexión exitosa! No se encontraron perfiles.
            (Esto es normal si aún no hemos insertado datos).
          </p>
        )}
      </main>
    </div>
  );
}
