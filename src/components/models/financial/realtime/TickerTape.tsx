'use client';

import { useState, useEffect } from 'react';
import { RealtimePrice } from '@/types/financial';

interface TickerTapeProps {
  data: RealtimePrice[];
  speed?: 'slow' | 'medium' | 'fast';
  height?: number;
  backgroundColor?: string;
}

export default function TickerTape({
  data,
  speed = 'medium',
  height = 60,
  backgroundColor = 'bg-gray-900 dark:bg-gray-800'
}: TickerTapeProps) {
  const [isPaused, setIsPaused] = useState(false);

  const speedSettings = {
    slow: '60s',
    medium: '40s',
    fast: '25s'
  };

  if (!data.length) return null;

  return (
    <div 
      className={`overflow-hidden ${backgroundColor}`}
      style={{ height }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div 
        className="flex items-center space-x-8 animate-scroll"
        style={{
          animationDuration: speedSettings[speed],
          animationPlayState: isPaused ? 'paused' : 'running',
          width: 'max-content'
        }}
      >
        {/* Duplicate data for seamless scrolling */}
        {[...data, ...data].map((item, index) => (
          <div key={`${item.symbol}-${index}`} className="flex items-center space-x-2 whitespace-nowrap">
            <span className="text-white font-medium">{item.symbol}</span>
            <span className="text-white font-mono">${item.price.toFixed(2)}</span>
            <span className={`font-mono text-sm ${
              item.change >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {item.change >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll linear infinite;
        }
      `}</style>
    </div>
  );
}