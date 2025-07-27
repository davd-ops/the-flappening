import React from 'react';
import { TimeRange } from '../utils/helper';

interface TimeRangeSelectorProps {
  timeRange: TimeRange;
  onChange: (range: TimeRange) => void;
  disabled?: boolean;
}

export const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({ 
  timeRange, 
  onChange,
  disabled = false
}) => {
  const ranges: TimeRange[] = ['30d', '90d', '180d'];
  
  return (
    <div className="flex items-center space-x-1 bg-primary-sky/5 rounded-lg p-1">
      {ranges.map((range) => (
        <button
          key={range}
          className={`px-2 sm:px-3 py-1 sm:py-1.5 text-[18px] sm:text-[28px] font-fobble rounded-md transition-all duration-200 ${
            timeRange === range 
              ? 'bg-white text-primary-crayola shadow-sm' 
              : 'text-primary-oxford/60 hover:bg-white/50'
          }`}
          onClick={() => onChange(range)}
          disabled={disabled}
        >
          {range}
        </button>
      ))}
    </div>
  );
};