'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, X } from 'lucide-react';

export default function FilterPage() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(
    typeof window !== 'undefined' ? sessionStorage.getItem('selectedLanguage') : null
  );

  const handleGoBack = () => {
    router.back();
  };

  const handleApplyFilters = () => {
    router.push('/traveler-home');
  };

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto relative font-sans z-50 animate-in slide-in-from-bottom duration-500">
      <div className="p-6 pb-24">
        <div className="flex justify-between items-center mb-8 pt-6">
          <h2 className="text-3xl font-extrabold tracking-tight text-black">Filter</h2>
          <button onClick={handleGoBack} className="p-2 rounded-full bg-white hover:bg-gray-100 transition-colors">
            <X size={24} className="text-gray-900" />
          </button>
        </div>

        <div className="space-y-8">
          {/* Local characteristics */}
          <div>
            <h3 className="font-bold text-gray-900 text-lg mb-4">Local characteristics</h3>
            <div className="space-y-1">
              {['Age Range', 'Languages', 'Gender'].map((item) => (
                <div 
                  key={item}
                  onClick={item === 'Languages' ? () => router.push('/language-select') : undefined}
                  className="flex justify-between items-center py-4 border-b border-gray-100 cursor-pointer group active:bg-white transition-colors px-2 rounded-lg"
                >
                  <span className="text-gray-600 font-medium group-hover:text-gray-900">{item}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900 font-bold text-sm">
                      {item === 'Languages' && selectedLanguage ? selectedLanguage : 'Any'}
                    </span>
                    <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity characteristics */}
          <div>
            <h3 className="font-bold text-gray-900 text-lg mb-4">Activity characteristics</h3>
            <div className="space-y-1">
              {['Activity Type', 'Activity Timings', 'Activity Duration', 'Activity Cost'].map((item) => (
                <div key={item} className="flex justify-between items-center py-4 border-b border-gray-100 cursor-pointer group active:bg-white transition-colors px-2 rounded-lg">
                  <span className="text-gray-600 font-medium group-hover:text-gray-900">{item}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900 font-bold text-sm">Any</span>
                    <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-500" />
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center py-4 border-b border-gray-100 cursor-pointer group active:bg-white transition-colors px-2 rounded-lg">
                <span className="text-gray-600 font-medium group-hover:text-gray-900">Accessibility Options</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-900 font-bold text-sm">Choose</span>
                  <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-8 left-0 right-0 max-w-md mx-auto px-6">
          <button 
            onClick={handleApplyFilters}
            className="w-full text-gray-900 py-4 rounded-3xl text-lg font-bold active:scale-[0.98] transition-all"
            style={{ backgroundColor: 'rgba(96,165,250,0.3)' }}
          >
            Apply Filter(s)
          </button>
        </div>
      </div>
    </div>
  );
}

