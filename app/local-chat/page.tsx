'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { LocalNav } from '../ui/LocalNav';

interface ChatPreview {
  id: string;
  name: string;
  avatar: string;
  activity: string;
  date: string;
  status: 'active' | 'past';
}

const mockChats: ChatPreview[] = [
  {
    id: '1',
    name: 'Raj Patel',
    avatar: '👨🏻',
    activity: 'Vineyard Tour',
    date: '10/30/25, 9:00 - 10:00',
    status: 'active',
  },
  {
    id: '2',
    name: 'Sam Smithson',
    avatar: '👨🏻‍🦱',
    activity: 'Pop Concert',
    date: '10/30/25, 23:00 - 00:00',
    status: 'active',
  },
  {
    id: '3',
    name: 'Julie Fox',
    avatar: '👩🏻',
    activity: 'Club Event',
    date: '10/24/25, 00:00 - 02:00',
    status: 'active',
  },
  {
    id: '4',
    name: 'Dominic Juervo',
    avatar: '👨🏽',
    activity: 'Museum Tour',
    date: '10/11/25, 12:00 - 15:00',
    status: 'past',
  },
];

export default function LocalChatPage() {
  const router = useRouter();
  const [activeChatsExpanded, setActiveChatsExpanded] = useState(true);
  const [pastChatsExpanded, setPastChatsExpanded] = useState(true);

  const activeChats = mockChats.filter(chat => chat.status === 'active');
  const pastChats = mockChats.filter(chat => chat.status === 'past');

  const handleChatClick = (chatId: string) => {
    router.push(`/local-chat/${chatId}`);
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
          Chats
        </h2>

        {/* Active Chats Section */}
        <div className="mb-6">
          <button
            onClick={() => setActiveChatsExpanded(!activeChatsExpanded)}
            className="w-full flex justify-between items-center mb-4"
          >
            <h3 className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>
              Active Chats ({activeChats.length})
            </h3>
            {activeChatsExpanded ? (
              <ChevronUp size={28} style={{ color: 'var(--text-primary)' }} />
            ) : (
              <ChevronDown size={28} style={{ color: 'var(--text-primary)' }} />
            )}
          </button>

          {activeChatsExpanded && (
            <div className="space-y-4">
              {activeChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => handleChatClick(chat.id)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl transition-all active:scale-[0.98]"
                  style={{ backgroundColor: 'var(--surface-white)' }}
                >
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center text-4xl flex-shrink-0"
                    style={{ backgroundColor: 'var(--border-light)' }}
                  >
                    {chat.avatar}
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="text-xl font-black mb-1" style={{ color: 'var(--text-primary)' }}>
                      {chat.name}
                    </h4>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      Activity: {chat.activity}
                    </p>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      Date: {chat.date}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Past Chats Section */}
        <div className="mb-6">
          <button
            onClick={() => setPastChatsExpanded(!pastChatsExpanded)}
            className="w-full flex justify-between items-center mb-4"
          >
            <h3 className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>
              Past Chats ({pastChats.length})
            </h3>
            {pastChatsExpanded ? (
              <ChevronUp size={28} style={{ color: 'var(--text-primary)' }} />
            ) : (
              <ChevronDown size={28} style={{ color: 'var(--text-primary)' }} />
            )}
          </button>

          {pastChatsExpanded && (
            <div className="space-y-4">
              {pastChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => handleChatClick(chat.id)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl transition-all active:scale-[0.98]"
                  style={{ backgroundColor: 'var(--surface-white)' }}
                >
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center text-4xl flex-shrink-0"
                    style={{ backgroundColor: 'var(--border-light)' }}
                  >
                    {chat.avatar}
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="text-xl font-black mb-1" style={{ color: 'var(--text-primary)' }}>
                      {chat.name}
                    </h4>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      Activity: {chat.activity}
                    </p>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      Date: {chat.date}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <LocalNav />
    </div>
  );
}

