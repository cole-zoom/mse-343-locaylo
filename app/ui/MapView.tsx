'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Heart, MapPin, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { TravelerActivity } from '@/lib/types';
import { LOCATIONS } from '@/lib/data';

interface MapViewProps {
  selectedLocation: string;
  activities: TravelerActivity[];
  onToggleFavorite: (activityId: string) => void;
  onInterested: (activityId: string, timeSlot: string) => void;
  onLocationSelect: (locationName: string) => void;
}

export function MapView({ selectedLocation, activities, onToggleFavorite, onInterested, onLocationSelect }: MapViewProps) {
  const [selectedActivity, setSelectedActivity] = useState<TravelerActivity | null>(null);
  
  // Zoom and pan state
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [touchDistance, setTouchDistance] = useState(0);

  // Pin coordinates for world map locations
  // Format: { locationName: { left: 'X%', top: 'Y%' } }
  // Adjust these coordinates to match the exact positions on your world map image
  const WORLD_MAP_PINS: { [key: string]: { left: string; top: string } } = {
    'Bangkok, Thailand': { left: '74%', top: '60%' },        // Southeast Asia, ~100°E, 14°N
    'Bordeaux, France': { left: '48%', top: '51%' },         // Western Europe, ~0°W, 45°N
    'Barcelona, Spain': { left: '45%', top: '53%' },         // Eastern Spain, ~2°E, 41°N
    'Tokyo, Japan': { left: '86%', top: '53%' },             // Eastern Asia, ~140°E, 36°N
    'New York, USA': { left: '25%', top: '52%' },            // Eastern US, ~74°W, 41°N
    'Rome, Italy': { left: '50%', top: '52%' },              // Central Italy, ~12°E, 42°N
    'Dubai, UAE': { left: '62%', top: '58%' },               // Middle East, ~55°E, 25°N
    'London, UK': { left: '45%', top: '47%' },               // Southern England, ~0°W, 52°N
    'Sydney, Australia': { left: '87%', top: '72%' },        // Eastern Australia, ~151°E, 34°S
    'Amsterdam, Netherlands': { left: '48%', top: '49%' },   // Western Europe, ~5°E, 52°N
    'Berlin, Germany': { left: '52%', top: '50%' },          // Central Europe, ~13°E, 52°N
    'Singapore, Singapore': { left: '76%', top: '65%' },     // Southeast Asia, ~104°E, 1°N
  };

  // Convert location name to image filename
  // Example: "Bangkok, Thailand" -> "bangkokthailand.png"
  const getMapImagePath = (location: string): string => {
    if (!location) {
      return '/maps/worldmap.png';
    }
    
    // Remove spaces, punctuation, and convert to lowercase
    const filename = location
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '') // Remove all non-alphanumeric characters
      + '.png';
    
    return `/maps/${filename}`;
  };

  // Generate pin positions for activities
  // In a real app, these would come from actual lat/long coordinates
  const generatePinPosition = (index: number, total: number) => {
    // Create a deterministic but varied position for each activity
    const seed = index * 137.508; // Golden angle for better distribution
    const angle = seed * (Math.PI / 180);
    const radius = 30 + (index % 3) * 15;
    
    // Center position with offset
    const centerX = 50;
    const centerY = 50;
    
    const x = centerX + Math.cos(angle) * (radius * (index % 2 ? 0.5 : 1));
    const y = centerY + Math.sin(angle) * (radius * (index % 2 ? 0.5 : 1));
    
    // Clamp to keep within bounds
    return {
      left: `${Math.max(10, Math.min(90, x))}%`,
      top: `${Math.max(30, Math.min(80, y))}%`
    };
  };

  const mapImagePath = getMapImagePath(selectedLocation);
  const isWorldView = !selectedLocation;

  // Reset zoom and pan when location changes
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setSelectedActivity(null);
  }, [selectedLocation]);

  // Use native event listeners for wheel and touch events to allow preventDefault
  // React's synthetic events are passive by default in modern browsers
  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container) return;

    const handleNativeWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY * -0.001;
      setScale(prevScale => {
        const newScale = Math.min(Math.max(1, prevScale + delta), 5);
        return newScale;
      });
    };

    const handleNativeTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
      }
    };

    // Add event listeners with { passive: false } to allow preventDefault
    container.addEventListener('wheel', handleNativeWheel, { passive: false });
    container.addEventListener('touchmove', handleNativeTouchMove, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleNativeWheel);
      container.removeEventListener('touchmove', handleNativeTouchMove);
    };
  }, []);

  // Helper function to calculate pan limits based on current scale
  const calculatePanLimits = (currentScale: number) => {
    if (!mapContainerRef.current) return { maxPanX: 0, maxPanY: 0 };
    
    const containerRect = mapContainerRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;
    
    const imageWidth = 1000;
    const imageHeight = 600;
    
    const imageAspect = imageWidth / imageHeight;
    const containerAspect = containerWidth / containerHeight;
    
    let displayWidth, displayHeight;
    if (containerAspect > imageAspect) {
      displayHeight = containerHeight;
      displayWidth = displayHeight * imageAspect;
    } else {
      displayWidth = containerWidth;
      displayHeight = displayWidth / imageAspect;
    }
    
    const scaledWidth = displayWidth * currentScale;
    const scaledHeight = displayHeight * currentScale;
    
    const maxPanX = Math.max(0, (scaledWidth - containerWidth) / 2);
    const maxPanY = Math.max(0, (scaledHeight - containerHeight) / 2);
    
    return { maxPanX, maxPanY };
  };

  // Adjust position when scale changes to stay within bounds
  useEffect(() => {
    const { maxPanX, maxPanY } = calculatePanLimits(scale);
    setPosition(prev => ({
      x: Math.min(Math.max(prev.x, -maxPanX), maxPanX),
      y: Math.min(Math.max(prev.y, -maxPanY), maxPanY)
    }));
  }, [scale]);

  // Handle mouse/touch drag start
  const handleDragStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    setDragStart({ 
      x: clientX - position.x, 
      y: clientY - position.y 
    });
  };

  // Handle mouse/touch drag move
  const handleDragMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    
    const newX = clientX - dragStart.x;
    const newY = clientY - dragStart.y;
    
    // Calculate panning limits based on image dimensions and current scale
    const { maxPanX, maxPanY } = calculatePanLimits(scale);
    
    setPosition({
      x: Math.min(Math.max(newX, -maxPanX), maxPanX),
      y: Math.min(Math.max(newY, -maxPanY), maxPanY)
    });
  };

  // Handle mouse/touch drag end
  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Touch handlers for pinch-to-zoom
  const getTouchDistance = (touches: React.TouchList) => {
    const touch1 = touches[0];
    const touch2 = touches[1];
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      setTouchDistance(getTouchDistance(e.touches));
    } else if (e.touches.length === 1) {
      handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // preventDefault is handled by native event listener
      const newDistance = getTouchDistance(e.touches);
      if (touchDistance > 0) {
        const scaleChange = newDistance / touchDistance;
        const newScale = Math.min(Math.max(1, scale * scaleChange), 5);
        setScale(newScale);
      }
      setTouchDistance(newDistance);
    } else if (e.touches.length === 1) {
      handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    setTouchDistance(0);
    handleDragEnd();
  };

  // Zoom controls
  const zoomIn = () => {
    const newScale = Math.min(scale + 0.5, 5);
    setScale(newScale);
    
    // Adjust position to stay within bounds after zoom
    const { maxPanX, maxPanY } = calculatePanLimits(newScale);
    setPosition(prev => ({
      x: Math.min(Math.max(prev.x, -maxPanX), maxPanX),
      y: Math.min(Math.max(prev.y, -maxPanY), maxPanY)
    }));
  };

  const zoomOut = () => {
    const newScale = Math.max(scale - 0.5, 1);
    setScale(newScale);
    
    // Adjust position to stay within bounds after zoom
    const { maxPanX, maxPanY } = calculatePanLimits(newScale);
    setPosition(prev => ({
      x: Math.min(Math.max(prev.x, -maxPanX), maxPanX),
      y: Math.min(Math.max(prev.y, -maxPanY), maxPanY)
    }));
  };

  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div className="space-y-6">
      {/* Map with pins */}
      <div 
        ref={mapContainerRef}
        className="w-full h-[400px] rounded-3xl border-2 border-white shadow-lg overflow-hidden relative"
        onMouseDown={(e) => handleDragStart(e.clientX, e.clientY)}
        onMouseMove={(e) => handleDragMove(e.clientX, e.clientY)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        {/* Zoomable and pannable container */}
        <div
          className="w-full h-full relative transition-transform duration-100"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: 'center center'
          }}
        >
      <Image
        src={mapImagePath}
        alt={selectedLocation || 'World Map'}
        fill
            className="object-contain pointer-events-none"
        priority
            draggable={false}
      />
          
          {/* Conditional rendering: Location pins for world view, Activity pins for location view */}
          {isWorldView ? (
            /* World View: Show location pins */
            <>
              {LOCATIONS.map((location) => {
                const pinPosition = WORLD_MAP_PINS[location.name];
                if (!pinPosition) return null;
                
                return (
                  <button
                    key={location.id}
                    onClick={() => onLocationSelect(location.name)}
                    className="absolute transform -translate-x-1/2 -translate-y-full hover:scale-110 transition-transform cursor-pointer z-10"
                    style={pinPosition}
                    aria-label={`View activities in ${location.name}`}
                  >
                    <MapPin 
                      size={16} 
                      className="fill-black text-black drop-shadow-lg"
                      strokeWidth={2}
                    />
                  </button>
                );
              })}
            </>
          ) : (
            /* Location View: Show activity pins */
            <>
              {activities.map((activity, index) => {
                const pinPosition = generatePinPosition(index, activities.length);
                return (
                  <button
                    key={activity.id}
                    onClick={() => setSelectedActivity(activity)}
                    className="absolute transform -translate-x-1/2 -translate-y-full hover:scale-110 transition-transform cursor-pointer z-10"
                    style={pinPosition}
                    aria-label={`View ${activity.name}`}
                  >
                    <MapPin 
                      size={16} 
                      className="fill-black text-black drop-shadow-lg"
                      strokeWidth={2}
                    />
                  </button>
                );
              })}
            </>
          )}
        </div>

        {/* Zoom Controls - positioned outside the zoomable container */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              zoomIn();
            }}
            className="p-2 rounded-full transition-all hover:scale-110 active:scale-95"
            style={{ backgroundColor: 'var(--surface-white)', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
            aria-label="Zoom in"
          >
            <ZoomIn size={20} className="text-black" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              zoomOut();
            }}
            className="p-2 rounded-full transition-all hover:scale-110 active:scale-95"
            style={{ backgroundColor: 'var(--surface-white)', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
            aria-label="Zoom out"
          >
            <ZoomOut size={20} className="text-black" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              resetZoom();
            }}
            className="p-2 rounded-full transition-all hover:scale-110 active:scale-95"
            style={{ backgroundColor: 'var(--surface-white)', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
            aria-label="Reset zoom"
          >
            <Maximize2 size={20} className="text-black" />
          </button>
        </div>

        {/* Instruction text overlay */}
        <div className="absolute bottom-0 left-0 right-0 py-3 text-center z-20"
          style={{ backgroundColor: 'rgba(249, 250, 251, 0.95)' }}>
          <p className="text-base font-normal text-black">
            {isWorldView 
              ? 'Tap a pin to explore activities in that location'
              : 'Tap a pin to view activity details'}
          </p>
        </div>
      </div>

      {/* Selected activity card */}
      {selectedActivity && (
        <div 
          className="p-6 rounded-3xl animate-in fade-in"
          style={{ 
            backgroundColor: 'var(--surface-white)',
            border: '1px solid rgba(96,165,250,0.2)',
            boxShadow: '0 4px 20px rgba(96, 165, 250, 0.3)'
          }}
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="text-4xl">{selectedActivity.emoji}</div>
            <div className="flex-1">
              <h4 className="font-bold text-black text-xl mb-1">{selectedActivity.name}</h4>
              <p className="text-base text-black font-normal">
                {selectedActivity.location.split(',')[0]}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(selectedActivity.id);
              }}
              className="hover:scale-110 transition-transform"
            >
              <Heart 
                size={24} 
                className={selectedActivity.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'}
              />
            </button>
          </div>

          <div className="mb-4">
            <p className="text-base font-semibold text-black mb-2">Available time slots</p>
            <div className="flex flex-wrap gap-2">
              {selectedActivity.availableTimeSlots.map((slot, idx) => {
                const [start, end] = slot.split('-');
                const displaySlot = `${start} - ${end}`;
                return (
                  <button
                    key={idx}
                    className="px-4 py-2 rounded-3xl text-sm font-medium transition-all hover:opacity-80"
                    style={{
                      backgroundColor: 'var(--surface-white)',
                      border: '2px solid var(--primary-blue-text)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    {displaySlot}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => {
              onInterested(selectedActivity.id, selectedActivity.availableTimeSlots[0]);
            }}
            className="w-full py-3 rounded-3xl text-base font-medium transition-all hover:opacity-90 active:scale-[0.98]"
            style={{
              backgroundColor: 'var(--primary-blue)',
              color: 'var(--text-primary)'
            }}
          >
            I&apos;m interested
          </button>
        </div>
      )}
    </div>
  );
}

