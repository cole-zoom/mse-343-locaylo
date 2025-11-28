'use client';

import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { useActivities } from '@/lib/ActivityContext';
import { DATES } from '@/lib/data';

interface AddActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ACCESSIBILITY_OPTIONS = ['Wheelchair Accessible', 'Visual Impairment', 'Auditory Impairment'];

export const AddActivityModal: React.FC<AddActivityModalProps> = ({ isOpen, onClose }) => {
  const { addActivity } = useActivities();
  const [name, setName] = useState('');
  const [date, setDate] = useState(DATES[26].id); // Default to November 27th, 2025
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [status, setStatus] = useState<'pending' | 'scheduled'>('pending');
  const [accessibilityOptions, setAccessibilityOptions] = useState<string[]>([]);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);

  if (!isOpen) return null;

  const handleAdd = () => {
    if (name && date && startTime && endTime) {
      addActivity({ name, date, startTime, endTime, status });
      // Reset form
      setName('');
      setDate(DATES[26].id);
      setStartTime('');
      setEndTime('');
      setStatus('pending');
      setAccessibilityOptions([]);
      setIsAccessibilityOpen(false);
      onClose();
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

  // Toggle accessibility option
  const toggleAccessibilityOption = (option: string) => {
    if (accessibilityOptions.includes(option)) {
      setAccessibilityOptions(accessibilityOptions.filter(o => o !== option));
    } else {
      setAccessibilityOptions([...accessibilityOptions, option]);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md rounded-3xl p-6 max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: 'var(--background)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-black" style={{ color: 'var(--text-primary)' }}>
            Add Activity
          </h2>
          <button 
            onClick={onClose}
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

          {/* Accessibility Options Field */}
          <div>
            <label 
              className="block text-sm font-bold mb-2"
              style={{ color: 'var(--text-primary)' }}
            >
              Accessibility Options
            </label>
            <div className="relative">
              {/* Dropdown Toggle Button */}
              <button
                type="button"
                onClick={() => setIsAccessibilityOpen(!isAccessibilityOpen)}
                className="w-full p-4 rounded-3xl text-base font-medium focus:outline-none transition-all flex items-center justify-between"
                style={{ 
                  backgroundColor: 'var(--surface-white)',
                  border: '2px solid var(--border-default)',
                  color: accessibilityOptions.length > 0 ? 'var(--text-primary)' : 'var(--text-muted)'
                }}
              >
                <span>
                  {accessibilityOptions.length > 0 
                    ? accessibilityOptions.join(', ')
                    : 'Select accessibility options'
                  }
                </span>
                <ChevronDown 
                  size={20} 
                  className={`transition-transform ${isAccessibilityOpen ? 'rotate-180' : ''}`}
                  style={{ color: 'var(--text-muted)' }}
                />
              </button>

              {/* Dropdown Menu */}
              {isAccessibilityOpen && (
                <div 
                  className="absolute w-full mt-2 rounded-3xl overflow-hidden z-10"
                  style={{ 
                    backgroundColor: 'var(--surface-white)',
                    border: '2px solid var(--border-default)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  {ACCESSIBILITY_OPTIONS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => toggleAccessibilityOption(option)}
                      className="w-full p-4 text-left text-base font-medium transition-all hover:opacity-80 flex items-center gap-3"
                      style={{ 
                        backgroundColor: accessibilityOptions.includes(option) 
                          ? 'var(--primary-blue)' 
                          : 'var(--surface-white)',
                        color: 'var(--text-primary)'
                      }}
                    >
                      {/* Checkbox */}
                      <div 
                        className="w-5 h-5 rounded flex items-center justify-center"
                        style={{ 
                          border: '2px solid var(--border-default)',
                          backgroundColor: accessibilityOptions.includes(option) 
                            ? 'var(--primary-blue-text)' 
                            : 'var(--surface-white)'
                        }}
                      >
                        {accessibilityOptions.includes(option) && (
                          <X size={14} style={{ color: 'var(--surface-white)' }} />
                        )}
                      </div>
                      <span className="capitalize">{option}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
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

          {/* Add Button */}
          <button
            onClick={handleAdd}
            className="w-full py-4 rounded-3xl text-lg font-black transition-all active:scale-[0.98] mt-4"
            style={{ 
              backgroundColor: 'var(--primary-blue)',
              color: 'var(--text-primary)',
              boxShadow: 'var(--button-shadow)'
            }}
          >
            Add Activity
          </button>
        </div>
      </div>
    </div>
  );
};

