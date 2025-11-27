'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Heart, 
  Filter, 
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { TravelerNav } from '../ui/TravelerNav';
import { ActivityDetailsModal } from '../ui/ActivityDetailsModal';
import { DatePickerModal } from '../ui/DatePickerModal';
import { TravelerActivity } from '@/lib/types';
import { LOCATIONS, DATES, currentDate as initialCurrentDate } from '@/lib/data';
import { useTravelerActivities } from '@/lib/TravelerActivityContext';

export default function TravelerHomePage() {
  const router = useRouter();
  const { activities, toggleFavorite, addToSchedule } = useTravelerActivities();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [locationSearch, setLocationSearch] = useState<string>('');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedActivity, setSelectedActivity] = useState<TravelerActivity | null>(null);
  const [currentDate, setCurrentDate] = useState<string>(initialCurrentDate);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowLocationDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredLocations = LOCATIONS.filter(location =>
    location.name.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const filteredActivities = activities.filter(activity => {
    const matchesLocation = !selectedLocation || activity.location === selectedLocation;
    const matchesSearch = !searchQuery || 
      activity.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLocation && matchesSearch;
  });

  const handleLocationSelect = (locationName: string) => {
    setSelectedLocation(locationName);
    setLocationSearch(locationName);
    setShowLocationDropdown(false);
  };

  const handleToggleFavorite = (activityId: string) => {
    toggleFavorite(activityId);
  };

  const handleInterested = (activityId: string, timeSlot: string) => {
    addToSchedule(activityId, timeSlot, currentDate);
  };

  const handleDateSelect = (dateId: string) => {
    setCurrentDate(dateId);
  };

  const getCurrentDateName = () => {
    const date = DATES.find(d => d.id === currentDate);
    return date?.name || 'November 27th, 2025';
  };

  return (
    <div className="min-h-screen pb-24 max-w-md mx-auto relative font-sans animate-in fade-in duration-500" style={{ backgroundColor: 'var(--background)' }}>
      {/* Sticky Header */}
      <div className="px-6 pt-12 pb-4 sticky top-0 z-30" style={{ backgroundColor: 'var(--background)' }}>
        <div className="flex justify-between items-start mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-black">Locaylo</h1>
          <div 
            onClick={() => router.push('/role-select')}
            className="flex flex-col items-end cursor-pointer group"
          >
            <span className="text-base font-bold text-black group-hover:text-gray-700 transition-colors">Traveler</span>
            <span className="text-sm text-black underline group-hover:text-gray-700 transition-colors">Switch</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-black">Currently Exploring:</h2>
        
        <div className="relative mb-4" ref={dropdownRef}>
          <div 
            className="w-full border border-black rounded-3xl py-3.5 px-6 text-base font-normal focus-within:border-gray-700 transition-colors cursor-pointer"
            style={{ backgroundColor: 'var(--background)' }}
            onClick={() => setShowLocationDropdown(!showLocationDropdown)}
          >
            <input
              type="text"
              value={locationSearch}
              onChange={(e) => {
                setLocationSearch(e.target.value);
                setShowLocationDropdown(true);
              }}
              placeholder="Select location"
              className="w-full outline-none bg-transparent text-black placeholder:text-gray-500"
            />
          </div>
          <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none">
            <ChevronDown size={20} className="text-black" />
          </div>
          
          {showLocationDropdown && (
            <div 
              className="absolute top-full mt-2 w-full border border-gray-300 rounded-3xl py-2 max-h-60 overflow-y-auto z-40 shadow-lg"
              style={{ backgroundColor: 'var(--surface-white)' }}
            >
              {filteredLocations.map((location) => (
                <div
                  key={location.id}
                  onClick={() => handleLocationSelect(location.name)}
                  className="px-6 py-3 hover:bg-gray-100 cursor-pointer text-black text-base"
                >
                  {location.name}
                </div>
              ))}
              {filteredLocations.length === 0 && (
                <div className="px-6 py-3 text-gray-500 text-base">
                  No locations found
                </div>
              )}
            </div>
          )}
        </div>

        <div className="relative mb-6 group">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <Search size={20} className="text-black" />
          </div>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search activities..." 
            className="w-full border border-black rounded-3xl py-3.5 pl-14 pr-6 text-base font-normal focus:outline-none focus:border-gray-700 transition-colors placeholder:text-gray-500"
            style={{ backgroundColor: 'var(--background)' }}
          />
        </div>

        <div className="flex gap-3 mb-6">
          <button 
            onClick={() => setViewMode('list')}
            className={`px-6 py-3 text-base font-medium transition-all ${
              viewMode === 'list' 
                ? 'bg-black text-white' 
                : 'text-black'
            }`}
            style={viewMode !== 'list' ? { backgroundColor: 'var(--background)' } : undefined}
          >
            List View
          </button>
          <button 
            onClick={() => setViewMode('map')}
            className={`px-6 py-3 text-base font-medium transition-all ${
              viewMode === 'map' 
                ? 'bg-black text-white' 
                : 'text-black'
            }`}
            style={viewMode !== 'map' ? { backgroundColor: 'var(--background)' } : undefined}
          >
            Map View
          </button>
          <button 
            onClick={() => router.push('/filter')}
            className="text-black px-6 py-3 rounded-3xl text-base font-medium flex items-center gap-2 active:scale-[0.98] transition-all ml-auto"
            style={{ backgroundColor: 'var(--primary-blue)' }}
          >
            <Filter size={18} strokeWidth={2.5} /> Filter
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="p-6" style={{ backgroundColor: 'var(--background)' }}>
        <h3 className="font-bold text-2xl mb-4 text-black">Trending Activities Worldwide</h3>
        
        <div className="flex justify-between items-center mb-6">
          <p className="text-black text-lg font-normal">{getCurrentDateName()}</p>
          <button 
            onClick={() => setShowDatePicker(true)}
            className="text-black text-base underline font-normal hover:text-gray-700 transition-colors"
          >
            Change date
          </button>
        </div>

        {viewMode === 'list' ? (
          <div className="space-y-4">
            {filteredActivities.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No activities found</p>
              </div>
            ) : (
              filteredActivities.map((activity) => (
                <div 
                  key={activity.id} 
                  className="p-5 rounded-3xl flex items-start gap-4 group shadow-[0_4px_20px_rgba(96,165,250,0.3)] hover:shadow-[0_4px_25px_rgba(96,165,250,0.4)] transition-all"
                  style={{ backgroundColor: 'var(--background)', border: '1px solid rgba(96,165,250,0.2)' }}
                >
                  <div className="text-4xl mt-1">
                    {activity.emoji}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-black text-xl mb-1">{activity.name}</h4>
                    <p className="text-base text-black font-normal">{activity.location.split(',')[0]}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 mt-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleFavorite(activity.id);
                      }}
                      className="hover:scale-110 transition-transform"
                    >
                      <Heart 
                        size={24} 
                        className={activity.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'}
                      />
                    </button>
                    <button
                      onClick={() => setSelectedActivity(activity)}
                      className="text-base font-normal text-black underline hover:text-gray-700"
                    >
                      Details
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="w-full h-[400px] bg-[#EBF3F5] rounded-3xl border-2 border-white shadow-inner flex flex-col items-center justify-center relative overflow-hidden group">
            {/* Artistic Map Background */}
            <div className="absolute inset-0 opacity-20">
              <svg width="100%" height="100%">
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#A0C0C8" strokeWidth="1"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
            
            {/* Floating Landmasses */}
            <div className="absolute top-10 left-[-20px] w-48 h-48 bg-[#D4E6E8] rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse"></div>
            <div className="absolute bottom-10 right-[-20px] w-64 h-64 bg-[#C2E0C4] rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse delay-1000"></div>
            
            <div className="z-10 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-lg flex items-center gap-3 animate-bounce border border-white/50">
              <div className="w-2.5 h-2.5 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
              <span className="text-xs font-bold text-gray-700">Coming Soon!</span>
            </div>
            
            {/* Interactive Pins */}
            {[
              { t: '30%', l: '25%', emoji: '🍷' },
              { t: '45%', r: '20%', emoji: '🌸' },
              { t: '60%', l: '40%', emoji: '🍲' },
              { t: '20%', r: '35%', emoji: '🏔️' }
            ].map((pin, i) => (
              <div 
                key={i}
                style={{ top: pin.t, left: pin.l, right: pin.r }}
                className="absolute transform hover:scale-125 transition-transform cursor-pointer"
              >
                <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-sm border-2 border-white relative z-10">
                  {pin.emoji}
                </div>
                <div className="w-2 h-2 bg-black/10 rounded-full absolute -bottom-1 left-1/2 -translate-x-1/2 blur-[1px]"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-gray-400 -z-10 origin-bottom transform rotate-12"></div>
              </div>
            ))}
          </div>
        )}
      </div>
      <TravelerNav current="search" />

      {selectedActivity && (
        <ActivityDetailsModal
          activity={selectedActivity}
          onClose={() => setSelectedActivity(null)}
          onInterested={handleInterested}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {showDatePicker && (
        <DatePickerModal
          dates={DATES}
          currentDateId={currentDate}
          onSelectDate={handleDateSelect}
          onClose={() => setShowDatePicker(false)}
        />
      )}
    </div>
  );
}

