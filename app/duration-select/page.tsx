'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, Check, Clock } from 'lucide-react';

interface DurationOption {
  id: string;
  label: string;
  range: { min: number; max: number };
}

const DURATION_OPTIONS: DurationOption[] = [
  { id: 'less-1', label: 'Less than 1 hour', range: { min: 0, max: 1 } },
  { id: '1-3', label: '1-3 hours', range: { min: 1, max: 3 } },
  { id: '3-5', label: '3-5 hours', range: { min: 3, max: 5 } },
  { id: '5-plus', label: '5+ hours', range: { min: 5, max: Infinity } },
];

export default function DurationSelectPage() {
  const router = useRouter();
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);

  useEffect(() => {
    // Load selected durations from sessionStorage
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('selectedDurations');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setSelectedDurations(Array.isArray(parsed) ? parsed : []);
        } catch (e) {
          setSelectedDurations([]);
        }
      }
    }
  }, []);

  const toggleDuration = (durationId: string) => {
    setSelectedDurations(prev => 
      prev.includes(durationId)
        ? prev.filter(id => id !== durationId)
        : [...prev, durationId]
    );
  };

  const handleSaveSelection = () => {
    sessionStorage.setItem('selectedDurations', JSON.stringify(selectedDurations));
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto relative font-sans z-50 animate-in slide-in-from-right duration-300">
      <div className="p-6 pb-32">
        <div className="flex justify-between items-center mb-10 pt-6">
          <div>
            <h2 className="text-2xl font-bold text-black">Activity Duration</h2>
            <p className="text-sm text-gray-600 mt-1">
              {selectedDurations.length > 0 
                ? `${selectedDurations.length} selected` 
                : 'Select durations'}
            </p>
          </div>
          <button onClick={() => router.back()} className="p-2 rounded-full bg-white hover:bg-gray-100 transition-colors">
            <X size={24} className="text-gray-900" />
          </button>
        </div>

        <h3 className="font-bold text-xs text-gray-400 mb-4 uppercase tracking-widest pl-1">Duration Options</h3>
        
        <div className="space-y-3">
          {DURATION_OPTIONS.map(option => (
            <button
              key={option.id}
              onClick={() => toggleDuration(option.id)}
              className={`w-full px-6 py-5 rounded-3xl border text-base font-bold transition-all flex items-center justify-between shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.1)] ${
                selectedDurations.includes(option.id)
                  ? 'text-gray-900 border-gray-300' 
                  : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
              style={selectedDurations.includes(option.id) ? { backgroundColor: 'rgba(96,165,250,0.3)' } : {}}
            >
              <div className="flex items-center gap-3">
                <Clock size={20} className={selectedDurations.includes(option.id) ? 'text-gray-900' : 'text-gray-400'} />
                <span>{option.label}</span>
              </div>
              {selectedDurations.includes(option.id) && (
                <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center">
                  <Check size={16} className="text-white" strokeWidth={3} />
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-2xl border border-blue-100">
          <p className="text-sm text-gray-700">
            <span className="font-bold">Tip:</span> Select multiple duration ranges to see more activity options.
          </p>
        </div>

        <div className="fixed bottom-8 left-0 right-0 max-w-md mx-auto px-6">
          <button 
            onClick={handleSaveSelection}
            className="w-full text-gray-900 py-4 rounded-3xl text-lg font-bold shadow-[0_4px_20px_rgba(96,165,250,0.3)] hover:shadow-[0_4px_25px_rgba(96,165,250,0.4)] active:scale-[0.98] transition-all"
            style={{ backgroundColor: 'rgba(96,165,250,0.3)' }}
          >
            Save Selection
          </button>
        </div>
      </div>
    </div>
  );
}

