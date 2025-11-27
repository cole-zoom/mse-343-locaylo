'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ActivityItem } from '@/lib/types';
import { DATES } from '@/lib/data';

interface ScheduleViewProps {
  activities: ActivityItem[];
  onSelectEvent: (activity: ActivityItem) => void;
  selectedDate?: string;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({ 
  activities, 
  onSelectEvent,
  selectedDate 
}) => {
  const [currentDate, setCurrentDate] = useState(selectedDate || DATES[26].id); // Default to November 27th, 2025

  // Generate time slots from 00:00 to 24:00
  const timeSlots = Array.from({ length: 25 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return `${hour}:00`;
  });

  // Filter activities for the selected date
  const filteredActivities = activities.filter(
    activity => activity.status === 'scheduled' && activity.date === currentDate
  );

  // Calculate position and height for activity cards
  const getActivityStyle = (activity: ActivityItem) => {
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
    <div className="w-full">
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

      {/* Schedule Grid */}
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
              {filteredActivities.map((activity) => {
                const style = getActivityStyle(activity);
                return (
                  <div
                    key={activity.id}
                    className="absolute left-2 right-2 rounded-3xl p-3 cursor-pointer pointer-events-auto transition-all hover:opacity-90"
                    style={{
                      ...style,
                      backgroundColor: 'var(--primary-blue)',
                      border: '2px solid var(--primary-blue-border)',
                      minHeight: '50px',
                    }}
                    onClick={() => onSelectEvent(activity)}
                  >
                    <h4 className="text-lg font-black mb-1" style={{ color: 'var(--text-primary)' }}>
                      {activity.name}
                    </h4>
                    <div className="flex gap-4 text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      <span className="px-3 py-1 rounded-full" 
                        style={{ backgroundColor: 'var(--surface-white)' }}>
                        Confirmed
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectEvent(activity);
                        }}
                        className="px-3 py-1 rounded-full hover:opacity-80 transition-all"
                        style={{ backgroundColor: 'var(--surface-white)' }}
                      >
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
    </div>
  );
};

