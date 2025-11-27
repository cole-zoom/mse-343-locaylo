'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { X } from 'lucide-react';
import { useActivities } from '@/lib/ActivityContext';
import { DATES } from '@/lib/data';

function EditActivityContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activityId = searchParams.get('id');
  const { getActivity, updateActivity } = useActivities();

  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [status, setStatus] = useState<'pending' | 'scheduled'>('pending');

  useEffect(() => {
    if (activityId) {
      const activity = getActivity(activityId);
      if (activity) {
        setName(activity.name);
        setDate(activity.date);
        setStartTime(activity.startTime);
        setEndTime(activity.endTime);
        setStatus(activity.status);
      }
    }
  }, [activityId, getActivity]);

  const handleSave = () => {
    if (activityId && name && date && startTime && endTime) {
      updateActivity(activityId, { name, date, startTime, endTime, status });
      router.back();
    }
  };

  // Get the display name for a date
  const getDateName = (dateId: string) => {
    const dateOption = DATES.find(d => d.id === dateId);
    return dateOption?.name || dateId;
  };

  // Format time input: only allow numbers, max 4 digits, auto-add colon
  const handleTimeChange = (value: string, setter: (val: string) => void) => {
    const digits = value.replace(/\D/g, ''); // Remove non-digits
    if (digits.length <= 4) {
      let formatted = digits;
      if (digits.length > 2) {
        formatted = digits.slice(0, 2) + ':' + digits.slice(2);
      }
      setter(formatted);
    }
  };

  return (
    <div 
      className="min-h-screen max-w-md mx-auto relative font-sans p-6"
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8 pt-8">
        <h1 className="text-3xl font-black" style={{ color: 'var(--text-primary)' }}>
          Edit Activity
        </h1>
        <button 
          onClick={() => router.back()}
          className="p-2 rounded-full hover:opacity-80 transition-all"
          style={{ backgroundColor: 'var(--primary-blue)' }}
        >
          <X size={24} style={{ color: 'var(--text-primary)' }} />
        </button>
      </div>

      {/* Form */}
      <div className="space-y-6">
        {/* Name Field */}
        <div>
          <label 
            className="block text-sm font-bold mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            Activity Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 rounded-3xl text-base font-medium focus:outline-none focus:ring-2 transition-all"
            style={{ 
              backgroundColor: 'var(--surface-white)',
              border: '2px solid var(--border-default)',
              color: 'var(--text-primary)'
            }}
            placeholder="Enter activity name"
          />
        </div>

        {/* Date Field */}
        <div>
          <label 
            className="block text-sm font-bold mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            Date
          </label>
          <select
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-4 rounded-3xl text-base font-medium focus:outline-none cursor-pointer transition-all"
            style={{ 
              backgroundColor: 'var(--surface-white)',
              border: '2px solid var(--border-default)',
              color: 'var(--text-primary)'
            }}
          >
            {DATES.map((dateOption) => (
              <option key={dateOption.id} value={dateOption.id}>
                {dateOption.name}
              </option>
            ))}
          </select>
        </div>

        {/* Start Time Field */}
        <div>
          <label 
            className="block text-sm font-bold mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            Start Time (24-hour)
          </label>
          <input
            type="text"
            value={startTime}
            onChange={(e) => handleTimeChange(e.target.value, setStartTime)}
            className="w-full p-4 rounded-3xl text-base font-medium focus:outline-none focus:ring-2 transition-all"
            style={{ 
              backgroundColor: 'var(--surface-white)',
              border: '2px solid var(--border-default)',
              color: 'var(--text-primary)'
            }}
            placeholder="09:00"
            maxLength={5}
          />
        </div>

        {/* End Time Field */}
        <div>
          <label 
            className="block text-sm font-bold mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            End Time (24-hour)
          </label>
          <input
            type="text"
            value={endTime}
            onChange={(e) => handleTimeChange(e.target.value, setEndTime)}
            className="w-full p-4 rounded-3xl text-base font-medium focus:outline-none focus:ring-2 transition-all"
            style={{ 
              backgroundColor: 'var(--surface-white)',
              border: '2px solid var(--border-default)',
              color: 'var(--text-primary)'
            }}
            placeholder="17:00"
            maxLength={5}
          />
        </div>

        {/* Status Field */}
        <div>
          <label 
            className="block text-sm font-bold mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            Status
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => setStatus('pending')}
              className={`flex-1 py-4 rounded-3xl font-bold text-base transition-all`}
              style={status === 'pending' 
                ? { backgroundColor: 'var(--primary-blue)', color: 'var(--text-primary)' }
                : { backgroundColor: 'var(--surface-white)', color: 'var(--text-primary)', border: '2px solid var(--border-default)' }
              }
            >
              Pending
            </button>
            <button
              onClick={() => setStatus('scheduled')}
              className={`flex-1 py-4 rounded-3xl font-bold text-base transition-all`}
              style={status === 'scheduled'
                ? { backgroundColor: 'var(--primary-blue)', color: 'var(--text-primary)' }
                : { backgroundColor: 'var(--surface-white)', color: 'var(--text-primary)', border: '2px solid var(--border-default)' }
              }
            >
              Scheduled
            </button>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full py-4 rounded-3xl text-lg font-black transition-all active:scale-[0.98] mt-8"
          style={{ 
            backgroundColor: 'var(--primary-blue)',
            color: 'var(--text-primary)',
            boxShadow: 'var(--button-shadow)'
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default function EditActivityPage() {
  return (
    <Suspense fallback={
      <div 
        className="min-h-screen max-w-md mx-auto relative font-sans flex items-center justify-center"
        style={{ backgroundColor: 'var(--background)' }}
      >
        <p style={{ color: 'var(--text-muted)' }}>Loading...</p>
      </div>
    }>
      <EditActivityContent />
    </Suspense>
  );
}

