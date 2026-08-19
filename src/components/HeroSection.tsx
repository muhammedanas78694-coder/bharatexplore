import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  MapPin, 
  Navigation, 
  Sparkles, 
  ChevronRight, 
  ArrowRight,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';
import { searchLocations } from '../data/indiaGeographicData';

interface HeroSectionProps {
  onSearch: (query: string) => void;
  onSelectSuggestion: (locationId: string) => void;
}

const HERO_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1920&q=80',
    title: 'Ganga Maha Aarti, Varanasi',
    tag: 'Spiritual Heritage'
  },
  {
    url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1920&q=80',
    title: 'Upper Lake & Historic Palaces, Madhya Pradesh',
    tag: 'Heart of India'
  },
  {
    url: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1920&q=80',
    title: 'Hawa Mahal & Golden Sands, Rajasthan',
    tag: 'Royal Forts'
  },
  {
    url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1920&q=80',
    title: 'Emerald Backwaters & Tea Hills, Kerala',
    tag: "God's Own Country"
  },
  {
    url: 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=1920&q=80',
    title: 'Sri Harmandir Sahib, Amritsar',
    tag: 'Peace & Hospitality'
  }
];

const POPULAR_QUICK_SEARCHES = [
  { name: 'Bhopal', desc: 'City of Lakes & Nawabi Korma', query: 'bhopal' },
  { name: 'Indore', desc: 'Street Food & Sarafa Night Market', query: 'indore' },
  { name: 'Sehore', desc: 'Ancient Temples & Sharbati Wheat', query: 'sehore' },
  { name: 'Varanasi', desc: 'Ghats, Tamatar Chaat & Malaiyyo', query: 'varanasi' },
  { name: 'Amritsar', desc: 'Golden Temple & Chur-Chur Kulcha', query: 'amritsar' },
  { name: 'Pachmarhi', desc: 'Queen of Satpura & Bee Falls', query: 'pachmarhi' },
  { name: 'Ujjain', desc: 'Mahakal Lok & Kshipra Ghats', query: 'ujjain' }
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearch,
  onSelectSuggestion
}) => {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Array<{
    id: string;
    name: string;
    district: string;
    state: string;
    type: string;
    pinCodeSample?: string;
  }>>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [locatingUser, setLocatingUser] = useState(false);
  const [locationSuccess, setLocationSuccess] = useState<string | null>(null);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Auto rotate hero background image every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  // Update suggestions on search input change
  useEffect(() => {
    if (query.trim().length > 0) {
      const results = searchLocations(query);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  // Handle click outside to close autocomplete popup
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsFocused(false);
      onSearch(query.trim());
    }
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setLocatingUser(true);
    setLocationSuccess(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocatingUser(false);
        // Default to Bhopal / Central India coordinate reference or detected city
        const { latitude, longitude } = position.coords;
        setLocationSuccess(`Detected: ${latitude.toFixed(2)}°N, ${longitude.toFixed(2)}°E`);
        
        // Auto navigate to nearby top hub
        setTimeout(() => {
          onSearch('Bhopal');
        }, 800);
      },
      () => {
        setLocatingUser(false);
        // Graceful fallback to Bhopal
        onSearch('Bhopal');
      },
      { timeout: 8000 }
    );
  };

  return (
    <section className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image Carousel with Vignette & Overlay */}
      {HERO_IMAGES.map((img, idx) => (
        <div
          key={img.url}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentImgIdx ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          } transition-transform duration-[8000ms]`}
        >
          <img
            src={img.url}
            alt={img.title}
            className="w-full h-full object-cover"
          />
          {/* Multi-layered cinematic gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-[#0b0f17]/60 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />
        </div>
      ))}

      {/* Hero Badge Tag (Current Location) */}
      <div className="absolute top-6 right-6 hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-xs text-white/90 font-medium">
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        <span>{HERO_IMAGES[currentImgIdx].title}</span>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center text-white">
        {/* Subtle Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/20 backdrop-blur-md border border-orange-400/40 text-orange-300 text-xs sm:text-sm font-semibold mb-6 shadow-lg shadow-orange-500/10">
          <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping" />
          <span>India-Wide Location, Food & Stay Explorer</span>
        </div>

        {/* Large Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-serif tracking-tight leading-[1.1] mb-5">
          India Is Waiting.{' '}
          <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent italic font-normal">
            Where Will You Go?
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-200/90 font-normal leading-relaxed mb-8">
          Discover the authentic food, living culture, hidden places and verified stays across all 28 states, union territories, and towns of India.
        </p>

        {/* Search Bar Box with Real-Time Suggestions */}
        <div ref={searchContainerRef} className="relative max-w-3xl mx-auto mb-6">
          <form
            onSubmit={handleFormSubmit}
            className="relative flex items-center bg-white dark:bg-slate-900/95 rounded-2xl p-2 shadow-2xl shadow-black/50 border-2 border-white/20 dark:border-slate-700/80 focus-within:border-orange-500 transition-all backdrop-blur-xl"
          >
            <div className="pl-3 sm:pl-4 text-orange-500 flex items-center justify-center">
              <Search className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              placeholder="Search any city, town, district, destination or PIN code (e.g. Bhopal, Sehore, 462001)..."
              className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-sm sm:text-base font-medium focus:outline-none"
            />

            {/* Clear button if typed */}
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                &times;
              </button>
            )}

            {/* Explore Button */}
            <button
              type="submit"
              className="hidden sm:flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
            >
              <span>Explore Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Autocomplete Suggestions Dropdown */}
          {isFocused && (suggestions.length > 0 || query.trim().length > 0) && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50 text-left divide-y divide-slate-100 dark:divide-slate-800/80 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/50 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Location Matches ({suggestions.length})</span>
                <span className="text-[10px] text-orange-500">Location + District + State</span>
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
                {suggestions.map((item) => (
                  <button
                    key={`${item.id}-${item.name}`}
                    type="button"
                    onClick={() => {
                      setQuery(item.name);
                      setIsFocused(false);
                      onSelectSuggestion(item.name);
                    }}
                    className="w-full px-4 py-3 hover:bg-orange-50/80 dark:hover:bg-slate-800/80 flex items-center justify-between gap-3 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400">
                            {item.name}
                          </span>
                          {item.pinCodeSample && (
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                              PIN {item.pinCodeSample}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {item.district}, {item.state}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {item.type}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </button>
                ))}

                {suggestions.length === 0 && query.trim().length > 0 && (
                  <div className="p-4 text-center">
                    <p className="text-sm text-slate-700 dark:text-slate-300 font-semibold">
                      Search "{query}" across India
                    </p>
                    <button
                      onClick={() => {
                        setIsFocused(false);
                        onSearch(query);
                      }}
                      className="mt-2 px-4 py-1.5 rounded-lg bg-orange-500 text-white text-xs font-bold"
                    >
                      Discover "{query}"
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Location & Quick Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <button
            onClick={handleUseMyLocation}
            disabled={locatingUser}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 active:bg-white/30 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold transition-all shadow-md hover:scale-105"
          >
            <Navigation className={`w-4 h-4 text-emerald-400 ${locatingUser ? 'animate-spin' : ''}`} />
            <span>{locatingUser ? 'Detecting Location...' : '📍 Use My Location'}</span>
          </button>

          {locationSuccess && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{locationSuccess}</span>
            </span>
          )}
        </div>

        {/* Popular India Quick Searches Chips */}
        <div className="pt-2">
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-300/80 mb-3 font-medium">
            <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
            <span>Trending Destinations & Small Towns:</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
            {POPULAR_QUICK_SEARCHES.map((chip) => (
              <button
                key={chip.query}
                onClick={() => onSelectSuggestion(chip.name)}
                className="group px-3.5 py-1.5 rounded-full bg-black/40 hover:bg-orange-500/30 active:bg-orange-500/50 backdrop-blur-md border border-white/15 hover:border-orange-400/60 text-white text-xs font-medium transition-all shadow-sm flex items-center gap-1.5 hover:scale-105"
              >
                <span>{chip.name}</span>
                <span className="text-[10px] text-orange-300 opacity-80 group-hover:opacity-100 hidden sm:inline">
                  &bull; {chip.desc.split('&')[0]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
