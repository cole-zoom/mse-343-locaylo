'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useActivities } from '@/lib/ActivityContext';
import { ActivityCard } from '../ui/ActivityCard';
import { AddActivityModal } from '../ui/AddActivityModal';
import { EditScheduledModal } from '../ui/EditScheduledModal';
import { LocalNav } from '../ui/LocalNav';
import { ActivityItem } from '@/lib/types';

// Dynamically import ScheduleView to avoid SSR issues
const ScheduleView = dynamic(() => import('../ui/ScheduleView').then(mod => ({ default: mod.ScheduleView })), {
  ssr: false,
  loading: () => (
    <div className="text-center py-12">
      <p className="text-lg font-medium" style={{ color: 'var(--text-muted)' }}>
        Loading schedule...
      </p>
    </div>
  )
});

export default function LocalHomePage() {
  const router = useRouter();
  const { activities, deleteActivity } = useActivities();
  const [activeTab, setActiveTab] = useState<'pending' | 'scheduled'>('pending');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedScheduledActivityId, setSelectedScheduledActivityId] = useState<string | null>(null);

  const filteredActivities = activities.filter(
    activity => activity.status === activeTab
  );

  const handleEdit = (activityId: string) => {
    if (activeTab === 'scheduled') {
      setSelectedScheduledActivityId(activityId);
    } else {
      router.push(`/edit-activity?id=${activityId}`);
    }
  };

  const handleCancel = (activityId: string) => {
    if (confirm('Are you sure you want to delete this activity?')) {
      deleteActivity(activityId);
    }
  };

  const handleSelectCalendarEvent = (activity: ActivityItem) => {
    setSelectedScheduledActivityId(activity.id);
  };

  return (
    <div className="min-h-screen pb-24 max-w-md mx-auto relative font-sans" style={{ backgroundColor: 'var(--background)' }}>
      {/* Header */}
      <div className="pt-8 px-6 pb-4">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-4xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Locaylo
          </h1>
          <div className="text-right">
            <div className="text-lg font-black" style={{ color: 'var(--text-primary)' }}>Local</div>
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
            onClick={() => setActiveTab('pending')}
            className={`flex-1 py-4 rounded-3xl font-bold text-base transition-all ${
              activeTab === 'pending'
                ? 'text-black'
                : 'text-black bg-white'
            }`}
            style={activeTab === 'pending' ? { backgroundColor: 'var(--primary-blue)' } : {}}
          >
            Pending
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

        {/* Sort Label - Only show in pending view */}
        {activeTab === 'pending' && (
          <div className="mb-6">
            <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
              Sort: Recently Added
            </h3>
          </div>
        )}

        {/* Conditional View: List or Calendar */}
        {activeTab === 'pending' ? (
          /* Activities List for Pending */
          <div className="space-y-6">
            {filteredActivities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onEdit={() => handleEdit(activity.id)}
                onCancel={() => handleCancel(activity.id)}
              />
            ))}
            
            {filteredActivities.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg font-medium" style={{ color: 'var(--text-muted)' }}>
                  No pending activities
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Schedule View for Scheduled */
          <div className="mb-6">
            {filteredActivities.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg font-medium" style={{ color: 'var(--text-muted)' }}>
                  No scheduled activities
                </p>
              </div>
            ) : (
              <ScheduleView 
                activities={activities} 
                onSelectEvent={handleSelectCalendarEvent}
              />
            )}
          </div>
        )}

        {/* Add Activity Button - Only show in pending view */}
        {activeTab === 'pending' && (
          <div className="mt-8">
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="w-full py-4 rounded-3xl text-lg font-black transition-all active:scale-[0.98]"
              style={{ 
                backgroundColor: 'var(--primary-blue)',
                color: 'var(--text-primary)'
              }}
            >
              Add Activity
            </button>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <LocalNav />

      {/* Add Activity Modal */}
      <AddActivityModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />

      {/* Edit Scheduled Activity Modal */}
      <EditScheduledModal
        isOpen={selectedScheduledActivityId !== null}
        onClose={() => setSelectedScheduledActivityId(null)}
        activityId={selectedScheduledActivityId}
      />
    </div>
  );
}

