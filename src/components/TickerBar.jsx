import React from 'react';

const INDICES = [
  { name: 'NIFTY 50', value: '23,465.60', changePercent: '+0.61%', isPositive: true },
  { name: 'SENSEX', value: '77,150.35', changePercent: '+0.59%', isPositive: true },
  { name: 'BANK NIFTY', value: '50,125.15', changePercent: '-0.22%', isPositive: false },
  { name: 'NIFTY IT', value: '34,920.80', changePercent: '+0.85%', isPositive: true },
  { name: 'NIFTY PHARMA', value: '19,110.45', changePercent: '-0.24%', isPositive: false },
];

export default function TickerBar() {
  const renderTrackItems = () => (
    <div className="flex shrink-0 animate-marquee whitespace-nowrap py-1">
      {INDICES.map((index, idx) => (
        <div
          key={idx}
          className="inline-flex items-center mx-6 md:mx-10 text-xs md:text-sm font-medium"
        >
          <span className="text-gray-500 dark:text-gray-400 mr-2">{index.name}</span>
          <span className="text-gray-900 dark:text-slate-100 font-bold mr-2">{index.value}</span>
          <span
            className={`flex items-center ${
              index.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}
          >
            {index.isPositive ? '▲' : '▼'}{' '}
            <span className="ml-1">{index.changePercent}</span>
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 py-1.5 overflow-hidden select-none relative flex">
      {/* Left fade gradient */}
      <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-white dark:from-slate-800 to-transparent z-10 pointer-events-none" />
      
      {/* Scrollable container with side-by-side tracks */}
      <div className="flex w-full overflow-hidden">
        {renderTrackItems()}
        {renderTrackItems()}
      </div>

      {/* Right fade gradient */}
      <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-white dark:from-slate-800 to-transparent z-10 pointer-events-none" />
    </div>
  );
}
