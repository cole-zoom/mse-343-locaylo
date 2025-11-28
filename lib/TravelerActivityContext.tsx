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

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('locaylo_traveler_activities');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Validate and ensure all activities have required array properties
        const validatedActivities = Array.isArray(parsed) 
          ? parsed.map((activity: Partial<TravelerActivity>) => ({
              ...activity,
              // Ensure duration is always an array
              duration: Array.isArray(activity.duration) ? activity.duration : [],
              // Ensure availableTimeSlots is always an array
              availableTimeSlots: Array.isArray(activity.availableTimeSlots) ? activity.availableTimeSlots : [],
            })) as TravelerActivity[]
          : TRAVELER_ACTIVITIES;
        setActivities(validatedActivities);
      } catch (e) {
        console.error('Failed to parse traveler activities from localStorage', e);
      }
    }
  }, []);

  // Save to localStorage whenever activities change
  useEffect(() => {
    localStorage.setItem('locaylo_traveler_activities', JSON.stringify(activities));
  }, [activities]);

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

