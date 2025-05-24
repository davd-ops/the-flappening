import React from 'react';
import { ComparisonCoin } from '../utils/helper';

interface ComparisonSelectorProps {
  selectedCoin: ComparisonCoin;
  onChange: React.Dispatch<React.SetStateAction<ComparisonCoin>>;
  disabled?: boolean;
}

export const ComparisonSelector: React.FC<ComparisonSelectorProps> = ({
  selectedCoin,
  onChange,
  disabled = false
}) => {
  const comparisons = [
    { id: 'doge', name: 'DOGE', color: 'bg-secondary-jasmine/20', image: '/dogecoin.png' },
    { id: 'shiba', name: 'SHIBA', color: 'bg-secondary-coral/20', image: '/shiba.png' },
    { id: 'pepe', name: 'PEPE', color: 'bg-secondary-mint/20', image: '/pepecoin.png' },
    { id: 'usd', name: 'USD', color: 'bg-primary-sky/20', image: '/usd.png' }
  ];
  
  return (
    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1 bg-primary-sky/5 rounded-lg p-1">
      {comparisons.map((coin) => (
        <button
          key={coin.id}
          className={`px-2 sm:px-3 py-1 sm:py-1.5 text-[18px] sm:text-[28px] font-fobble rounded-md transition-all duration-200 flex items-center gap-1 sm:gap-2 ${
            selectedCoin === coin.id
              ? `${coin.color} text-primary-crayola shadow-sm` 
              : 'text-primary-oxford/60 hover:bg-white/50'
          }`}
          onClick={() => onChange(coin.id as ComparisonCoin)}
          disabled={disabled}
        >
          <img src={coin.image} alt={`${coin.name} logo`} className="w-4 h-4 sm:w-6 sm:h-6" />
          {coin.name}
        </button>
      ))}
    </div>
  );
};