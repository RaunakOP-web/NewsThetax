# StockPulse India 📈

StockPulse India is a fully functional, zero-fee Indian stock market news website built from scratch using React, Vite, and Tailwind CSS. The application runs entirely on the client-side (no backend) and leverages public RSS feeds and a developer-tier NewsAPI search interface.

## 🚀 Technology Stack
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS v3 (Inter Font, Dark Mode, Custom Scrollbars)
- **APIs (Free Tier Only)**:
  - **RSS Feeds** converted to JSON via `rss2json.com` (No API key needed)
  - **NewsAPI.org** for keyword search (Free developer key required for live search; local fallback integrated)

## 📁 Project Structure
```text
src/
├── components/
│   ├── Navbar.jsx          # Top Navigation with toggles
│   ├── TickerBar.jsx       # Infinite marquee scrolling indexes
│   ├── MarketSummary.jsx   # Grid of key market indices performance
│   ├── CategoryTabs.jsx    # Horizontal scrollable category switches
│   ├── SearchBar.jsx       # Debounced keyword search input
│   ├── NewsFeed.jsx        # Handles skeletons, empty, error, and list layout
│   ├── NewsCard.jsx        # Unified standard card & hero card layout
│   └── Footer.jsx          # Attribution, warning disclosure, and links
├── hooks/
│   └── useNews.js          # Handles RSS fetching, deduplication, search fallback, session caching
├── utils/
│   ├── fetchRSS.js         # Axios query processor with image description parse utility
│   └── timeAgo.js          # Converts dates to relative ago times
├── constants/
│   └── feeds.js            # RSS links definition config
├── App.jsx                 # Core coordinator and dark mode controller
└── main.jsx                # React Entrypoint
```

## ✨ Core Features
1. **Premium Responsive Design**: Dark & Light mode toggle synced to system preference and cached in `localStorage`. Smooth micro-interactions.
2. **Infinite Index Ticker**: Seamlessly scrolls main indices (Nifty 50, SenseX, Bank Nifty, etc.) using clean CSS keyframe animations.
3. **Deduplicated Multi-feed Aggregator**: Pulls news from 5 major public finance sources:
   - *Economic Times (ET Markets)*
   - *Moneycontrol*
   - *Business Standard*
   - *Livemint*
   - *NDTV Profit*
4. **Smart Fallback Local Search**: When a search is made or the *Global* tab is clicked, the app tries using NewsAPI. If the key is not set or requests fail, it automatically runs an in-memory keywords search on all RSS articles.
5. **Session Cache**: Prevents duplicate fetches on tab toggling.
6. **Load More Pagination**: Flat, performance-first load-more loading.

---

## 🛠️ Local Setup Instructions

1. **Clone or navigate to the project directory**
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Install Tailwind & Utilities (Already configured)**
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   npm install axios
   ```
4. **Setup Environment Keys**
   Create a `.env` file in the root directory:
   ```env
   VITE_NEWS_API_KEY=your_free_key_here
   ```
   *Get a free key in 30 seconds at [NewsAPI.org](https://newsapi.org/).*

5. **Start Dev Server**
   ```bash
   npm run dev
   ```
