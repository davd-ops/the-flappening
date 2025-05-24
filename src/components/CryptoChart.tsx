import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { fetchCryptoData, getCoinId } from '../services/cryptoService';
import { TimeRangeSelector } from './TimeRangeSelector';
import { formatMarketCap, calculatePercentChange, calculateXMultiplier, formatXMultiplier, formatPrice } from '../utils/formatters';
import { ComparisonCoin } from './ClientApp';

type TimeRange = '30d' | '90d' | '180d' | '365d';

const COIN_COLORS = {
  doge: 'bg-secondary-jasmine/20',
  shiba: 'bg-secondary-coral/20',
  pepe: 'bg-secondary-mint/20',
  usd: 'bg-primary-sky/20'
};

interface CryptoChartProps {
  selectedCoin: ComparisonCoin;
}

const CryptoChart: React.FC<CryptoChartProps> = ({ selectedCoin }) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [timeRange, setTimeRange] = useState<TimeRange>('90d');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [currentStats, setCurrentStats] = useState<{
    pengu: number | null;
    comparison: number | null;
    penguChange: number | null;
    comparisonChange: number | null;
    xMultiplier: number | null;
  }>({
    pengu: null,
    comparison: null,
    penguChange: null,
    comparisonChange: null,
    xMultiplier: null,
  });

  useEffect(() => {
    setCurrentStats(prev => ({
      ...prev,
      comparison: null,
      comparisonChange: null,
      xMultiplier: null,
    }));
    setChartData([]);
    setIsLoading(true);

    const loadData = async () => {
      try {
        setError(null);
        
        const days = 
          timeRange === '30d' ? 30 : 
          timeRange === '90d' ? 90 : 
          timeRange === '180d' ? 180 : 
          timeRange === '365d' ? 365 : 90;
        
        const [penguData, comparisonData] = await Promise.all([
          fetchCryptoData('pudgy-penguins', days),
          fetchCryptoData(getCoinId(selectedCoin), days)
        ]);

        const isUSDComparison = selectedCoin === 'usd';
        const penguDataPoints = isUSDComparison ? penguData.prices : penguData.market_caps;
        const comparisonDataPoints = isUSDComparison ? comparisonData.prices : comparisonData.market_caps;
        
        if (!penguDataPoints || !comparisonDataPoints) {
          throw new Error(`Failed to fetch ${isUSDComparison ? 'price' : 'market cap'} data`);
        }

        const combinedData = penguDataPoints.map((item: [number, number], index: number) => {
          const timestamp = item[0];
          const penguValue = item[1];
          const comparisonValue = index < comparisonDataPoints.length ? comparisonDataPoints[index][1] : null;
          const xMultiplier = comparisonValue && penguValue ? comparisonValue / penguValue : null;
          
          return {
            timestamp,
            date: format(new Date(timestamp), 'MMM dd'),
            xMultiplier,
          };
        });

        setChartData(combinedData);
        
        if (penguDataPoints.length > 0 && comparisonDataPoints.length > 0) {
          const currentPenguValue = penguDataPoints[penguDataPoints.length - 1][1];
          const currentComparisonValue = comparisonDataPoints[comparisonDataPoints.length - 1][1];
          const startPenguValue = penguDataPoints[0][1];
          const startComparisonValue = comparisonDataPoints[0][1];
          
          setCurrentStats({
            pengu: currentPenguValue,
            comparison: currentComparisonValue,
            penguChange: calculatePercentChange(startPenguValue, currentPenguValue),
            comparisonChange: calculatePercentChange(startComparisonValue, currentComparisonValue),
            xMultiplier: calculateXMultiplier(currentPenguValue, currentComparisonValue),
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error fetching crypto data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [timeRange, selectedCoin, retryCount]);

  const handleRetry = () => {
    setRetryCount(count => count + 1);
  };

  const renderValueChange = (change: number | null, isLoading: boolean) => {
    if (isLoading) {
      return (
        <span className="inline-block animate-pulse bg-gray-200 rounded h-[24px] sm:h-[28px] w-[60px] sm:w-[80px]"></span>
      );
    }
    
    if (change === null) return null;
    
    const Icon = change >= 0 ? ArrowUpIcon : ArrowDownIcon;
    const colorClass = change >= 0 ? 'text-[#34d399]' : 'text-secondary-coral';
    
    return (
      <span className={`flex items-center ${colorClass} font-fobble text-[18px] sm:text-[28px] font-bold`}>
        <Icon size={18} className="sm:w-6 sm:h-6" />
        {Math.abs(change).toFixed(2)}%
      </span>
    );
  };

  // leave 10% buffer on Y-axis
  const getYAxisDomain = () => {
    if (!chartData.length) return [0, 1];
    
    const multipliers = chartData
      .map(d => d.xMultiplier)
      .filter((x): x is number => x !== null);
    
    if (!multipliers.length) return [0, 1];
    
    const minValue = Math.min(...multipliers);
    const maxValue = Math.max(...multipliers);
    const range = maxValue - minValue;
    
    const buffer = range * 0.1;
    return [
      Math.max(0, minValue - buffer),
      maxValue + buffer
    ];
  };

  if (error) {
    return (
      <div className="bg-secondary-coral/10 border border-secondary-coral/20 text-primary-oxford rounded-lg p-4 my-4">
        <h3 className="text-[32px] sm:text-[46px] font-tt-trailers">Error loading chart data</h3>
        <p className="text-[20px] sm:text-[28px] font-menco">{error}</p>
        <button 
          onClick={handleRetry} 
          className="mt-2 px-4 py-2 bg-secondary-coral/20 hover:bg-secondary-coral/30 rounded-md transition-colors font-fobble text-[20px] sm:text-[28px]"
        >
          Try Again
        </button>
      </div>
    );
  }

  const isUSDComparison = selectedCoin === 'usd';
  const formatValue = isUSDComparison ? formatPrice : formatMarketCap;

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full">
      <div className="mb-2 sm:mb-4">
        <h2 className="text-[64px] sm:text-[100px] md:text-[142px] leading-none font-tt-trailers text-primary-oxford" 
           style={{
             WebkitTextStroke: '1px #000',
             textShadow: '2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
             color: 'white',
             letterSpacing: '-0.02em'
           }}>
          PENGU VS {selectedCoin.toUpperCase()}
        </h2>
      </div>
      
      {/* Desktop: Flappening text and time selector on same line */}
      <div className="hidden sm:flex items-center justify-between mb-6">
        <p className="text-[36px] md:text-[46px] font-tt-trailers text-primary-oxford">
          {isLoading ? (
            <span className="inline-block animate-pulse bg-gray-200 rounded h-[36px] sm:h-[46px] w-[60px] sm:w-[70px]"></span>
          ) : (
            currentStats.xMultiplier ? formatXMultiplier(currentStats.xMultiplier) : '—'
          )} until PENGU flaps {selectedCoin.toUpperCase()}
        </p>
        <TimeRangeSelector 
          timeRange={timeRange} 
          onChange={setTimeRange}
          disabled={isLoading}
        />
      </div>
      
      {/* Mobile: Flappening text below title */}
      <div className="sm:hidden mb-2">
        <p className="text-[20px] font-tt-trailers text-primary-oxford">
          {isLoading ? (
            <span className="inline-block animate-pulse bg-gray-200 rounded h-[20px] w-[60px]"></span>
          ) : (
            currentStats.xMultiplier ? formatXMultiplier(currentStats.xMultiplier) : '—'
          )} until PENGU flaps {selectedCoin.toUpperCase()}
        </p>
      </div>
      
      {/* Mobile: Time selector in its own container */}
      <div className="sm:hidden flex justify-end mb-4">
        <TimeRangeSelector 
          timeRange={timeRange} 
          onChange={setTimeRange}
          disabled={isLoading}
        />
      </div>
      
      {/* Market cap cards - now in a 2-column grid on all screen sizes */}
      <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-primary-sky/10 p-2 sm:p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-[16px] sm:text-[20px] md:text-[28px] font-fobble text-primary-oxford/70">PENGU</span>
            {renderValueChange(currentStats.penguChange, isLoading)}
          </div>
          <p className="text-[20px] sm:text-[28px] md:text-[46px] font-tt-trailers text-primary-oxford truncate">
            {isLoading ? (
              <span className="inline-block animate-pulse bg-gray-200 rounded h-[28px] sm:h-[36px] w-[80px] sm:w-[120px]"></span>
            ) : (
              currentStats.pengu ? formatValue(currentStats.pengu) : '—'
            )}
          </p>
        </div>
        
        <div className={`${COIN_COLORS[selectedCoin]} p-2 sm:p-4 rounded-lg`}>
          <div className="flex justify-between items-center">
            <span className="text-[16px] sm:text-[20px] md:text-[28px] font-fobble text-primary-oxford/70">{selectedCoin.toUpperCase()}</span>
            {renderValueChange(currentStats.comparisonChange, isLoading)}
          </div>
          <p className="text-[20px] sm:text-[28px] md:text-[46px] font-tt-trailers text-primary-oxford truncate">
            {isLoading ? (
              <span className="inline-block animate-pulse bg-gray-200 rounded h-[28px] sm:h-[36px] w-[80px] sm:w-[120px]"></span>
            ) : (
              currentStats.comparison ? formatValue(currentStats.comparison) : '—'
            )}
          </p>
        </div>
      </div>
      
      <div className="h-60 sm:h-80 w-full">
        {isLoading ? (
          <div className="h-full w-full flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-4 border-primary-crayola border-t-transparent animate-spin mb-4"></div>
              <p className="text-[20px] sm:text-[28px] text-primary-oxford/60 font-fobble">Loading data...</p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#00142d', fontFamily: 'Menco', fontSize: 12 }} 
                tickLine={{ stroke: '#00142d' }}
                axisLine={{ stroke: '#00142d' }}
                interval={Math.floor(chartData.length / 12)}
              />
              <YAxis 
                dataKey="xMultiplier"
                domain={getYAxisDomain()}
                tickFormatter={(value) => `${value.toFixed(1)}x`}
                tick={{ fill: '#00142d', fontFamily: 'Menco', fontSize: 12 }}
                tickLine={{ stroke: '#00142d' }}
                axisLine={{ stroke: '#00142d' }}
                width={50}
                reversed={true}
                ticks={(() => {
                  const [min, max] = getYAxisDomain();
                  const step = (max - min) / 8; // Show 9 ticks (8 intervals)
                  return Array.from({ length: 9 }, (_, i) => min + step * i);
                })()}
              />
              <Tooltip 
                formatter={(value: number) => [`${value.toFixed(2)}x`, 'Until Flappening']}
                labelFormatter={(label) => `Date: ${label}`}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  border: 'none',
                  borderRadius: '8px',
                  color: '#00142d',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  fontFamily: 'Menco',
                  fontSize: '14px'
                }}
              />
              <Line
                type="monotone"
                dataKey="xMultiplier"
                name="X Until Flappening"
                stroke="#477dfd"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: '#477dfd', stroke: '#80abff', strokeWidth: 2 }}
                animationDuration={500}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default CryptoChart;