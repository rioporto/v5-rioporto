import React from 'react';

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({ 
  value, 
  max = 100,
  className = ''
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  return (
    <div 
      className={`progress ${className}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <div 
        className="progress-bar"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};
