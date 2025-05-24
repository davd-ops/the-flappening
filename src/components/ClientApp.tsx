'use client';

import React, { useState } from 'react';
import CryptoChart from './CryptoChart';
import { ComparisonSelector } from './ComparisonSelector';
import { ComparisonCoin } from '../utils/helper';

export default function ClientApp() {
  const [selectedCoin, setSelectedCoin] = useState<ComparisonCoin>('doge');

  return (
    <div className="min-h-screen bg-primary-sky/10">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <div className="flex items-center">
              <img src="/pengu_hexagon.png" alt="Pengu Logo" className="h-12 w-12 sm:h-16 sm:w-16 -mt-1" />
              <h1 className="text-[32px] sm:text-[46px] font-tt-trailers text-primary-oxford ml-3 sm:ml-4">The Flappening</h1>
            </div>
          </div>
          <ComparisonSelector 
            selectedCoin={selectedCoin}
            onChange={setSelectedCoin}
          />
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <CryptoChart selectedCoin={selectedCoin} />
          
          <div className="mt-8 bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h2 className="text-[32px] sm:text-[46px] font-tt-trailers text-primary-oxford mb-4">About The Flappening</h2>
            <p className="text-[20px] sm:text-[28px] font-menco text-primary-oxford/80 mb-3">
              The Flappening tracks PENGU's journey to become the world's leading memecoin by market cap. Watch in real-time as PENGU's market value approaches and potentially surpasses the biggest memecoins like DOGE, SHIBA, and PEPE.
            </p>
            <p className="text-[20px] sm:text-[28px] font-menco text-primary-oxford/80">
              Use the time range selector above the chart to view different time periods, or choose a different coin for comparison. All market data is automatically updated every hour via CoinGecko.
            </p>
          </div>
        </div>
      </main>
      
      <footer className="border-t border-secondary-white/20 mt-12 py-8 bg-white/50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col items-center gap-2">
            <p className="text-[20px] sm:text-[28px] font-menco text-primary-oxford/60 text-center">
              © 2025 The Flappening.{' '}
              Built by{' '}
              <a 
                href="https://x.com/davidbailey_eth" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary-crayola hover:text-primary-crayola/80 transition-colors"
              >
                David Bailey
              </a>
            </p>
            <p className="text-[16px] sm:text-[20px] font-menco text-primary-oxford/60 text-center">
              Market cap data shown for informational purposes only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}