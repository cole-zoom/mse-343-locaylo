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
import { FilterTag } from '../ui/FilterTag';
import { Notification } from '../ui/Notification';
import { MapView } from '../ui/MapView';
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
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
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

  useEffect(() => {
    // Load selected filters from sessionStorage whenever we return to this page
    const loadFilters = () => {
      if (typeof window !== 'undefined') {
        const storedLanguages = sessionStorage.getItem('selectedLanguages');
        if (storedLanguages) {
          try {
            const parsed = JSON.parse(storedLanguages);
            setSelectedLanguages(Array.isArray(parsed) ? parsed : []);
          } catch (e) {
            setSelectedLanguages([]);
          }
        }

        const storedDurations = sessionStorage.getItem('selectedDurations');
        if (storedDurations) {
          try {
            const parsed = JSON.parse(storedDurations);
            setSelectedDurations(Array.isArray(parsed) ? parsed : []);
          } catch (e) {
            setSelectedDurations([]);
          }
        }

        // Load selected location
        const storedLocation = sessionStorage.getItem('selectedLocation');
        if (storedLocation) {
          setSelectedLocation(storedLocation);
          setLocationSearch(storedLocation);
        }
      }
    };

    loadFilters();

    // Listen for focus event to reload filters when returning to page
    window.addEventListener('focus', loadFilters);
    return () => window.removeEventListener('focus', loadFilters);
  }, []);

  const allLocations = [{ id: '00', name: 'All' }, ...LOCATIONS];
  
  const filteredLocations = allLocations.filter(location =>
    location.name.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const checkDurationMatch = (activityDurations: number[], selectedDurationIds: string[]): boolean => {
    if (selectedDurationIds.length === 0) return true;

    const durationRanges = selectedDurationIds.map(id => {
      switch (id) {
        case 'less-1':
          return { min: 0, max: 1 };
        case '1-3':
          return { min: 1, max: 3 };
        case '3-5':
          return { min: 3, max: 5 };
        case '5-plus':
          return { min: 5, max: Infinity };
        default:
          return null;
      }
    }).filter(range => range !== null) as { min: number; max: number }[];

    // Check if any of the activity's time slot durations match any selected range
    return activityDurations.some(duration => 
      durationRanges.some(range => {
        if (range.max === Infinity) {
          return duration >= range.min;
        }
        return duration >= range.min && duration <= range.max;
      })
    );
  };

  const filteredActivities = activities.filter(activity => {
    const matchesLocation = !selectedLocation || activity.location === selectedLocation;
    const matchesSearch = !searchQuery || 
      activity.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLanguage = selectedLanguages.length === 0 || 
      selectedLanguages.includes(activity.language);
    const matchesDuration = checkDurationMatch(activity.duration, selectedDurations);
    return matchesLocation && matchesSearch && matchesLanguage && matchesDuration;
  });

  // Randomize order when no location or filters are selected
  const displayActivities = React.useMemo(() => {
    const shouldRandomize = !selectedLocation && 
                           selectedLanguages.length === 0 && 
                           selectedDurations.length === 0;
    
    if (shouldRandomize) {
      // Fisher-Yates shuffle algorithm
      const shuffled = [...filteredActivities];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }
    
    return filteredActivities;
  }, [filteredActivities, selectedLocation, selectedLanguages, selectedDurations]);

  const handleLocationSelect = (locationName: string) => {
    if (locationName === 'All') {
      setSelectedLocation('');
      setLocationSearch('');
      sessionStorage.setItem('selectedLocation', '');
    } else {
      setSelectedLocation(locationName);
      setLocationSearch(locationName);
      sessionStorage.setItem('selectedLocation', locationName);
    }
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

  const removeLanguageFilter = (languageToRemove: string) => {
    const updatedLanguages = selectedLanguages.filter(lang => lang !== languageToRemove);
    setSelectedLanguages(updatedLanguages);
    // Update sessionStorage
    sessionStorage.setItem('selectedLanguages', JSON.stringify(updatedLanguages));
  };

  const removeDurationFilter = (durationIdToRemove: string) => {
    const updatedDurations = selectedDurations.filter(id => id !== durationIdToRemove);
    setSelectedDurations(updatedDurations);
    // Update sessionStorage
    sessionStorage.setItem('selectedDurations', JSON.stringify(updatedDurations));
  };

  const getDurationLabel = (durationId: string): string => {
    switch (durationId) {
      case 'less-1':
        return 'Less than 1 hour';
      case '1-3':
        return '1-3 hours';
      case '3-5':
        return '3-5 hours';
      case '5-plus':
        return '5+ hours';
      default:
        return durationId;
    }
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
              placeholder={selectedLocation ? locationSearch : "All locations"}
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
        {/* Filter Tags Section */}
        {(selectedLanguages.length > 0 || selectedDurations.length > 0) && (
          <div className="mb-6 space-y-4">
            {/* Language Filter Tags */}
            {selectedLanguages.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-3">Languages:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedLanguages.map((language) => (
                    <FilterTag
                      key={language}
                      label={language}
                      onRemove={() => removeLanguageFilter(language)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Duration Filter Tags */}
            {selectedDurations.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-3">Duration:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedDurations.map((durationId) => (
                    <FilterTag
                      key={durationId}
                      label={getDurationLabel(durationId)}
                      onRemove={() => removeDurationFilter(durationId)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Only show heading when no filters are applied */}
        {!selectedLocation && selectedLanguages.length === 0 && selectedDurations.length === 0 && (
          <h3 className="font-bold text-2xl mb-4 text-black">Trending Activities Worldwide</h3>
        )}
        
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
            {displayActivities.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No activities found</p>
              </div>
            ) : (
              displayActivities.map((activity) => (
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
          <MapView 
            selectedLocation={selectedLocation} 
            activities={displayActivities}
            onToggleFavorite={handleToggleFavorite}
            onInterested={(activityId, timeSlot) => {
              handleInterested(activityId, timeSlot);
              setShowSuccessNotification(true);
            }}
            onLocationSelect={(locationName) => {
              setSelectedLocation(locationName);
              setLocationSearch(locationName);
              sessionStorage.setItem('selectedLocation', locationName);
            }}
          />
        )}
      </div>
      <TravelerNav current="search" />

      {selectedActivity && (
        <ActivityDetailsModal
          activity={selectedActivity}
          onClose={() => setSelectedActivity(null)}
          onInterested={handleInterested}
          onToggleFavorite={handleToggleFavorite}
          onShowNotification={() => setShowSuccessNotification(true)}
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

      {showSuccessNotification && (
        <Notification
          message="Activity added"
          type="success"
          onClose={() => setShowSuccessNotification(false)}
        />
      )}
    </div>
  );
}

