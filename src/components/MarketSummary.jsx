import React from 'react';

const MARKET_DATA = [
  { name: 'NIFTY 50', value: '23,465.60', change: '+142.10', changePercent: '+0.61%', isPositive: true },
  { name: 'SENSEX', value: '77,150.35', change: '+456.20', changePercent: '+0.59%', isPositive: true },
  { name: 'BANK NIFTY', value: '50,125.15', change: '-110.45', changePercent: '-0.22%', isPositive: false },
  { name: 'NIFTY IT', value: '34,920.80', change: '+295.40', changePercent: '+0.85%', isPositive: true },
  { name: 'NIFTY PHARMA', value: '19,110.45', change: '-45.30', changePercent: '-0.24%', isPositive: false },
];

export default function MarketSummary() {
  return (
    <div className="w-full px-4 py-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {MARKET_DATA.map((item, idx) => (
          <div
            key={idx}
            className={`p-3.5 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 ${
              item.isPositive
                ? 'bg-green-50/70 dark:bg-green-950/20 border-green-100 dark:border-green-900/30 text-green-900 dark:text-green-300'
                : 'bg-red-50/70 dark:bg-red-950/20 border-red-100 dark:border-red-900/30 text-red-900 dark:text-red-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                {item.name}
              </span>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                  item.isPositive
                    ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400'
                    : 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-400'
                }`}
              >
                {item.changePercent}
              </span>
            </div>
            
            <div className="flex items-baseline justify-between">
              <span className="text-sm md:text-base font-bold text-gray-900 dark:text-slate-100">
                {item.value}
              </span>
              
              {/* Sparkline line arrow SVG */}
              <div className="w-8 h-5 flex items-center justify-end">
                {item.isPositive ? (
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.306-4.307a11.95 11.95 0 015.814 5.519l2.74 1.22m0 0l-5.94 2.28m5.94-2.28l-2.28 5.941" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
