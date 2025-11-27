'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login page on initial load
    router.push('/login');
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold mb-3 tracking-tight text-black">Locaylo</h1>
        <p className="text-gray-400 font-medium">Loading...</p>
      </div>
    </div>
  );
}

