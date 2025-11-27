// Screen types
export type Screen = 
  | 'login' 
  | 'phone' 
  | 'otp' 
  | 'roleSelect' 
  | 'travelerHome' 
  | 'localHome' 
  | 'filter' 
  | 'languageSelect';

export type Role = 'traveler' | 'local';

// Location interface
export interface Location {
  id: string;
  name: string;
}

// Date interface
export interface DateOption {
  id: string;
  name: string;
}

// Activity interfaces
export interface Activity {
  id: string;
  title: string;
  location: string;
  image: string;
  isLiked: boolean;
  type: string;
}

export interface TravelerActivity {
  id: string;
  name: string;
  location: string;
  availableTimeSlots: string[];
  isFavorite: boolean;
  isAdded: boolean;
  startTime?: string;
  endTime?: string;
  date?: string;
  emoji: string;
}

export interface LocalActivity {
  id: string;
  title: string;
  date: string;
  time: string;
  status: 'pending' | 'scheduled';
}

// Activity management type for locals
export interface ActivityItem {
  id: string;
  name: string;
  date: string; 
  startTime: string; 
  endTime: string; 
  status: 'pending' | 'scheduled';
}

// Chat interfaces
export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  activity: string;
  date: string;
  time: string;
  status: 'active' | 'past';
  messages: ChatMessage[];
}

// Profile interface
export interface Profile {
  name: string;
  age: number;
  email: string;
  birthday: string;
  homeCity: string;
  locationSharing: string;
  mode: 'Local' | 'Traveler';
  avatar: string;
  isVerified: boolean;
}

