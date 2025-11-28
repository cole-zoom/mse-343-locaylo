'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Check } from 'lucide-react';
import { ALL_LANGUAGES, POPULAR_LANGUAGES } from '@/lib/data';

export default function LanguageSelectPage() {
  const router = useRouter();
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Load selected languages from sessionStorage
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('selectedLanguages');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setSelectedLanguages(Array.isArray(parsed) ? parsed : []);
        } catch (e) {
          setSelectedLanguages([]);
        }
      }
    }
  }, []);

  const toggleLanguage = (language: string) => {
    setSelectedLanguages(prev => 
      prev.includes(language)
        ? prev.filter(lang => lang !== language)
        : [...prev, language]
    );
  };

  const handleSaveSelection = () => {
    sessionStorage.setItem('selectedLanguages', JSON.stringify(selectedLanguages));
    router.back();
  };

  const filteredAllLanguages = ALL_LANGUAGES.filter(lang =>
    lang.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto relative font-sans z-50 animate-in slide-in-from-right duration-300">
      <div className="p-6 pb-32">
        <div className="flex justify-between items-center mb-10 pt-6">
          <div>
            <h2 className="text-2xl font-bold text-black">Languages</h2>
            <p className="text-sm text-gray-600 mt-1">
              {selectedLanguages.length > 0 
                ? `${selectedLanguages.length} selected` 
                : 'Select languages'}
            </p>
          </div>
          <button onClick={() => router.back()} className="p-2 rounded-full bg-white hover:bg-gray-100 transition-colors">
            <X size={24} className="text-gray-900" />
          </button>
        </div>

        <h3 className="font-bold text-xs text-gray-400 mb-4 uppercase tracking-widest pl-1">Popular Languages</h3>
        <div className="flex flex-wrap gap-3 mb-10">
          {POPULAR_LANGUAGES.map(lang => (
            <button
              key={lang}
              onClick={() => toggleLanguage(lang)}
              className={`px-5 py-2.5 rounded-3xl border text-sm font-bold transition-all flex items-center gap-2 ${
                selectedLanguages.includes(lang)
                  ? 'text-gray-900 border-gray-300 shadow-md' 
                  : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
              style={selectedLanguages.includes(lang) ? { backgroundColor: 'rgba(96,165,250,0.3)' } : {}}
            >
              {selectedLanguages.includes(lang) && <Check size={16} />}
              {lang}
            </button>
          ))}
        </div>

        <h3 className="font-bold text-xs text-gray-400 mb-4 uppercase tracking-widest pl-1">All Languages</h3>
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a specific language..." 
            className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-gray-300 transition-all placeholder:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          {filteredAllLanguages.map(lang => (
            <button
              key={lang}
              onClick={() => toggleLanguage(lang)}
              className={`w-full px-5 py-3.5 rounded-2xl border text-sm font-bold transition-all flex items-center justify-between ${
                selectedLanguages.includes(lang)
                  ? 'text-gray-900 border-gray-300 shadow-md' 
                  : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
              style={selectedLanguages.includes(lang) ? { backgroundColor: 'rgba(96,165,250,0.3)' } : {}}
            >
              <span>{lang}</span>
              {selectedLanguages.includes(lang) && (
                <div className="w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center">
                  <Check size={14} className="text-white" />
                </div>
              )}
            </button>
          ))}
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

