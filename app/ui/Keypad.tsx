import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface KeypadProps {
  onKeyPress: (val: string) => void;
  onDelete: () => void;
}

export const Keypad: React.FC<KeypadProps> = ({ onKeyPress, onDelete }) => {
  const keys = [
    { num: '1', sub: '' }, 
    { num: '2', sub: 'ABC' }, 
    { num: '3', sub: 'DEF' },
    { num: '4', sub: 'GHI' }, 
    { num: '5', sub: 'JKL' }, 
    { num: '6', sub: 'MNO' },
    { num: '7', sub: 'PQRS' }, 
    { num: '8', sub: 'TUV' }, 
    { num: '9', sub: 'WXYZ' },
    { num: '', sub: '' }, 
    { num: '0', sub: '' }, 
    { num: 'del', sub: '' }
  ];

  return (
    <div className="grid grid-cols-3 gap-y-6 gap-x-4 px-8 pb-10 pt-4 bg-gray-50">
      {keys.map((k, i) => {
        if (k.num === 'del') {
          return (
            <button 
              key={i} 
              onClick={onDelete} 
              className="h-14 flex items-center justify-center text-gray-900 rounded-lg active:bg-white transition-colors"
            >
              <ChevronLeft size={28} strokeWidth={1.5} />
            </button>
          );
        }
        
        if (k.num === '') return <div key={i}></div>;
        
        return (
          <button
            key={i}
            onClick={() => onKeyPress(k.num)}
            className="h-14 w-full flex flex-col items-center justify-center rounded-lg active:bg-white transition-colors"
          >
            <span className="text-2xl font-medium text-gray-900 leading-none">{k.num}</span>
            {k.sub && (
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                {k.sub}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

