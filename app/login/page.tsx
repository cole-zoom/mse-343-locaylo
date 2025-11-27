'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { SocialIcon } from '../ui/SocialIcon';

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 max-w-md mx-auto relative font-sans">
      <div className="flex-1 flex flex-col justify-center items-center w-full space-y-12">
        <div className="text-center">
          <h1 className="text-6xl font-extrabold mb-4 tracking-tight text-black">Locaylo</h1>
          <p className="text-black font-normal italic text-xl leading-tight">
            Real people. Real places.<br/>Real travel.
          </p>
        </div>

        <div className="w-full space-y-4 px-4">
          <button 
            onClick={() => router.push('/phone')}
            className="w-full bg-white py-5 rounded-3xl text-2xl font-bold text-black shadow-[0_4px_20px_rgba(96,165,250,0.3)] hover:shadow-[0_4px_25px_rgba(96,165,250,0.4)] active:scale-[0.98] transition-all"
          >
            Log In
          </button>
          <button 
            onClick={() => router.push('/phone')}
            className="w-full bg-white py-5 rounded-3xl text-2xl font-bold text-black shadow-[0_4px_20px_rgba(96,165,250,0.3)] hover:shadow-[0_4px_25px_rgba(96,165,250,0.4)] active:scale-[0.98] transition-all"
          >
            Sign Up
          </button>
        </div>

        <div className="w-full text-center space-y-8">
          <p className="text-gray-500 font-normal text-base">or continue with</p>
          <div className="flex justify-center gap-8">
            <SocialIcon type="google" onClick={() => router.push('/phone')} />
            <SocialIcon type="facebook" onClick={() => router.push('/phone')} />
            <SocialIcon type="apple" onClick={() => router.push('/phone')} />
          </div>
        </div>
      </div>
    </div>
  );
}

