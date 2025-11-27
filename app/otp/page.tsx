'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function OtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [showError, setShowError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    if (value.length <= 6) {
      setOtp(value);
      if (showError && value.length === 6) {
        setShowError(false);
      }
    }
  };

  const handleVerify = () => {
    if (otp.length === 6) {
      router.push('/role-select');
    } else {
      setShowError(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleVerify();
    }
  };

  const handleBoxClick = () => {
    inputRef.current?.focus();
  };

  // Convert string to array of 6 characters for display
  const displayDigits = Array(6).fill('').map((_, idx) => otp[idx] || '');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto relative font-sans animate-in slide-in-from-right duration-300">
      <div className="flex-1 px-8 pt-24 pb-8 flex flex-col items-center">
        <h2 className="text-3xl font-extrabold mb-3 text-center text-black">Check Your Messages</h2>
        <p className="text-center text-gray-600 text-base mb-12 leading-relaxed">
          We&apos;ve sent a 6-digit confirmation code to<br />Please enter the code below.
        </p>

        {/* Hidden input field */}
        <input
          ref={inputRef}
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          value={otp}
          onChange={handleOtpChange}
          onKeyPress={handleKeyPress}
          className="absolute opacity-0 pointer-events-none"
          maxLength={6}
          autoFocus
        />

        {/* Visual digit boxes */}
        <div className="flex justify-center w-full gap-3 mb-4" onClick={handleBoxClick}>
          {displayDigits.map((digit, idx) => (
            <div 
              key={idx} 
              className="w-14 h-16 border-2 border-gray-300 rounded-xl flex items-center justify-center text-2xl font-semibold bg-white cursor-text"
            >
              {digit || '–'}
            </div>
          ))}
        </div>

        {showError && (
          <p className="text-red-500 text-sm mb-4">Please enter all 6 digits</p>
        )}

        <button 
          onClick={handleVerify}
          className="w-full text-gray-900 py-4 rounded-3xl text-lg font-bold active:scale-[0.98] transition-all mt-8 shadow-[0_4px_20px_rgba(96,165,250,0.3)] hover:shadow-[0_4px_25px_rgba(96,165,250,0.4)]"
          style={{ backgroundColor: 'rgba(96,165,250,0.3)' }}
        >
          Verify
        </button>
      </div>
    </div>
  );
}

