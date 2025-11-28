'use client';

import React from 'react';
import { X } from 'lucide-react';

interface FilterTagProps {
  label: string;
  onRemove: () => void;
}

export function FilterTag({ label, onRemove }: FilterTagProps) {
  return (
    <div 
      className="inline-flex items-center gap-2 px-4 py-2 rounded-3xl border border-gray-300 bg-white shadow-sm transition-all hover:shadow-md"
    >
      <span className="text-sm font-semibold text-gray-900">{label}</span>
      <button
        onClick={onRemove}
        className="hover:bg-gray-100 rounded-full p-0.5 transition-colors"
        aria-label={`Remove ${label} filter`}
      >
        <X size={16} className="text-gray-600" strokeWidth={2.5} />
      </button>
    </div>
  );
}

