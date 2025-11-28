'use client';

import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface NotificationProps {
  message: string;
  onClose: () => void;
  type?: 'error' | 'success';
}

export function Notification({ message, onClose, type = 'error' }: NotificationProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Start fade out animation after 4.5 seconds
    const fadeTimer = setTimeout(() => {
      setIsExiting(true);
    }, 4500);

    // Close notification after fade out completes (5 seconds total)
    const closeTimer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(closeTimer);
    };
  }, [onClose]);

  const isSuccess = type === 'success';
  const bgColor = isSuccess ? 'bg-green-500' : 'bg-red-500';
  const shadowColor = isSuccess 
    ? 'shadow-[0_4px_20px_rgba(34,197,94,0.4)]' 
    : 'shadow-[0_4px_20px_rgba(239,68,68,0.4)]';

  return (
    <div 
      className={`fixed bottom-24 right-6 z-50 transition-all duration-500 ${
        isExiting 
          ? 'opacity-0 translate-x-8' 
          : 'opacity-100 translate-x-0 animate-in slide-in-from-right'
      }`}
      style={{ maxWidth: 'calc(100vw - 3rem)' }}
    >
      <div 
        className={`${bgColor} text-white px-5 py-4 rounded-2xl ${shadowColor} flex items-center gap-3 min-w-[280px]`}
      >
        {isSuccess ? (
          <CheckCircle size={20} className="flex-shrink-0" />
        ) : (
          <AlertCircle size={20} className="flex-shrink-0" />
        )}
        <span className="text-sm font-semibold">{message}</span>
      </div>
    </div>
  );
}

