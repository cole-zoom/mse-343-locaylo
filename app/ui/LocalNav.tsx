'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Calendar, MessageSquare, User } from 'lucide-react';

export const LocalNav: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActivitiesActive = pathname === '/local-home';
  const isChatActive = pathname?.startsWith('/local-chat') || false;
  const isProfileActive = pathname === '/local-profile';

  return (
    <div 
      className="fixed bottom-0 w-full max-w-md py-4 px-8 flex justify-around items-center z-40 pb-6"
      style={{ 
        backgroundColor: 'var(--background)',
        borderTop: '2px solid var(--border-default)'
      }}
    >
      <button 
        onClick={() => router.push('/local-home')}
        className="flex flex-col items-center gap-1 transition-colors"
      >
        <Calendar 
          size={28} 
          strokeWidth={2} 
          style={{ color: isActivitiesActive ? 'var(--text-primary)' : 'var(--text-muted)' }} 
        />
        <span 
          className="text-xs font-medium" 
          style={{ color: isActivitiesActive ? 'var(--text-primary)' : 'var(--text-muted)' }}
        >
          activities
        </span>
      </button>
      
      <button 
        onClick={() => router.push('/local-chat')}
        className="flex flex-col items-center gap-1 transition-colors"
      >
        <MessageSquare 
          size={28} 
          strokeWidth={2} 
          style={{ color: isChatActive ? 'var(--text-primary)' : 'var(--text-muted)' }} 
        />
        <span 
          className="text-xs font-medium" 
          style={{ color: isChatActive ? 'var(--text-primary)' : 'var(--text-muted)' }}
        >
          chat
        </span>
      </button>

      <button 
        onClick={() => router.push('/local-profile')}
        className="flex flex-col items-center gap-1 transition-colors"
      >
        <User 
          size={28} 
          strokeWidth={2} 
          style={{ color: isProfileActive ? 'var(--text-primary)' : 'var(--text-muted)' }} 
        />
        <span 
          className="text-xs font-medium" 
          style={{ color: isProfileActive ? 'var(--text-primary)' : 'var(--text-muted)' }}
        >
          profile
        </span>
      </button>
    </div>
  );
};

