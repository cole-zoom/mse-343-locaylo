'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronDown } from 'lucide-react';
import { useProfile } from '@/lib/ProfileContext';
import { EmergencyContact } from '@/lib/types';

export default function LocationSafetyPage() {
  const router = useRouter();
  const { profile, updateProfile } = useProfile();
  
  const [locationSharing, setLocationSharing] = useState(profile.locationSharing || 'Indefinitely');
  const [shareActivityWithContacts, setShareActivityWithContacts] = useState(profile.shareActivityWithContacts ?? true);
  const [safetyTipsEnabled, setSafetyTipsEnabled] = useState(profile.safetyTipsEnabled ?? true);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>(
    profile.emergencyContacts || []
  );
  const [isEditingContacts, setIsEditingContacts] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleBack = () => {
    // Save changes when going back
    updateProfile({
      locationSharing,
      emergencyContacts,
      shareActivityWithContacts,
      safetyTipsEnabled
    });
    router.back();
  };

  const handleAddContact = () => {
    if (editName.trim() && editPhone.trim()) {
      const newContact: EmergencyContact = {
        id: Date.now().toString(),
        name: editName.trim(),
        phone: editPhone.trim()
      };
      const updatedContacts = [...emergencyContacts, newContact];
      setEmergencyContacts(updatedContacts);
      setEditName('');
      setEditPhone('');
      setIsEditingContacts(false);
    }
  };

  const handleUpdateContact = () => {
    if (editingId && editName.trim() && editPhone.trim()) {
      const updatedContacts = emergencyContacts.map(contact =>
        contact.id === editingId
          ? { ...contact, name: editName.trim(), phone: editPhone.trim() }
          : contact
      );
      setEmergencyContacts(updatedContacts);
      setEditName('');
      setEditPhone('');
      setEditingId(null);
      setIsEditingContacts(false);
    }
  };

  const handleDeleteContact = (id: string) => {
    const updatedContacts = emergencyContacts.filter(contact => contact.id !== id);
    setEmergencyContacts(updatedContacts);
  };

  const startEditContact = (contact: EmergencyContact) => {
    setEditingId(contact.id);
    setEditName(contact.name);
    setEditPhone(contact.phone);
    setIsEditingContacts(true);
  };

  const cancelEdit = () => {
    setEditName('');
    setEditPhone('');
    setEditingId(null);
    setIsEditingContacts(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto relative font-sans">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="flex items-center p-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft size={24} />
            <span className="text-sm font-medium">Profile</span>
          </button>
        </div>
        <div className="px-6 pb-4">
          <h1 className="text-3xl font-bold text-black">Location & Safety</h1>
        </div>
      </div>

      <div className="p-6 space-y-6 pb-32">
        {/* Map Display */}
        <div className="relative w-full h-48 rounded-3xl overflow-hidden shadow-md">
          <div 
            className="w-full h-full"
            style={{
              background: 'linear-gradient(135deg, rgba(156,163,175,0.3) 0%, rgba(209,213,219,0.4) 100%)',
              position: 'relative'
            }}
          >
            {/* Simplified map-like pattern */}
            <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
              {/* Streets */}
              <line x1="0" y1="100" x2="400" y2="100" stroke="white" strokeWidth="3" opacity="0.6" />
              <line x1="200" y1="0" x2="200" y2="200" stroke="white" strokeWidth="3" opacity="0.6" />
              <line x1="0" y1="50" x2="400" y2="50" stroke="white" strokeWidth="2" opacity="0.4" />
              <line x1="0" y1="150" x2="400" y2="150" stroke="white" strokeWidth="2" opacity="0.4" />
              <line x1="100" y1="0" x2="100" y2="200" stroke="white" strokeWidth="2" opacity="0.4" />
              <line x1="300" y1="0" x2="300" y2="200" stroke="white" strokeWidth="2" opacity="0.4" />
              
              {/* Green park areas */}
              <rect x="220" y="70" width="70" height="40" fill="rgba(134,239,172,0.5)" rx="5" />
              <rect x="50" y="120" width="60" height="50" fill="rgba(134,239,172,0.4)" rx="5" />
              
              {/* Purple accent areas */}
              <circle cx="80" cy="80" r="25" fill="rgba(196,181,253,0.4)" />
              <circle cx="320" cy="160" r="30" fill="rgba(196,181,253,0.3)" />
            </svg>
            
            {/* Location Pin */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full">
              <svg width="40" height="50" viewBox="0 0 40 50">
                <path
                  d="M20 0C11.178 0 4 7.178 4 16c0 11.25 16 30 16 30s16-18.75 16-30C36 7.178 28.822 0 20 0z"
                  fill="#ef4444"
                />
                <circle cx="20" cy="16" r="6" fill="white" />
              </svg>
            </div>
          </div>
        </div>

        {/* Location Sharing */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-gray-900">
            Location sharing
          </label>
          <div className="relative">
            <select
              value={locationSharing}
              onChange={(e) => setLocationSharing(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-200 rounded-2xl py-3.5 px-4 pr-10 text-sm font-medium focus:outline-none focus:border-gray-300 transition-all cursor-pointer"
            >
              <option value="Indefinitely">Indefinitely</option>
              <option value="1 Day">1 Day</option>
              <option value="3 Days">3 Days</option>
              <option value="1 Week">1 Week</option>
              <option value="1 Month">1 Month</option>
              <option value="Never">Never</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
          </div>
          <p className="text-sm text-gray-600">
            Sharing with: {profile.sharingWith || 'Nobody'}
          </p>
        </div>

        {/* Emergency Contacts */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-bold text-gray-900">
              Emergency Contacts:
            </label>
            {!isEditingContacts && (
              <button
                onClick={() => setIsEditingContacts(true)}
                className="text-sm font-bold underline text-gray-900 hover:text-gray-700 transition-colors"
              >
                Edit
              </button>
            )}
          </div>

          {/* Contact List */}
          <div className="space-y-2">
            {emergencyContacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl py-3 px-4"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                  <p className="text-sm text-gray-600">{contact.phone}</p>
                </div>
                {isEditingContacts && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditContact(contact)}
                      className="text-xs font-bold px-3 py-1.5 rounded-xl transition-all bg-gray-100 hover:bg-gray-200 text-gray-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteContact(contact.id)}
                      className="text-xs font-bold px-3 py-1.5 rounded-xl transition-all bg-red-100 hover:bg-red-200 text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Add/Edit Contact Form */}
          {isEditingContacts && (
            <div className="bg-white border-2 border-gray-300 rounded-2xl p-4 space-y-3">
              <h3 className="text-sm font-bold text-gray-900">
                {editingId ? 'Edit Contact' : 'Add New Contact'}
              </h3>
              <input
                type="text"
                placeholder="Name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-3 text-sm font-medium focus:outline-none focus:border-gray-300 transition-all"
              />
              <input
                type="tel"
                placeholder="Phone (+1-XXX-XXX-XXXX)"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-3 text-sm font-medium focus:outline-none focus:border-gray-300 transition-all"
              />
              <div className="flex gap-2">
                <button
                  onClick={editingId ? handleUpdateContact : handleAddContact}
                  className="flex-1 text-sm font-bold py-2.5 rounded-2xl transition-all shadow-sm hover:shadow-md text-gray-900"
                  style={{ backgroundColor: 'rgba(96,165,250,0.3)' }}
                >
                  {editingId ? 'Update' : 'Add'}
                </button>
                <button
                  onClick={cancelEdit}
                  className="flex-1 text-sm font-bold py-2.5 rounded-2xl transition-all shadow-sm hover:shadow-md bg-white border border-gray-300 text-gray-900"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Toggle Switches */}
        <div className="space-y-4">
          {/* Share Activity Details */}
          <div className="flex items-start justify-between gap-4">
            <label className="text-sm font-medium text-gray-900 flex-1">
              Share my activity details with emergency contacts
            </label>
            <button
              onClick={() => setShareActivityWithContacts(!shareActivityWithContacts)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none ${
                shareActivityWithContacts ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  shareActivityWithContacts ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Safety Tips */}
          <div className="flex items-start justify-between gap-4">
            <label className="text-sm font-medium text-gray-900 flex-1">
              Give me safety tips before each activity
            </label>
            <button
              onClick={() => setSafetyTipsEnabled(!safetyTipsEnabled)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none ${
                safetyTipsEnabled ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  safetyTipsEnabled ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

