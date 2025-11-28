'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { TravelerActivity } from './types';
import { TRAVELER_ACTIVITIES } from './data';

interface TravelerActivityContextType {
  activities: TravelerActivity[];
  toggleFavorite: (activityId: string) => void;
  addToSchedule: (activityId: string, timeSlot: string, date: string) => void;
  removeFromSchedule: (activityId: string) => void;
  getActivity: (activityId: string) => TravelerActivity | undefined;
}

const TravelerActivityContext = createContext<TravelerActivityContextType | undefined>(undefined);

export const TravelerActivityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activities, setActivities] = useState<TravelerActivity[]>(TRAVELER_ACTIVITIES);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('locaylo_traveler_activities');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Create a lookup map of original activities for fallback values
          const originalActivityMap = new Map(
            TRAVELER_ACTIVITIES.map(act => [act.id, act])
          );
          
          // Merge stored data with original data to ensure all required fields are valid
          const validatedActivities = parsed.map((storedActivity: Partial<TravelerActivity>) => {
            const originalActivity = originalActivityMap.get(storedActivity.id);
            
            // If activity doesn't exist in original data, skip it (could be old/removed activity)
            if (!originalActivity) {
              return null;
            }
            
            return {
              // Start with original activity data (ensures all fields are correct)
              ...originalActivity,
              // Preserve user-specific state from localStorage
              isFavorite: storedActivity.isFavorite ?? originalActivity.isFavorite,
              isAdded: storedActivity.isAdded ?? originalActivity.isAdded,
              startTime: storedActivity.startTime,
              endTime: storedActivity.endTime,
              date: storedActivity.date,
            };
          }).filter((act): act is TravelerActivity => act !== null);
          
          // Also include any new activities that weren't in localStorage
          const storedIds = new Set(parsed.map((a: Partial<TravelerActivity>) => a.id));
          const newActivities = TRAVELER_ACTIVITIES.filter(act => !storedIds.has(act.id));
          
          setActivities([...validatedActivities, ...newActivities]);
        } else {
          // Invalid data format, reset to defaults
          setActivities(TRAVELER_ACTIVITIES);
        }
      } catch (e) {
        console.error('Failed to parse traveler activities from localStorage', e);
        // On parse error, reset to defaults
        setActivities(TRAVELER_ACTIVITIES);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever activities change (only after initial load)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('locaylo_traveler_activities', JSON.stringify(activities));
    }
  }, [activities, isLoaded]);

  const toggleFavorite = (activityId: string) => {
    setActivities(prev => prev.map(activity => 
      activity.id === activityId 
        ? { ...activity, isFavorite: !activity.isFavorite }
        : activity
    ));
  };

  const addToSchedule = (activityId: string, timeSlot: string, date: string) => {
    const [startTime, endTime] = timeSlot.split('-');
    setActivities(prev => prev.map(activity => 
      activity.id === activityId 
        ? { ...activity, isAdded: true, startTime, endTime, date }
        : activity
    ));
  };

  const removeFromSchedule = (activityId: string) => {
    setActivities(prev => prev.map(activity => 
      activity.id === activityId 
        ? { ...activity, isAdded: false, startTime: undefined, endTime: undefined, date: undefined }
        : activity
    ));
  };

  const getActivity = (activityId: string) => {
    return activities.find(activity => activity.id === activityId);
  };

  return (
    <TravelerActivityContext.Provider
      value={{
        activities,
        toggleFavorite,
        addToSchedule,
        removeFromSchedule,
        getActivity
      }}
    >
      {children}
    </TravelerActivityContext.Provider>
  );
};

export const useTravelerActivities = () => {
  const context = useContext(TravelerActivityContext);
  if (context === undefined) {
    throw new Error('useTravelerActivities must be used within a TravelerActivityProvider');
  }
  return context;
};

