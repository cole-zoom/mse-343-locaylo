'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { X, Camera, User, ChevronRight } from 'lucide-react';
import { useProfile } from '@/lib/ProfileContext';

export default function EditProfilePage() {
  const router = useRouter();
  const { profile, updateProfile } = useProfile();
  
  const [formData, setFormData] = useState({
    name: profile.name,
    age: profile.age.toString(),
    email: profile.email,
    birthday: profile.birthday,
    homeCity: profile.homeCity,
    locationSharing: profile.locationSharing,
    mode: profile.mode,
    languageSpoken: profile.languageSpoken
  });
  const [avatarPreview, setAvatarPreview] = useState<string>(profile.avatar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: formData.name,
      age: parseInt(formData.age),
      email: formData.email,
      birthday: formData.birthday,
      homeCity: formData.homeCity,
      locationSharing: formData.locationSharing,
      mode: formData.mode as 'Local' | 'Traveler',
      avatar: avatarPreview,
      languageSpoken: formData.languageSpoken
    });
    router.back();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveAvatar = () => {
    setAvatarPreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto relative font-sans animate-in slide-in-from-right duration-300 overflow-y-auto">
      <div className="p-6 pb-32">
        <div className="flex justify-between items-center mb-10 pt-6">
          <h2 className="text-2xl font-bold text-black">Edit Profile</h2>
          <button onClick={() => router.back()} className="p-2 rounded-full bg-white hover:bg-gray-100 transition-colors">
            <X size={24} className="text-gray-900" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative group">
              <div 
                onClick={handleAvatarClick}
                className="w-40 h-40 rounded-full bg-white border-4 border-gray-200 flex items-center justify-center overflow-hidden cursor-pointer relative shadow-md"
              >
                {avatarPreview ? (
                  <img 
                    src={avatarPreview} 
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={56} className="text-gray-400" />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera size={36} className="text-white" />
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            <div className="flex gap-2 mt-4">
              <button
                type="button"
                onClick={handleAvatarClick}
                className="text-sm font-bold px-5 py-2.5 rounded-3xl transition-all shadow-sm hover:shadow-md text-gray-900"
                style={{ backgroundColor: 'rgba(96,165,250,0.3)' }}
              >
                Upload Photo
              </button>
              {avatarPreview && (
                <button
                  type="button"
                  onClick={handleRemoveAvatar}
                  className="text-sm font-bold px-5 py-2.5 rounded-3xl transition-all shadow-sm hover:shadow-md bg-white border border-gray-300 text-red-600 hover:bg-red-50"
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 px-4 text-sm font-medium focus:outline-none focus:border-gray-300 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 px-4 text-sm font-medium focus:outline-none focus:border-gray-300 transition-all"
              required
              min="1"
              max="120"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 px-4 text-sm font-medium focus:outline-none focus:border-gray-300 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Birthday
            </label>
            <input
              type="text"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              placeholder="MM/DD/YY"
              className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 px-4 text-sm font-medium focus:outline-none focus:border-gray-300 transition-all placeholder:text-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Home City
            </label>
            <input
              type="text"
              name="homeCity"
              value={formData.homeCity}
              onChange={handleChange}
              className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 px-4 text-sm font-medium focus:outline-none focus:border-gray-300 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Location & Safety Settings
            </label>
            <button
              type="button"
              onClick={() => router.push('/location-safety')}
              className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 px-4 text-sm font-medium hover:bg-gray-50 transition-all flex items-center justify-between group"
            >
              <span className="text-gray-900">
                {formData.locationSharing}
              </span>
              <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
            </button>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Mode
            </label>
            <select
              name="mode"
              value={formData.mode}
              onChange={handleChange}
              className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 px-4 text-sm font-medium focus:outline-none focus:border-gray-300 transition-all"
              required
            >
              <option value="Local">Local</option>
              <option value="Traveler">Traveler</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Language Spoken
            </label>
            <input
              type="text"
              name="languageSpoken"
              value={formData.languageSpoken}
              onChange={handleChange}
              className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 px-4 text-sm font-medium focus:outline-none focus:border-gray-300 transition-all"
              required
            />
          </div>

          <div className="fixed bottom-8 left-0 right-0 max-w-md mx-auto px-6">
            <button 
              type="submit"
              className="w-full text-gray-900 py-4 rounded-3xl text-lg font-bold shadow-[0_4px_20px_rgba(96,165,250,0.3)] hover:shadow-[0_4px_25px_rgba(96,165,250,0.4)] active:scale-[0.98] transition-all"
              style={{ backgroundColor: 'rgba(96,165,250,0.3)' }}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

