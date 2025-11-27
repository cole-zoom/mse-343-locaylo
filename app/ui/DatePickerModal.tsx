'use client';

import React from 'react';
import { X } from 'lucide-react';
import { DateOption } from '@/lib/types';

interface DatePickerModalProps {
  dates: DateOption[];
  currentDateId: string;
  onSelectDate: (dateId: string) => void;
  onClose: () => void;
}

export function DatePickerModal({ 
  dates, 
  currentDateId, 
  onSelectDate, 
  onClose 
}: DatePickerModalProps) {
  const handleDateSelect = (dateId: string) => {
    onSelectDate(dateId);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl p-8 max-w-md w-full max-h-[80vh] overflow-hidden flex flex-col relative animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-black">Select Date</h2>
          <p className="text-base text-gray-600 mt-1">Choose a date to explore activities</p>
        </div>

        {/* Date list */}
        <div className="overflow-y-auto flex-1 -mx-2 px-2">
          <div className="space-y-2">
            {dates.map((date) => (
              <button
                key={date.id}
                onClick={() => handleDateSelect(date.id)}
                className={`w-full text-left px-6 py-4 rounded-3xl transition-all ${
                  currentDateId === date.id
                    ? 'text-black shadow-[0_4px_20px_rgba(96,165,250,0.3)] font-bold'
                    : 'text-black hover:bg-gray-100 font-normal'
                }`}
                style={currentDateId === date.id ? { backgroundColor: 'rgba(96,165,250,0.3)' } : undefined}
              >
                {date.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

