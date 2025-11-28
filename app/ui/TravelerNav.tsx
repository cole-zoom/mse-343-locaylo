'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Search, MessageSquare, User, Calendar } from 'lucide-react';
import { useTravelerActivities } from '@/lib/TravelerActivityContext';

interface TravelerNavProps {
  current: 'search' | 'activities' | 'chat' | 'profile';
}

export const TravelerNav: React.FC<TravelerNavProps> = ({ current }) => {
  const router = useRouter();
  const { chatNotificationCount } = useTravelerActivities();

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
        className={`flex flex-col items-center gap-1.5 transition-colors relative ${
          current === 'chat' ? 'text-black' : 'text-gray-400'
        }`}
      >
        <div className="relative">
          <MessageSquare size={28} strokeWidth={2} />
          {chatNotificationCount > 0 && (
            <div 
              className="absolute -top-2 -right-2 min-w-[20px] h-[20px] rounded-full flex items-center justify-center text-white text-xs font-bold px-1"
              style={{ 
                backgroundColor: 'var(--notification-red)',
                boxShadow: 'var(--notification-shadow)'
              }}
            >
              {chatNotificationCount}
            </div>
          )}
        </div>
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

