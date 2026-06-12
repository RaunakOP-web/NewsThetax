export const FEEDS = [
  {
    id: 'et-markets',
    name: 'ET Markets',
    url: 'https://economictimes.indiatimes.com/markets/rss.cms',
    category: 'NSE'
  },
  {
    id: 'moneycontrol',
    name: 'Moneycontrol',
    url: 'https://www.moneycontrol.com/rss/MCtopnews.xml',
    category: 'IPO' // will be filtered by keyword "IPO"
  },
  {
    id: 'business-standard',
    name: 'Business Standard',
    url: 'https://www.business-standard.com/rss/markets-106.rss',
    category: 'BSE'
  },
  {
    id: 'livemint',
    name: 'Livemint',
    url: 'https://www.livemint.com/rss/markets',
    category: 'Economy'
  },
  {
    id: 'ndtv-profit',
    name: 'NDTV Profit',
    url: 'https://www.ndtvprofit.com/rss',
    category: 'Economy'
  }
];
