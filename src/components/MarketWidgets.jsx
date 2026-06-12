import React, { useState, useEffect } from 'react';

// Word lists for Sentiment analysis
const POSITIVE_WORDS = ['surge', 'rally', 'bull', 'gain', 'rise', 'rising', 'growth', 'positive', 'up', 'jump', 'profit', 'high', 'record', 'soar', 'green', 'boost', 'expand', 'buy', 'dividend'];
const NEGATIVE_WORDS = ['slump', 'drop', 'fall', 'falling', 'bear', 'loss', 'down', 'negative', 'crash', 'decline', 'inflation', 'crisis', 'red', 'worry', 'slip', 'hit', 'debt', 'sell', 'deficit'];

function calculateSentiment(articles) {
  if (!articles || articles.length === 0) return 50; // Neutral default

  let posCount = 0;
  let negCount = 0;

  articles.forEach(art => {
    const text = `${art.title} ${art.description}`.toLowerCase();
    POSITIVE_WORDS.forEach(word => {
      if (text.includes(word)) posCount++;
    });
    NEGATIVE_WORDS.forEach(word => {
      if (text.includes(word)) negCount++;
    });
  });

  const total = posCount + negCount;
  if (total === 0) return 50;

  // Map to a scale of 0 to 100
  // e.g., ratio of positive words determines the score
  const score = Math.round((posCount / total) * 100);
  
  // Clamp between 15 and 85 so the needle stays in visible bounds
  return Math.min(Math.max(score, 15), 85);
}

const INITIAL_GAINERS = [
  { ticker: 'RELIANCE', name: 'Reliance Industries', price: 2942.50, change: 48.70, percent: 1.68, isPositive: true },
  { ticker: 'TCS', name: 'Tata Consultancy Svc', price: 3822.10, change: 72.45, percent: 1.93, isPositive: true },
  { ticker: 'INFY', name: 'Infosys Ltd', price: 1488.35, change: 18.90, percent: 1.29, isPositive: true },
];

const INITIAL_LOSERS = [
  { ticker: 'HDFCBANK', name: 'HDFC Bank Ltd', price: 1592.80, change: -28.40, percent: -1.75, isPositive: false },
  { ticker: 'ICICIBANK', name: 'ICICI Bank Ltd', price: 1115.45, change: -12.15, percent: -1.08, isPositive: false },
  { ticker: 'BHARTIARTL', name: 'Bharti Airtel Ltd', price: 1395.20, change: -14.80, percent: -1.05, isPositive: false },
];

export default function MarketWidgets({ articles }) {
  // 1. Sentiment Score calculation
  const score = calculateSentiment(articles);
  
  let label = 'Neutral';
  let colorClass = 'text-yellow-500';
  if (score < 35) {
    label = 'Extreme Fear';
    colorClass = 'text-red-600 dark:text-red-500';
  } else if (score < 45) {
    label = 'Fear';
    colorClass = 'text-orange-500';
  } else if (score > 65) {
    label = 'Extreme Greed';
    colorClass = 'text-green-600 dark:text-green-500';
  } else if (score > 55) {
    label = 'Greed';
    colorClass = 'text-emerald-500';
  }

  // Calculate rotation angle for needle (from -90 to +90 degrees)
  const needleRotation = ((score - 50) / 50) * 90;

  // 2. Ticking simulated stock prices
  const [gainers, setGainers] = useState(INITIAL_GAINERS);
  const [losers, setLosers] = useState(INITIAL_LOSERS);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate minor price movements
      const updatePrices = (list) => {
        return list.map(stock => {
          const deltaPercent = (Math.random() - 0.5) * 0.15; // +/- 0.075% change
          const newPrice = Number((stock.price * (1 + deltaPercent / 100)).toFixed(2));
          const oldClose = stock.price - stock.change;
          const newChange = Number((newPrice - oldClose).toFixed(2));
          const newPercent = Number(((newChange / oldClose) * 100).toFixed(2));
          return {
            ...stock,
            price: newPrice,
            change: newChange,
            percent: newPercent,
            isPositive: newChange >= 0
          };
        });
      };
      
      setGainers(prev => updatePrices(prev));
      setLosers(prev => updatePrices(prev));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4 mb-6">
      {/* 1. Market Sentiment Widget */}
      <div className="lg:col-span-4 bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-850 p-5 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-bold text-gray-800 dark:text-slate-200 flex items-center gap-1.5 mb-1">
            <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
            </svg>
            Market Sentiment Gauge
          </h3>
          <p className="text-[11px] text-gray-400 dark:text-slate-450 mb-3">
            Analysing aggregate tone of current market articles
          </p>
        </div>

        {/* Speedometer Gauge Visual */}
        <div className="relative flex flex-col items-center justify-center py-2">
          {/* Semi-circle dial */}
          <div className="w-36 h-18 overflow-hidden relative flex items-end justify-center">
            {/* Speedometer Track SVG */}
            <svg className="w-36 h-36" viewBox="0 0 100 100">
              {/* Dial Backing arc */}
              <path 
                d="M 10 50 A 40 40 0 0 1 90 50" 
                fill="none" 
                stroke="#E2E8F0" 
                strokeWidth="12" 
                strokeLinecap="round"
                className="dark:stroke-slate-700"
              />
              {/* Colored Segments Overlay (Fear to Greed gradient) */}
              {/* Fear (Red) */}
              <path 
                d="M 10 50 A 40 40 0 0 1 36.8 23.2" 
                fill="none" 
                stroke="#EF4444" 
                strokeWidth="12" 
                strokeLinecap="square"
              />
              {/* Neutral (Yellow) */}
              <path 
                d="M 36.8 23.2 A 40 40 0 0 1 63.2 23.2" 
                fill="none" 
                stroke="#EAB308" 
                strokeWidth="12" 
                strokeLinecap="square"
              />
              {/* Greed (Green) */}
              <path 
                d="M 63.2 23.2 A 40 40 0 0 1 90 50" 
                fill="none" 
                stroke="#10B981" 
                strokeWidth="12" 
                strokeLinecap="square"
              />
            </svg>

            {/* Rotating Needle */}
            <div 
              style={{ transform: `rotate(${needleRotation}deg)` }}
              className="absolute bottom-0 w-1.5 h-16 bg-gray-800 dark:bg-slate-100 rounded-full origin-bottom transition-transform duration-1000 ease-out"
            />
            {/* Center Pivot Point */}
            <div className="absolute bottom-[-4px] w-4 h-4 bg-gray-900 dark:bg-slate-50 border border-white rounded-full z-10" />
          </div>
        </div>

        <div className="text-center mt-3">
          <span className="text-xs text-gray-500 dark:text-slate-400">Current Zone: </span>
          <span className={`text-sm font-extrabold ${colorClass}`}>{label} ({score})</span>
        </div>
      </div>

      {/* 2. Top Gainers & Losers Widget */}
      <div className="lg:col-span-8 bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-850 p-5 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-bold text-gray-800 dark:text-slate-200 flex items-center gap-1.5 mb-1">
            <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9l3 9M1.125 11.25h21.75M1.125 11.25c0-4.06 3.07-7.61 7.23-7.79l2.76-.12a12.63 12.63 0 015.65 1.13l2.87 1.44a10.82 10.82 0 004.24 1.14l2.76.11c4.17.18 7.24 3.73 7.24 7.79H1.125z" />
            </svg>
            NIFTY 50 - Top Gainers & Losers
          </h3>
          <p className="text-[11px] text-gray-400 dark:text-slate-450 mb-4">
            Simulated live updates (5s ticks)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Gainers Column */}
          <div>
            <span className="text-xs font-bold text-green-600 dark:text-green-400 block mb-2 px-1">▲ Top Gainers</span>
            <div className="space-y-2">
              {gainers.map((stock, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-green-50/40 dark:bg-green-950/10 border border-green-100/50 dark:border-green-900/10">
                  <div>
                    <span className="text-xs font-bold text-gray-900 dark:text-slate-100 block">{stock.ticker}</span>
                    <span className="text-[10px] text-gray-400 dark:text-slate-450 block truncate max-w-[120px]">{stock.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-gray-950 dark:text-slate-50 block">₹{stock.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                    <span className={`text-[10px] font-bold ${stock.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      +{stock.change} (+{stock.percent}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Losers Column */}
          <div>
            <span className="text-xs font-bold text-red-600 dark:text-red-400 block mb-2 px-1">▼ Top Losers</span>
            <div className="space-y-2">
              {losers.map((stock, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-red-50/40 dark:bg-red-950/10 border border-red-100/50 dark:border-red-900/10">
                  <div>
                    <span className="text-xs font-bold text-gray-900 dark:text-slate-100 block">{stock.ticker}</span>
                    <span className="text-[10px] text-gray-400 dark:text-slate-450 block truncate max-w-[120px]">{stock.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-gray-950 dark:text-slate-50 block">₹{stock.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                    <span className={`text-[10px] font-bold ${stock.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {stock.change} ({stock.percent}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
