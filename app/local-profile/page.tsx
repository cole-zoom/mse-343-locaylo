'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { User, Camera } from 'lucide-react';
import { useProfile } from '@/lib/ProfileContext';
import { LocalNav } from '@/app/ui/LocalNav';

export default function LocalProfilePage() {
  const router = useRouter();
  const { profile } = useProfile();

  return (
    <div 
      className="min-h-screen flex flex-col items-center pb-24"
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Main Content */}
      <div className="w-full max-w-md px-6 pt-12">
        {/* App Name */}
        <h1 className="text-4xl font-bold mb-12" style={{ color: 'var(--text-primary)' }}>
          Locaylo
        </h1>

        {/* Profile Avatar */}
        <div className="flex justify-center mb-8">
          <div 
            onClick={() => router.push('/edit-profile')}
            className="relative w-56 h-56 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden cursor-pointer group"
          >
            {profile.avatar ? (
              <img 
                src={profile.avatar} 
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={80} style={{ color: 'var(--text-subtle)' }} />
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera size={48} className="text-white" />
            </div>
          </div>
        </div>

        {/* Profile Name */}
        <h2 className="text-4xl font-bold text-center mb-8" style={{ color: 'var(--text-primary)' }}>
          {profile.name}
        </h2>

        {/* Profile Details */}
        <div className="space-y-6">
          {/* Age */}
          <div 
            className="pb-4"
            style={{ borderBottom: '1px solid var(--border-default)' }}
          >
            <p className="text-lg">
              <span className="font-bold" style={{ color: 'var(--text-primary)' }}>Age: </span>
              <span style={{ color: 'var(--text-primary)' }}>{profile.age}</span>
            </p>
          </div>

          {/* Email */}
          <div 
            className="pb-4"
            style={{ borderBottom: '1px solid var(--border-default)' }}
          >
            <p className="text-lg">
              <span className="font-bold" style={{ color: 'var(--text-primary)' }}>Email: </span>
              <span style={{ color: 'var(--text-primary)' }}>{profile.email}</span>
            </p>
          </div>

          {/* Birthday */}
          <div 
            className="pb-4"
            style={{ borderBottom: '1px solid var(--border-default)' }}
          >
            <p className="text-lg">
              <span className="font-bold" style={{ color: 'var(--text-primary)' }}>Birthday: </span>
              <span style={{ color: 'var(--text-primary)' }}>{profile.birthday}</span>
            </p>
          </div>

          {/* Home City */}
          <div 
            className="pb-4"
            style={{ borderBottom: '1px solid var(--border-default)' }}
          >
            <p className="text-lg">
              <span className="font-bold" style={{ color: 'var(--text-primary)' }}>Home City: </span>
              <span style={{ color: 'var(--text-primary)' }}>{profile.homeCity}</span>
            </p>
          </div>

          {/* Location Sharing */}
          <div 
            className="pb-4"
            style={{ borderBottom: '1px solid var(--border-default)' }}
          >
            <p className="text-lg">
              <span className="font-bold" style={{ color: 'var(--text-primary)' }}>Location Sharing: </span>
              <span style={{ color: 'var(--text-primary)' }}>{profile.locationSharing}</span>
            </p>
          </div>

          {/* Mode */}
          <div 
            className="pb-4"
            style={{ borderBottom: '1px solid var(--border-default)' }}
          >
            <p className="text-lg">
              <span className="font-bold" style={{ color: 'var(--text-primary)' }}>Mode: </span>
              <span style={{ color: 'var(--text-primary)' }}>{profile.mode}</span>
            </p>
          </div>

          {/* Languages Spoken */}
          <div 
            className="pb-4"
            style={{ borderBottom: '1px solid var(--border-default)' }}
          >
            <p className="text-lg">
              <span className="font-bold" style={{ color: 'var(--text-primary)' }}>Languages Spoken: </span>
              <span style={{ color: 'var(--text-primary)' }}>{profile.languageSpoken}</span>
            </p>
          </div>

          {/* Get Verified Button */}
          <button
            className="w-full text-left text-lg font-bold underline"
            style={{ color: 'var(--text-primary)' }}
            onClick={() => {
              // Handle verification logic here
              alert('Verification feature coming soon!');
            }}
          >
            Get Verified
          </button>

          {/* Edit Button */}
          <button
            onClick={() => router.push('/edit-profile')}
            className="w-full text-center text-lg font-bold underline mt-8"
            style={{ color: 'var(--text-primary)' }}
          >
            Edit
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <LocalNav />
    </div>
  );
}

