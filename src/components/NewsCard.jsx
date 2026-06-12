import React from 'react';
import { timeAgo } from '../utils/timeAgo';

// Fallback high-quality stock market image
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80';

// Helper to get source label styling
const getSourceStyles = (source) => {
  const src = source ? source.toLowerCase() : '';
  if (src.includes('et') || src.includes('economic')) {
    return { bg: 'bg-red-500 text-white', initials: 'ET', name: 'Economic Times' };
  }
  if (src.includes('moneycontrol')) {
    return { bg: 'bg-blue-600 text-white', initials: 'MC', name: 'Moneycontrol' };
  }
  if (src.includes('business')) {
    return { bg: 'bg-amber-600 text-white', initials: 'BS', name: 'Business Standard' };
  }
  if (src.includes('livemint') || src.includes('mint')) {
    return { bg: 'bg-emerald-600 text-white', initials: 'LM', name: 'Livemint' };
  }
  if (src.includes('ndtv') || src.includes('profit')) {
    return { bg: 'bg-rose-600 text-white', initials: 'NP', name: 'NDTV Profit' };
  }
  return { bg: 'bg-gray-600 text-white', initials: source ? source.substring(0, 2).toUpperCase() : 'N', name: source || 'News' };
};

export default function NewsCard({ article, isHero = false, isBookmarked = false, onToggleBookmark }) {
  const { title, description, link, thumbnail, pubDate, source } = article;
  const sourceInfo = getSourceStyles(source);
  const formattedTime = timeAgo(pubDate);

  const handleCardClick = () => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const imageSrc = thumbnail && thumbnail.trim() !== '' ? thumbnail : FALLBACK_IMAGE;

  const bookmarkButton = (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggleBookmark(article);
      }}
      className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900 text-gray-500 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors shadow-sm z-10"
      title={isBookmarked ? "Remove bookmark" : "Bookmark article"}
    >
      {isBookmarked ? (
        <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      )}
    </button>
  );

  // Render Hero Layout
  if (isHero) {
    return (
      <div 
        onClick={handleCardClick}
        className="group cursor-pointer bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 col-span-full grid grid-cols-1 lg:grid-cols-12 gap-0"
      >
        {/* Hero Image Section */}
        <div className="relative lg:col-span-7 h-64 sm:h-80 md:h-[400px] overflow-hidden">
          <img 
            src={imageSrc} 
            alt={title}
            onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Source badge on top-left of image */}
          <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md uppercase tracking-wider bg-gray-900/60 text-white backdrop-blur-sm">
            {sourceInfo.name}
          </span>
          {bookmarkButton}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 lg:hidden" />
        </div>

        {/* Hero Content Section */}
        <div className="p-6 sm:p-8 lg:col-span-5 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-2 mb-4">
              {/* Highlight Tag */}
              <span className="text-[10px] font-extrabold uppercase tracking-widest bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 px-2.5 py-1 rounded-md">
                Featured Story
              </span>
              <span className="text-xs text-gray-500 dark:text-slate-400 font-medium">
                • {formattedTime}
              </span>
            </div>
            
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-slate-100 leading-tight mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {title}
            </h2>
            
            <p className="text-sm sm:text-base text-gray-600 dark:text-slate-350 line-clamp-4 leading-relaxed mb-6">
              {description}
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 dark:border-slate-700/50 pt-4">
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${sourceInfo.bg}`}>
                {sourceInfo.initials}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-gray-800 dark:text-slate-200">
                  {sourceInfo.name}
                </span>
                <span className="text-[10px] text-gray-500 dark:text-slate-400">
                  Verified Publisher
                </span>
              </div>
            </div>
            
            <span className="text-blue-600 dark:text-blue-400 text-xs font-bold inline-flex items-center gap-1 group-hover:underline">
              Read Story 
              <svg className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Render Standard Layout
  return (
    <div 
      onClick={handleCardClick}
      className="group cursor-pointer bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-800/80 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative"
    >
      {/* Thumbnail Section */}
      <div className="relative h-48 overflow-hidden w-full bg-gray-100 dark:bg-slate-900">
        <img 
          src={imageSrc} 
          alt={title}
          onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Source badge */}
        <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm uppercase tracking-wide ${sourceInfo.bg}`}>
          {sourceInfo.initials}
        </span>
        {bookmarkButton}
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col justify-between flex-grow">
        <div>
          <span className="text-[10px] font-semibold text-gray-400 dark:text-slate-400 block mb-2">
            {formattedTime}
          </span>
          <h3 className="text-base font-bold text-gray-900 dark:text-slate-100 leading-snug mb-2.5 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <p className="text-xs text-gray-500 dark:text-slate-350 line-clamp-3 leading-relaxed mb-4">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 dark:border-slate-700/50 pt-3 mt-auto">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-gray-700 dark:text-slate-300">
              {sourceInfo.name}
            </span>
          </div>
          <span className="text-blue-600 dark:text-blue-400 text-xs font-bold inline-flex items-center gap-0.5 group-hover:underline">
            Read
            <svg className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
