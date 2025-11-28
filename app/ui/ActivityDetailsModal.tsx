'use client';

import React, { useState } from 'react';
import { X, Heart } from 'lucide-react';
import { TravelerActivity } from '@/lib/types';

interface ActivityDetailsModalProps {
  activity: TravelerActivity;
  onClose: () => void;
  onInterested: (activityId: string, timeSlot: string) => void;
  onToggleFavorite: (activityId: string) => void;
  onShowNotification?: () => void;
}

export function ActivityDetailsModal({ 
  activity, 
  onClose, 
  onInterested,
  onToggleFavorite,
  onShowNotification
}: ActivityDetailsModalProps) {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(activity.isFavorite);

  const handleInterested = () => {
    if (selectedTimeSlot) {
      onInterested(activity.id, selectedTimeSlot);
      if (onShowNotification) {
        onShowNotification();
      }
      onClose();
    }
  };

  const handleToggleFavorite = () => {
    // Show notification when adding to favorites (not removing)
    if (!isFavorite && onShowNotification) {
      onShowNotification();
    }
    setIsFavorite(!isFavorite);
    onToggleFavorite(activity.id);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl p-8 max-w-md w-full relative animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Activity header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="text-5xl">{activity.emoji}</div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-black mb-1">{activity.name}</h2>
            <p className="text-base text-gray-600">{activity.location.split(',')[0]}</p>
          </div>
        </div>

        {/* Available time slots */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-black">Available time slots</h3>
            <button
              onClick={handleToggleFavorite}
              className="p-2 hover:scale-110 transition-transform"
            >
              <Heart 
                size={28} 
                className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'}
                strokeWidth={2}
              />
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            {activity.availableTimeSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedTimeSlot(slot)}
                className={`px-6 py-3 rounded-3xl border-2 text-base font-medium transition-all ${
                  selectedTimeSlot === slot
                    ? 'border-blue-400 bg-blue-50 text-black'
                    : 'border-gray-300 text-black hover:border-gray-400'
                }`}
              >
                {slot.replace('-', ' - ')}
              </button>
            ))}
          </div>
        </div>

        {/* I'm interested button */}
        <button
          onClick={handleInterested}
          disabled={!selectedTimeSlot}
          className={`w-full py-4 rounded-3xl text-lg font-bold transition-all ${
            selectedTimeSlot
              ? 'text-black shadow-[0_4px_20px_rgba(96,165,250,0.3)] hover:shadow-[0_4px_25px_rgba(96,165,250,0.4)] active:scale-[0.98]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          style={selectedTimeSlot ? { backgroundColor: 'rgba(96,165,250,0.3)' } : undefined}
        >
          I&apos;m interested
        </button>
      </div>
    </div>
  );
}

