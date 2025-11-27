'use client';

import React from 'react';
import { ActivityItem } from '@/lib/types';
import { DATES } from '@/lib/data';

interface ActivityCardProps {
  activity: ActivityItem;
  onEdit: () => void;
  onCancel: () => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ 
  activity, 
  onEdit, 
  onCancel 
}) => {
  // Get the display name for the date
  const getDateName = (dateId: string) => {
    const dateOption = DATES.find(d => d.id === dateId);
    return dateOption?.name || dateId;
  };

  return (
    <div 
      className="p-6 rounded-3xl transition-all"
      style={{ 
        backgroundColor: 'var(--surface-white)',
        boxShadow: '0 0 20px rgba(96, 165, 250, 0.4), 0 0 40px rgba(96, 165, 250, 0.2)'
      }}
    >
      <h4 className="text-2xl font-black mb-3" style={{ color: 'var(--text-primary)' }}>
        {activity.name}
      </h4>
      <div className="mb-1">
        <p className="text-base font-normal" style={{ color: 'var(--text-primary)' }}>
          Date: {getDateName(activity.date)}
        </p>
      </div>
      <div className="mb-4">
        <p className="text-base font-normal" style={{ color: 'var(--text-primary)' }}>
          Available Times: {activity.startTime} - {activity.endTime}
        </p>
      </div>
      
      <div className="flex gap-3">
        <button 
          onClick={onEdit}
          className="flex-1 py-3 rounded-3xl text-base font-medium transition-all hover:opacity-80 active:scale-[0.98]"
          style={{ 
            backgroundColor: 'var(--surface-white)',
            border: '2px solid var(--primary-blue-text)',
            color: 'var(--text-primary)'
          }}
        >
          Edit
        </button>
        <button 
          onClick={onCancel}
          className="flex-1 py-3 rounded-3xl text-base font-medium transition-all hover:opacity-80 active:scale-[0.98]"
          style={{ 
            backgroundColor: 'var(--primary-blue)',
            color: 'var(--text-primary)'
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

