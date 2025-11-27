'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ActivityItem } from './types';

interface ActivityContextType {
  activities: ActivityItem[];
  addActivity: (activity: Omit<ActivityItem, 'id'>) => void;
  updateActivity: (id: string, activity: Partial<ActivityItem>) => void;
  deleteActivity: (id: string) => void;
  getActivity: (id: string) => ActivityItem | undefined;
}

const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

export const ActivityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: '1',
      name: 'Wine Tour',
      date: '11052025', // November 5th, 2025
      startTime: '12:00',
      endTime: '13:00',
      status: 'pending'
    },
    {
      id: '2',
      name: 'Soccer Match',
      date: '11152025', // November 15th, 2025
      startTime: '15:00',
      endTime: '17:00',
      status: 'pending'
    },
    {
      id: '3',
      name: 'Sculpting',
      date: '11272025', // November 27th, 2025
      startTime: '11:00',
      endTime: '12:00',
      status: 'scheduled'
    }
  ]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('locaylo_activities');
    if (stored) {
      try {
        setActivities(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse activities from localStorage', e);
      }
    }
  }, []);

  // Save to localStorage whenever activities change
  useEffect(() => {
    localStorage.setItem('locaylo_activities', JSON.stringify(activities));
  }, [activities]);

  const addActivity = (activity: Omit<ActivityItem, 'id'>) => {
    const newActivity: ActivityItem = {
      ...activity,
      id: Date.now().toString()
    };
    setActivities(prev => [...prev, newActivity]);
  };

  const updateActivity = (id: string, updates: Partial<ActivityItem>) => {
    setActivities(prev =>
      prev.map(activity =>
        activity.id === id ? { ...activity, ...updates } : activity
      )
    );
  };

  const deleteActivity = (id: string) => {
    setActivities(prev => prev.filter(activity => activity.id !== id));
  };

  const getActivity = (id: string) => {
    return activities.find(activity => activity.id === id);
  };

  return (
    <ActivityContext.Provider
      value={{
        activities,
        addActivity,
        updateActivity,
        deleteActivity,
        getActivity
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivities = () => {
  const context = useContext(ActivityContext);
  if (context === undefined) {
    throw new Error('useActivities must be used within an ActivityProvider');
  }
  return context;
};

