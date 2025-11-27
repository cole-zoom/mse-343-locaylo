'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Search, MessageSquare, User, Calendar } from 'lucide-react';

interface TravelerNavProps {
  current: 'search' | 'activities' | 'chat' | 'profile';
}

export const TravelerNav: React.FC<TravelerNavProps> = ({ current }) => {
  const router = useRouter();

  return (
    <div 
      className="fixed bottom-0 w-full max-w-md border-t-2 py-4 px-8 flex justify-between items-center z-40 pb-6" 
      style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border-default)' }}
    >
      <button 
        onClick={() => router.push('/traveler-home')}
        className={`flex flex-col items-center gap-1.5 transition-colors ${
          current === 'search' ? 'text-black' : 'text-gray-400'
        }`}
      >
        <Search size={28} strokeWidth={2} />
        <span className="text-xs font-medium">search</span>
      </button>
      
      <button 
        onClick={() => router.push('/traveler-activities')}
        className={`flex flex-col items-center gap-1.5 transition-colors ${
          current === 'activities' ? 'text-black' : 'text-gray-400'
        }`}
      >
        <Calendar size={28} strokeWidth={2} />
        <span className="text-xs font-medium">activities</span>
      </button>
      
      <button 
        onClick={() => router.push('/traveler-chat')}
        className={`flex flex-col items-center gap-1.5 transition-colors ${
          current === 'chat' ? 'text-black' : 'text-gray-400'
        }`}
      >
        <MessageSquare size={28} strokeWidth={2} />
        <span className="text-xs font-medium">chat</span>
      </button>

      <button 
        onClick={() => router.push('/traveler-profile')}
        className={`flex flex-col items-center gap-1.5 transition-colors ${
          current === 'profile' ? 'text-black' : 'text-gray-400'
        }`}
      >
        <User size={28} strokeWidth={2} />
        <span className="text-xs font-medium">profile</span>
      </button>
    </div>
  );
};

