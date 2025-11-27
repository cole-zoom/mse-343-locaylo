'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PhonePage() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showError, setShowError] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    if (value.length <= 10) {
      setPhoneNumber(value);
      if (showError && value.length === 10) {
        setShowError(false);
      }
    }
  };

  const handleContinue = () => {
    if (phoneNumber.length === 10) {
      // Store phone number in sessionStorage or pass via URL params
      sessionStorage.setItem('phoneNumber', phoneNumber);
      router.push('/otp');
    } else {
      setShowError(true);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleContinue();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [phoneNumber, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto relative font-sans animate-in slide-in-from-right duration-300">
      <div className="flex-1 px-8 pt-24 pb-8 flex flex-col">
        <h2 className="text-3xl font-extrabold mb-12">Log In</h2>
        
        <div className="w-full mb-2">
          <label className="block text-gray-900 text-base font-semibold mb-4">Mobile Number</label>
          <div className="w-full bg-white rounded-xl p-4 text-xl font-normal tracking-wide flex items-center border-2 border-gray-300 focus-within:border-gray-400 transition-all">
            <span className="text-gray-900 mr-2">(+1)</span>
            <input
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="0000000000"
              className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-300"
              maxLength={10}
            />
          </div>
        </div>

        {showError && (
          <p className="text-red-500 text-sm mb-4">Please enter your full number</p>
        )}

        <button 
          onClick={handleContinue}
          className="w-full py-4 rounded-3xl text-lg font-bold transition-all text-gray-900 cursor-pointer active:scale-[0.98] mt-4 shadow-[0_4px_20px_rgba(96,165,250,0.3)] hover:shadow-[0_4px_25px_rgba(96,165,250,0.4)]"
          style={{ backgroundColor: 'rgba(96,165,250,0.3)' }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

