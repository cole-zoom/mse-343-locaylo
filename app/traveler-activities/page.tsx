'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Trash2, ChevronDown } from 'lucide-react';
import { TravelerNav } from '../ui/TravelerNav';
import { ActivityDetailsModal } from '../ui/ActivityDetailsModal';
import { DatePickerModal } from '../ui/DatePickerModal';
import { TravelerActivity } from '@/lib/types';
import { DATES, currentDate as initialCurrentDate } from '@/lib/data';
import { useTravelerActivities } from '@/lib/TravelerActivityContext';

export default function TravelerActivitiesPage() {
  const router = useRouter();
  const { activities, toggleFavorite, removeFromSchedule, addToSchedule } = useTravelerActivities();
  const [activeTab, setActiveTab] = useState<'favourites' | 'scheduled'>('favourites');
  const [currentDate, setCurrentDate] = useState<string>(initialCurrentDate);
  const [selectedActivity, setSelectedActivity] = useState<TravelerActivity | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Filter activities based on tab
  const favouriteActivities = activities.filter(activity => activity.isFavorite);
  const scheduledActivities = activities.filter(activity => activity.isAdded && activity.date === currentDate);

  const handleToggleFavorite = (activityId: string) => {
    toggleFavorite(activityId);
  };

  const handleDeleteScheduled = (activityId: string) => {
    if (confirm('Are you sure you want to remove this activity from your schedule?')) {
      removeFromSchedule(activityId);
    }
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

  // Generate time slots from 00:00 to 24:00
  const timeSlots = Array.from({ length: 25 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return `${hour}:00`;
  });

  // Calculate position and height for activity cards
  const getActivityStyle = (activity: TravelerActivity) => {
    if (!activity.startTime || !activity.endTime) return { top: '0px', height: '60px' };
    
    const [startHour, startMin] = activity.startTime.split(':').map(Number);
    const [endHour, endMin] = activity.endTime.split(':').map(Number);

    const startDecimal = startHour + startMin / 60;
    const endDecimal = endHour + endMin / 60;
    const duration = endDecimal - startDecimal;

    // Each hour slot is 60px tall
    const top = startDecimal * 60;
    const height = duration * 60;

    return {
      top: `${top}px`,
      height: `${height}px`,
    };
  };

  return (
    <div 
      className="min-h-screen pb-24 max-w-md mx-auto relative font-sans" 
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Header */}
      <div className="pt-8 px-6 pb-4">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-4xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Locaylo
          </h1>
          <div className="text-right">
            <div className="text-lg font-black" style={{ color: 'var(--text-primary)' }}>Traveler</div>
            <button 
              className="text-sm font-medium underline" 
              style={{ color: 'var(--text-primary)' }}
              onClick={() => router.push('/role-select')}
            >
              Switch
            </button>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-5xl font-black mb-8 tracking-tight text-center" style={{ color: 'var(--text-primary)' }}>
          Your Activities
        </h2>

        {/* Tabs */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setActiveTab('favourites')}
            className={`flex-1 py-4 rounded-3xl font-bold text-base transition-all ${
              activeTab === 'favourites'
                ? 'text-black'
                : 'text-black bg-white'
            }`}
            style={activeTab === 'favourites' ? { backgroundColor: 'var(--primary-blue)' } : {}}
          >
            Favourites
          </button>
          <button
            onClick={() => setActiveTab('scheduled')}
            className={`flex-1 py-4 rounded-3xl font-bold text-base transition-all ${
              activeTab === 'scheduled'
                ? 'text-black'
                : 'text-black bg-white'
            }`}
            style={activeTab === 'scheduled' ? { backgroundColor: 'var(--primary-blue)' } : {}}
          >
            Scheduled
          </button>
        </div>

        {/* Conditional View: Favourites or Scheduled */}
        {activeTab === 'favourites' ? (
          /* Favourites List */
          <div>
            <div className="mb-6 flex justify-between items-center">
              <p className="text-black text-lg font-normal">{getCurrentDateName()}</p>
              <button 
                onClick={() => setShowDatePicker(true)}
                className="text-black text-base underline font-normal hover:text-gray-700 transition-colors"
              >
                Change date
              </button>
            </div>
            
            <div className="space-y-4">
              {favouriteActivities.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-lg font-medium" style={{ color: 'var(--text-muted)' }}>
                    No favourite activities yet
                  </p>
                  <p className="text-sm mt-2" style={{ color: 'var(--text-subtle)' }}>
                    Heart an activity to add it to your favourites
                  </p>
                </div>
              ) : (
                favouriteActivities.map((activity) => (
                  <div 
                    key={activity.id} 
                    onClick={() => setSelectedActivity(activity)}
                    className="p-5 rounded-3xl shadow-[0_4px_20px_rgba(96,165,250,0.3)] hover:shadow-[0_4px_25px_rgba(96,165,250,0.4)] transition-all cursor-pointer"
                    style={{ backgroundColor: 'var(--surface-white)', border: '1px solid rgba(96,165,250,0.2)' }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-4xl mt-1">
                        {activity.emoji}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-black text-xl mb-1">{activity.name}</h4>
                        <p className="text-base text-black font-normal mb-2">{activity.location}</p>
                        {activity.date && activity.startTime && activity.endTime && (
                          <div className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                            <p>Date: {activity.date}</p>
                            <p>Times: {activity.startTime} - {activity.endTime}</p>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleFavorite(activity.id);
                        }}
                        className="hover:scale-110 transition-transform mt-1"
                      >
                        <Heart 
                          size={24} 
                          className="fill-red-500 text-red-500"
                        />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          /* Schedule View for Scheduled */
          <div>
            {/* Date Selector */}
            <div className="mb-4 flex items-center justify-between p-4 rounded-3xl" 
              style={{ backgroundColor: 'var(--surface-white)', border: '2px solid var(--border-default)' }}>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black" style={{ color: 'var(--text-primary)' }}>
                  Date:
                </span>
                <select
                  value={currentDate}
                  onChange={(e) => setCurrentDate(e.target.value)}
                  className="text-lg font-medium px-4 py-2 rounded-3xl focus:outline-none cursor-pointer"
                  style={{ 
                    backgroundColor: 'var(--background)',
                    border: '2px solid var(--border-default)',
                    color: 'var(--text-primary)'
                  }}
                >
                  {DATES.map((date) => (
                    <option key={date.id} value={date.id}>
                      {date.name}
                    </option>
                  ))}
                </select>
              </div>
              <ChevronDown size={24} style={{ color: 'var(--text-primary)' }} />
            </div>

            {scheduledActivities.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg font-medium" style={{ color: 'var(--text-muted)' }}>
                  No scheduled activities for this date
                </p>
                <p className="text-sm mt-2" style={{ color: 'var(--text-subtle)' }}>
                  Add activities from the search page
                </p>
              </div>
            ) : (
              /* Schedule Grid */
              <div className="relative rounded-3xl overflow-hidden" 
                style={{ backgroundColor: 'var(--surface-white)' }}>
                {/* Time Labels and Lines */}
                <div className="relative">
                  {timeSlots.map((time, index) => (
                    <div 
                      key={time}
                      className="flex items-start"
                      style={{ 
                        height: '60px',
                        borderTop: index === 0 ? 'none' : '1px solid var(--border-default)'
                      }}
                    >
                      <div 
                        className="flex-shrink-0 w-16 text-sm font-bold pt-1 pl-3"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {time}
                      </div>
                      <div className="flex-1 relative h-full">
                        {/* This is where activities will be positioned */}
                      </div>
                    </div>
                  ))}

                  {/* Activity Cards - Positioned Absolutely */}
                  <div className="absolute top-0 left-16 right-0 pointer-events-none">
                    <div className="relative" style={{ height: '1500px' }}>
                      {scheduledActivities.map((activity) => {
                        const style = getActivityStyle(activity);
                        return (
                          <div
                            key={activity.id}
                            className="absolute left-2 right-2 rounded-3xl p-3 pointer-events-auto transition-all"
                            style={{
                              ...style,
                              backgroundColor: 'var(--primary-blue)',
                              border: '2px solid var(--primary-blue-border)',
                              minHeight: '50px',
                            }}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className="text-2xl">{activity.emoji}</span>
                                <h4 className="text-lg font-black" style={{ color: 'var(--text-primary)' }}>
                                  {activity.name}
                                </h4>
                              </div>
                            </div>
                            <div className="flex gap-3 text-sm font-medium">
                              <span className="px-3 py-1 rounded-full" 
                                style={{ backgroundColor: 'var(--surface-white)', color: 'var(--text-primary)' }}>
                                Confirmed
                              </span>
                              <button
                                onClick={() => handleDeleteScheduled(activity.id)}
                                className="px-3 py-1 rounded-full hover:opacity-80 transition-all flex items-center gap-1"
                                style={{ backgroundColor: 'var(--surface-white)', color: 'var(--text-primary)' }}
                              >
                                <Trash2 size={14} />
                                Cancel
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <TravelerNav current="activities" />

      {/* Activity Details Modal */}
      {selectedActivity && (
        <ActivityDetailsModal
          activity={selectedActivity}
          onClose={() => setSelectedActivity(null)}
          onInterested={handleInterested}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {/* Date Picker Modal */}
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

