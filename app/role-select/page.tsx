'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Role } from '@/lib/types';

export default function RoleSelectPage() {
  const router = useRouter();

  const handleRoleSelection = (selectedRole: Role) => {
    // Store role in sessionStorage
    sessionStorage.setItem('role', selectedRole);
    
    if (selectedRole === 'traveler') {
      router.push('/traveler-home');
    } else {
      router.push('/local-home');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 max-w-md mx-auto relative font-sans text-center animate-in fade-in duration-500">
      <h1 className="text-5xl font-extrabold mb-6 tracking-tight text-black">Locaylo</h1>
      <p className="text-gray-900 font-normal mb-16 leading-7 text-lg">
        Travelers browse and sign up for activities, while locals create them and host in their own city.
      </p>

      <h3 className="text-gray-900 font-normal text-3xl mb-10">Continue As</h3>

      <div className="space-y-6 w-full px-2">
        <button 
          onClick={() => handleRoleSelection('traveler')}
          className="w-full py-5 rounded-3xl text-2xl font-bold bg-white text-black shadow-[0_4px_20px_rgba(96,165,250,0.3)] hover:shadow-[0_4px_25px_rgba(96,165,250,0.4)] active:scale-[0.98] transition-all"
        >
          Traveler
        </button>
        <button 
          onClick={() => handleRoleSelection('local')}
          className="w-full py-5 rounded-3xl text-2xl font-bold bg-white text-black shadow-[0_4px_20px_rgba(96,165,250,0.3)] hover:shadow-[0_4px_25px_rgba(96,165,250,0.4)] active:scale-[0.98] transition-all"
        >
          Local
        </button>
      </div>

      <p className="mt-12 text-gray-900 text-lg font-normal">You can switch later!</p>
    </div>
  );
}

