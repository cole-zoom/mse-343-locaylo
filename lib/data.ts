import { Activity, LocalActivity, Location, TravelerActivity, DateOption } from './types';

export const TRENDING_ACTIVITIES: Activity[] = [
  { id: '1', title: 'Wine tasting', location: 'Bordeaux, France', image: '🍷', isLiked: false, type: 'Food' },
  { id: '2', title: 'Street food', location: 'Lahore, Pakistan', image: '🍲', isLiked: false, type: 'Food' },
  { id: '3', title: 'Flower market', location: 'Bangkok, Thailand', image: '🌸', isLiked: false, type: 'Nature' },
  { id: '4', title: 'Scuba diving', location: 'Cozumel, Mexico', image: '🤿', isLiked: false, type: 'Sport' },
  { id: '5', title: 'Mountain hiking', location: 'Swiss Alps', image: '🏔️', isLiked: false, type: 'Sport' },
];

export const LOCAL_ACTIVITIES: LocalActivity[] = [
  { id: '1', title: 'Wine Tour', date: '11052025', time: '12:00 - 13:00', status: 'pending' },
  { id: '2', title: 'Soccer Match', date: '11152025', time: '15:00 - 17:00', status: 'pending' },
  { id: '3', title: 'Pottery Painting', date: '11272025', time: '13:00 - 14:00', status: 'scheduled' },
];

export const POPULAR_LANGUAGES = ['English', 'Hindi', 'French', 'German', 'Mandarin'];

// Helper function to get ordinal suffix
const getOrdinalSuffix = (day: number): string => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
};

export const DATES: DateOption[] = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  const month = 11;
  const year = 2025;
  const id = `${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}${year}`;
  const name = `November ${day}${getOrdinalSuffix(day)}, ${year}`;
  return { id, name };
});

export let currentDate = DATES[26].id; // Default to November 27th, 2025

export const setCurrentDate = (dateId: string) => {
  currentDate = dateId;
};

export const LOCATIONS: Location[] = [
  { id: '01', name: 'Bangkok, Thailand' },
  { id: '02', name: 'Bordeaux, France' },
  { id: '03', name: 'Barcelona, Spain' },
  { id: '04', name: 'Tokyo, Japan' },
  { id: '05', name: 'New York, USA' },
  { id: '06', name: 'Rome, Italy' },
  { id: '07', name: 'Dubai, UAE' },
  { id: '08', name: 'London, UK' },
  { id: '09', name: 'Sydney, Australia' },
  { id: '10', name: 'Amsterdam, Netherlands' },
  { id: '11', name: 'Berlin, Germany' },
  { id: '12', name: 'Singapore, Singapore' },
];

export const TRAVELER_ACTIVITIES: TravelerActivity[] = [
  // Bangkok, Thailand
  { id: '1', name: 'Flower Market', location: 'Bangkok, Thailand', availableTimeSlots: ['09:00-13:30', '16:00-19:00'], isFavorite: false, isAdded: false, emoji: '🌸' },
  { id: '2', name: 'Street Food Tour', location: 'Bangkok, Thailand', availableTimeSlots: ['18:00-21:00', '19:00-22:00'], isFavorite: false, isAdded: false, emoji: '🍜' },
  { id: '3', name: 'Temple Visit', location: 'Bangkok, Thailand', availableTimeSlots: ['08:00-11:00', '14:00-17:00'], isFavorite: false, isAdded: false, emoji: '🛕' },
  { id: '4', name: 'Thai Cooking Class', location: 'Bangkok, Thailand', availableTimeSlots: ['10:00-13:00', '15:00-18:00'], isFavorite: false, isAdded: false, emoji: '👨‍🍳' },
  { id: '5', name: 'Floating Market', location: 'Bangkok, Thailand', availableTimeSlots: ['06:00-10:00', '07:00-11:00'], isFavorite: false, isAdded: false, emoji: '🚣' },
  
  // Bordeaux, France
  { id: '6', name: 'Wine Tasting', location: 'Bordeaux, France', availableTimeSlots: ['11:00-14:00', '16:00-19:00'], isFavorite: false, isAdded: false, emoji: '🍷' },
  { id: '7', name: 'Vineyard Tour', location: 'Bordeaux, France', availableTimeSlots: ['09:00-12:00', '14:00-17:00'], isFavorite: false, isAdded: false, emoji: '🍇' },
  { id: '8', name: 'Cheese Pairing', location: 'Bordeaux, France', availableTimeSlots: ['12:00-14:00', '18:00-20:00'], isFavorite: false, isAdded: false, emoji: '🧀' },
  { id: '9', name: 'Bike Through Vineyards', location: 'Bordeaux, France', availableTimeSlots: ['08:00-11:00', '15:00-18:00'], isFavorite: false, isAdded: false, emoji: '🚴' },
  { id: '10', name: 'French Bakery Class', location: 'Bordeaux, France', availableTimeSlots: ['07:00-10:00', '13:00-16:00'], isFavorite: false, isAdded: false, emoji: '🥐' },
  
  // Barcelona, Spain
  { id: '11', name: 'Sagrada Familia Tour', location: 'Barcelona, Spain', availableTimeSlots: ['09:00-12:00', '14:00-17:00'], isFavorite: false, isAdded: false, emoji: '⛪' },
  { id: '12', name: 'Tapas Crawl', location: 'Barcelona, Spain', availableTimeSlots: ['19:00-22:00', '20:00-23:00'], isFavorite: false, isAdded: false, emoji: '🍤' },
  { id: '13', name: 'Beach Volleyball', location: 'Barcelona, Spain', availableTimeSlots: ['10:00-13:00', '16:00-19:00'], isFavorite: false, isAdded: false, emoji: '🏐' },
  { id: '14', name: 'Flamenco Show', location: 'Barcelona, Spain', availableTimeSlots: ['20:00-22:00', '21:00-23:00'], isFavorite: false, isAdded: false, emoji: '💃' },
  { id: '15', name: 'Park Güell Walk', location: 'Barcelona, Spain', availableTimeSlots: ['08:00-11:00', '15:00-18:00'], isFavorite: false, isAdded: false, emoji: '🌳' },
  
  // Tokyo, Japan
  { id: '16', name: 'Sushi Making', location: 'Tokyo, Japan', availableTimeSlots: ['11:00-14:00', '17:00-20:00'], isFavorite: false, isAdded: false, emoji: '🍣' },
  { id: '17', name: 'Sumo Wrestling', location: 'Tokyo, Japan', availableTimeSlots: ['13:00-16:00', '18:00-21:00'], isFavorite: false, isAdded: false, emoji: '🤼' },
  { id: '18', name: 'Temple Garden', location: 'Tokyo, Japan', availableTimeSlots: ['07:00-10:00', '14:00-17:00'], isFavorite: false, isAdded: false, emoji: '🏯' },
  { id: '19', name: 'Karaoke Night', location: 'Tokyo, Japan', availableTimeSlots: ['19:00-22:00', '20:00-23:00'], isFavorite: false, isAdded: false, emoji: '🎤' },
  { id: '20', name: 'Ramen Tour', location: 'Tokyo, Japan', availableTimeSlots: ['18:00-21:00', '19:00-22:00'], isFavorite: false, isAdded: false, emoji: '🍜' },
  
  // New York, USA
  { id: '21', name: 'Broadway Show', location: 'New York, USA', availableTimeSlots: ['19:00-22:00', '20:00-23:00'], isFavorite: false, isAdded: false, emoji: '🎭' },
  { id: '22', name: 'Central Park Bike', location: 'New York, USA', availableTimeSlots: ['09:00-12:00', '14:00-17:00'], isFavorite: false, isAdded: false, emoji: '🚲' },
  { id: '23', name: 'Pizza Walking Tour', location: 'New York, USA', availableTimeSlots: ['11:00-14:00', '17:00-20:00'], isFavorite: false, isAdded: false, emoji: '🍕' },
  { id: '24', name: 'Museum of Modern Art', location: 'New York, USA', availableTimeSlots: ['10:00-13:00', '14:00-17:00'], isFavorite: false, isAdded: false, emoji: '🎨' },
  { id: '25', name: 'Brooklyn Bridge Walk', location: 'New York, USA', availableTimeSlots: ['08:00-11:00', '16:00-19:00'], isFavorite: false, isAdded: false, emoji: '🌉' },
  
  // Rome, Italy
  { id: '26', name: 'Colosseum Tour', location: 'Rome, Italy', availableTimeSlots: ['09:00-12:00', '14:00-17:00'], isFavorite: false, isAdded: false, emoji: '🏛️' },
  { id: '27', name: 'Pasta Making Class', location: 'Rome, Italy', availableTimeSlots: ['11:00-14:00', '16:00-19:00'], isFavorite: false, isAdded: false, emoji: '🍝' },
  { id: '28', name: 'Vatican Museums', location: 'Rome, Italy', availableTimeSlots: ['08:00-11:00', '13:00-16:00'], isFavorite: false, isAdded: false, emoji: '🎨' },
  { id: '29', name: 'Gelato Tour', location: 'Rome, Italy', availableTimeSlots: ['15:00-18:00', '17:00-20:00'], isFavorite: false, isAdded: false, emoji: '🍨' },
  { id: '30', name: 'Vespa City Tour', location: 'Rome, Italy', availableTimeSlots: ['10:00-13:00', '14:00-17:00'], isFavorite: false, isAdded: false, emoji: '🛵' },
  
  // Dubai, UAE
  { id: '31', name: 'Desert Safari', location: 'Dubai, UAE', availableTimeSlots: ['15:00-20:00', '16:00-21:00'], isFavorite: false, isAdded: false, emoji: '🏜️' },
  { id: '32', name: 'Burj Khalifa Visit', location: 'Dubai, UAE', availableTimeSlots: ['10:00-12:00', '18:00-20:00'], isFavorite: false, isAdded: false, emoji: '🏙️' },
  { id: '33', name: 'Spice Souk Tour', location: 'Dubai, UAE', availableTimeSlots: ['09:00-12:00', '16:00-19:00'], isFavorite: false, isAdded: false, emoji: '🧂' },
  { id: '34', name: 'Dhow Cruise', location: 'Dubai, UAE', availableTimeSlots: ['19:00-22:00', '20:00-23:00'], isFavorite: false, isAdded: false, emoji: '⛵' },
  { id: '35', name: 'Indoor Skiing', location: 'Dubai, UAE', availableTimeSlots: ['11:00-14:00', '15:00-18:00'], isFavorite: false, isAdded: false, emoji: '⛷️' },
  
  // London, UK
  { id: '36', name: 'Tower of London', location: 'London, UK', availableTimeSlots: ['09:00-12:00', '14:00-17:00'], isFavorite: false, isAdded: false, emoji: '🏰' },
  { id: '37', name: 'Afternoon Tea', location: 'London, UK', availableTimeSlots: ['14:00-16:00', '15:00-17:00'], isFavorite: false, isAdded: false, emoji: '☕' },
  { id: '38', name: 'Thames River Cruise', location: 'London, UK', availableTimeSlots: ['11:00-13:00', '17:00-19:00'], isFavorite: false, isAdded: false, emoji: '🚢' },
  { id: '39', name: 'West End Theatre', location: 'London, UK', availableTimeSlots: ['19:00-22:00', '20:00-23:00'], isFavorite: false, isAdded: false, emoji: '🎭' },
  { id: '40', name: 'Camden Market', location: 'London, UK', availableTimeSlots: ['10:00-14:00', '13:00-17:00'], isFavorite: false, isAdded: false, emoji: '🛍️' },
  
  // Sydney, Australia
  { id: '41', name: 'Opera House Tour', location: 'Sydney, Australia', availableTimeSlots: ['09:00-11:00', '14:00-16:00'], isFavorite: false, isAdded: false, emoji: '🎭' },
  { id: '42', name: 'Bondi Beach Surf', location: 'Sydney, Australia', availableTimeSlots: ['08:00-11:00', '15:00-18:00'], isFavorite: false, isAdded: false, emoji: '🏄' },
  { id: '43', name: 'Harbor Bridge Climb', location: 'Sydney, Australia', availableTimeSlots: ['07:00-10:00', '16:00-19:00'], isFavorite: false, isAdded: false, emoji: '🌉' },
  { id: '44', name: 'Wildlife Park', location: 'Sydney, Australia', availableTimeSlots: ['09:00-13:00', '13:00-17:00'], isFavorite: false, isAdded: false, emoji: '🦘' },
  { id: '45', name: 'Coastal Walk', location: 'Sydney, Australia', availableTimeSlots: ['06:00-09:00', '16:00-19:00'], isFavorite: false, isAdded: false, emoji: '🚶' },
  
  // Amsterdam, Netherlands
  { id: '46', name: 'Canal Boat Tour', location: 'Amsterdam, Netherlands', availableTimeSlots: ['10:00-12:00', '15:00-17:00'], isFavorite: false, isAdded: false, emoji: '🚤' },
  { id: '47', name: 'Van Gogh Museum', location: 'Amsterdam, Netherlands', availableTimeSlots: ['09:00-12:00', '13:00-16:00'], isFavorite: false, isAdded: false, emoji: '🎨' },
  { id: '48', name: 'Cheese Tasting', location: 'Amsterdam, Netherlands', availableTimeSlots: ['11:00-13:00', '14:00-16:00'], isFavorite: false, isAdded: false, emoji: '🧀' },
  { id: '49', name: 'Bike City Tour', location: 'Amsterdam, Netherlands', availableTimeSlots: ['10:00-13:00', '14:00-17:00'], isFavorite: false, isAdded: false, emoji: '🚴' },
  { id: '50', name: 'Tulip Garden', location: 'Amsterdam, Netherlands', availableTimeSlots: ['08:00-11:00', '13:00-16:00'], isFavorite: false, isAdded: false, emoji: '🌷' },
  
  // Berlin, Germany
  { id: '51', name: 'Berlin Wall Tour', location: 'Berlin, Germany', availableTimeSlots: ['09:00-12:00', '14:00-17:00'], isFavorite: false, isAdded: false, emoji: '🧱' },
  { id: '52', name: 'Beer Garden', location: 'Berlin, Germany', availableTimeSlots: ['16:00-19:00', '18:00-21:00'], isFavorite: false, isAdded: false, emoji: '🍺' },
  { id: '53', name: 'Museum Island', location: 'Berlin, Germany', availableTimeSlots: ['10:00-13:00', '13:00-16:00'], isFavorite: false, isAdded: false, emoji: '🏛️' },
  { id: '54', name: 'Street Art Tour', location: 'Berlin, Germany', availableTimeSlots: ['11:00-14:00', '15:00-18:00'], isFavorite: false, isAdded: false, emoji: '🎨' },
  { id: '55', name: 'Currywurst Tasting', location: 'Berlin, Germany', availableTimeSlots: ['12:00-14:00', '18:00-20:00'], isFavorite: false, isAdded: false, emoji: '🌭' },
  
  // Singapore, Singapore
  { id: '56', name: 'Gardens by the Bay', location: 'Singapore, Singapore', availableTimeSlots: ['09:00-12:00', '18:00-21:00'], isFavorite: false, isAdded: false, emoji: '🌳' },
  { id: '57', name: 'Hawker Food Tour', location: 'Singapore, Singapore', availableTimeSlots: ['11:00-14:00', '18:00-21:00'], isFavorite: false, isAdded: false, emoji: '🍜' },
  { id: '58', name: 'Marina Bay Sands', location: 'Singapore, Singapore', availableTimeSlots: ['10:00-13:00', '16:00-19:00'], isFavorite: false, isAdded: false, emoji: '🏙️' },
  { id: '59', name: 'Sentosa Island', location: 'Singapore, Singapore', availableTimeSlots: ['09:00-14:00', '13:00-18:00'], isFavorite: false, isAdded: false, emoji: '🏝️' },
  { id: '60', name: 'Night Safari', location: 'Singapore, Singapore', availableTimeSlots: ['19:00-22:00', '20:00-23:00'], isFavorite: false, isAdded: false, emoji: '🦁' },
];

