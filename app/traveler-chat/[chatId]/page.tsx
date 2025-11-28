'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ChevronLeft, Paperclip, Send } from 'lucide-react';
import { TravelerNav } from '../../ui/TravelerNav';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
}

interface ChatData {
  id: string;
  name: string;
  avatar: string;
  activity: string;
  date: string;
  initialMessages: Message[];
}

const mockChatData: Record<string, ChatData> = {
  '1': {
    id: '1',
    name: 'Maria Garcia',
    avatar: '👩🏽',
    activity: 'Sunset Beach Walk - 11/28/25, 17:00 - 18:30',
    date: '11/28/25, 17:00 - 18:30',
    initialMessages: [
      { id: 'm1', text: 'Hi! Looking forward to the beach walk!', sender: 'other', timestamp: new Date('2025-11-27T14:30:00') },
      { id: 'm2', text: 'Me too! Should be a beautiful sunset', sender: 'user', timestamp: new Date('2025-11-27T14:35:00') },
      { id: 'm3', text: 'Definitely! See you there tomorrow!', sender: 'other', timestamp: new Date('2025-11-27T14:40:00') },
    ],
  },
  '2': {
    id: '2',
    name: 'Chen Wei ✅',
    avatar: '👨🏻',
    activity: 'Street Food Tour ✅- 11/29/25, 19:00 - 21:00',
    date: '11/29/25, 19:00 - 21:00',
    initialMessages: [
      
    ],
  },
  '3': {
    id: '3',
    name: 'Aisha Mohammed',
    avatar: '👩🏾',
    activity: 'Art Gallery Visit - 11/30/25, 14:00 - 16:00',
    date: '11/30/25, 14:00 - 16:00',
    initialMessages: [
      { id: 'm1', text: 'The gallery has an amazing new exhibit!', sender: 'other', timestamp: new Date('2025-11-29T18:00:00') },
      { id: 'm2', text: 'I heard! Really excited to see it', sender: 'user', timestamp: new Date('2025-11-29T18:10:00') },
    ],
  },
  '4': {
    id: '4',
    name: 'Lucas Silva',
    avatar: '👨🏽‍🦱',
    activity: 'Hiking Trail - 11/20/25, 08:00 - 12:00',
    date: '11/20/25, 08:00 - 12:00',
    initialMessages: [
      { id: 'm1', text: 'That hike was incredible!', sender: 'other', timestamp: new Date('2025-11-20T13:00:00') },
      { id: 'm2', text: 'Agreed! Thanks for the great trail recommendation', sender: 'user', timestamp: new Date('2025-11-20T13:05:00') },
    ],
  },
  '5': {
    id: '5',
    name: 'Emma Johnson',
    avatar: '👩🏼',
    activity: 'Coffee Tasting - 11/15/25, 10:00 - 11:30',
    date: '11/15/25, 10:00 - 11:30',
    initialMessages: [
      { id: 'm1', text: 'Loved the coffee tasting experience!', sender: 'other', timestamp: new Date('2025-11-15T12:00:00') },
      { id: 'm2', text: 'So glad you enjoyed it! Great meeting you', sender: 'user', timestamp: new Date('2025-11-15T12:05:00') },
    ],
  },
};

export default function ChatConversationPage() {
  const router = useRouter();
  const params = useParams();
  const chatId = params.chatId as string;
  const chatData = mockChatData[chatId];

  const [messages, setMessages] = useState<Message[]>(chatData?.initialMessages || []);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!chatData) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--background)' }}>
        <p className="text-xl font-bold" style={{ color: 'var(--text-muted)' }}>Chat not found</p>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: `m${Date.now()}`,
        text: inputText,
        sender: 'user',
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen pb-24 max-w-md mx-auto relative font-sans flex flex-col" style={{ backgroundColor: 'var(--background)' }}>
      {/* Header */}
      <div className="pt-8 px-6 pb-4" style={{ backgroundColor: 'var(--background)' }}>
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={() => router.push('/traveler-chat')}
            className="p-2 -ml-2 transition-all active:scale-[0.95]"
          >
            <ChevronLeft size={32} style={{ color: 'var(--text-primary)' }} />
          </button>
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center text-3xl flex-shrink-0"
            style={{ backgroundColor: 'var(--border-light)' }}
          >
            {chatData.avatar}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>
              {chatData.name}
            </h2>
            <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
              Activity: {chatData.activity}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 px-6 py-4 overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} message-animation`}
            style={{
              animation: index === messages.length - 1 ? 'slideInMessage 0.3s ease-out' : 'none',
            }}
          >
            <div
              className={`max-w-[75%] px-6 py-4 rounded-3xl ${
                message.sender === 'user' 
                  ? 'rounded-br-md' 
                  : 'rounded-bl-md'
              }`}
              style={{
                backgroundColor: message.sender === 'user' 
                  ? 'var(--border-light)' 
                  : 'var(--border-light)',
              }}
            >
              <p className="text-base font-medium leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                {message.text}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="px-6 py-4" style={{ backgroundColor: 'var(--background)' }}>
        <div 
          className="flex items-center gap-3 px-4 py-3 rounded-3xl"
          style={{ backgroundColor: 'var(--border-light)' }}
        >
          <button className="p-2 transition-all active:scale-[0.95]">
            <Paperclip size={24} style={{ color: 'var(--text-muted)' }} />
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 bg-transparent outline-none text-base font-medium"
            style={{ color: 'var(--text-primary)' }}
          />
          <button 
            onClick={handleSendMessage}
            className="p-2 transition-all active:scale-[0.95]"
          >
            <Send size={24} style={{ color: 'var(--text-muted)' }} />
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <TravelerNav current="chat" />

      <style jsx>{`
        @keyframes slideInMessage {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

