'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Profile } from './types';

interface ProfileContextType {
  profile: Profile;
  updateProfile: (updates: Partial<Profile>) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const defaultProfile: Profile = {
  name: 'Tony Montana',
  age: 21,
  email: 'tony@gmail.com',
  birthday: '03/10/04',
  homeCity: 'Milan, Italy',
  locationSharing: 'Indefinitely',
  sharingWith: 'Jeff, Yoon',
  mode: 'Local',
  avatar: '',
  isVerified: false,
  languageSpoken: 'English',
  emergencyContacts: [
    { id: '1', name: 'Sandra Montana', phone: '+1-782-919-4667' },
    { id: '2', name: 'Yoon Kazi', phone: '+1-647-180-4444' }
  ],
  shareActivityWithContacts: true,
  safetyTipsEnabled: true
};

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile>(defaultProfile);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('locaylo_profile');
    if (stored) {
      try {
        setProfile(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse profile from localStorage', e);
      }
    }
  }, []);

  // Save to localStorage whenever profile changes
  useEffect(() => {
    localStorage.setItem('locaylo_profile', JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (updates: Partial<Profile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        updateProfile
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

