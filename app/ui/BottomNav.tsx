import React from 'react';
import { Search, MessageSquare, User, Calendar } from 'lucide-react';
import { Screen, Role } from '@/lib/types';

interface BottomNavProps {
  current: Screen;
  role: Role;
  onNavigate: (screen: Screen) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ current, role, onNavigate }) => {
  return (
    <div className="fixed bottom-0 w-full max-w-md border-t-2 py-4 px-8 flex justify-between items-center z-40 pb-6" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border-default)' }}>
      <button 
        onClick={() => onNavigate(role === 'traveler' ? 'travelerHome' : 'localHome')}
        className={`flex flex-col items-center gap-1.5 transition-colors ${
          ['travelerHome', 'localHome'].includes(current) ? 'text-black' : 'text-gray-400'
        }`}
      >
        <Search size={28} strokeWidth={2} />
        <span className="text-xs font-medium">search</span>
      </button>
      
      <button className="flex flex-col items-center gap-1.5 text-gray-400">
        <Calendar size={28} strokeWidth={2} />
        <span className="text-xs font-medium">activities</span>
      </button>
      
      <button className="flex flex-col items-center gap-1.5 text-gray-400">
        <MessageSquare size={28} strokeWidth={2} />
        <span className="text-xs font-medium">chat</span>
      </button>

      <button className="flex flex-col items-center gap-1.5 text-gray-400">
        <User size={28} strokeWidth={2} />
        <span className="text-xs font-medium">profile</span>
      </button>
    </div>
  );
};

