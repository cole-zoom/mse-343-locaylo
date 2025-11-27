'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Profile } from '@/lib/types';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
  onSave: (updates: Partial<Profile>) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave
}) => {
  const [formData, setFormData] = useState({
    name: profile.name,
    age: profile.age.toString(),
    email: profile.email,
    birthday: profile.birthday,
    homeCity: profile.homeCity,
    locationSharing: profile.locationSharing,
    mode: profile.mode
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: formData.name,
      age: parseInt(formData.age),
      email: formData.email,
      birthday: formData.birthday,
      homeCity: formData.homeCity,
      locationSharing: formData.locationSharing,
      mode: formData.mode as 'Local' | 'Traveler'
    });
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md rounded-3xl p-6 relative"
        style={{ backgroundColor: 'var(--surface-white)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X size={24} style={{ color: 'var(--text-muted)' }} />
        </button>

        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl border-2 outline-none focus:border-blue-400 transition-colors"
              style={{ 
                backgroundColor: 'var(--surface-white)',
                borderColor: 'var(--border-default)',
                color: 'var(--text-primary)'
              }}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
              Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl border-2 outline-none focus:border-blue-400 transition-colors"
              style={{ 
                backgroundColor: 'var(--surface-white)',
                borderColor: 'var(--border-default)',
                color: 'var(--text-primary)'
              }}
              required
              min="1"
              max="120"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl border-2 outline-none focus:border-blue-400 transition-colors"
              style={{ 
                backgroundColor: 'var(--surface-white)',
                borderColor: 'var(--border-default)',
                color: 'var(--text-primary)'
              }}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
              Birthday
            </label>
            <input
              type="text"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              placeholder="MM/DD/YY"
              className="w-full px-4 py-3 rounded-2xl border-2 outline-none focus:border-blue-400 transition-colors"
              style={{ 
                backgroundColor: 'var(--surface-white)',
                borderColor: 'var(--border-default)',
                color: 'var(--text-primary)'
              }}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
              Home City
            </label>
            <input
              type="text"
              name="homeCity"
              value={formData.homeCity}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl border-2 outline-none focus:border-blue-400 transition-colors"
              style={{ 
                backgroundColor: 'var(--surface-white)',
                borderColor: 'var(--border-default)',
                color: 'var(--text-primary)'
              }}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
              Location Sharing
            </label>
            <select
              name="locationSharing"
              value={formData.locationSharing}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl border-2 outline-none focus:border-blue-400 transition-colors"
              style={{ 
                backgroundColor: 'var(--surface-white)',
                borderColor: 'var(--border-default)',
                color: 'var(--text-primary)'
              }}
              required
            >
              <option value="Indefinitely">Indefinitely</option>
              <option value="1 Day">1 Day</option>
              <option value="3 Days">3 Days</option>
              <option value="1 Week">1 Week</option>
              <option value="1 Month">1 Month</option>
              <option value="Never">Never</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
              Mode
            </label>
            <select
              name="mode"
              value={formData.mode}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl border-2 outline-none focus:border-blue-400 transition-colors"
              style={{ 
                backgroundColor: 'var(--surface-white)',
                borderColor: 'var(--border-default)',
                color: 'var(--text-primary)'
              }}
              required
            >
              <option value="Local">Local</option>
              <option value="Traveler">Traveler</option>
            </select>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-3xl border-2 font-semibold transition-all active:scale-[0.98]"
              style={{ 
                borderColor: 'var(--border-default)',
                color: 'var(--text-secondary)'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 rounded-3xl font-semibold text-white shadow-[0_4px_20px_rgba(96,165,250,0.3)] hover:shadow-[0_4px_25px_rgba(96,165,250,0.4)] active:scale-[0.98] transition-all"
              style={{ backgroundColor: 'rgba(96,165,250,0.3)' }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

