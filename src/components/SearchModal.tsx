import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, X, ArrowRight, TrendingUp } from 'lucide-react';
import { searchLocations } from '../data/indiaGeographicData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (locationName: string) => void;
}

const QUICK_RECOMMENDATIONS = [
  'Bhopal', 'Indore', 'Sehore', 'Varanasi', 'Amritsar', 'Jaipur', 'Pachmarhi', 'Ujjain', 'Hampi', 'Munnar'
];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectLocation
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Array<{
    id: string;
    name: string;
    district: string;
    state: string;
    type: string;
    pinCodeSample?: string;
  }>>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length > 0) {
      const match = searchLocations(query);
      setResults(match);
    } else {
      setResults([]);
    }
  }, [query]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === '/' && !isOpen && (e.target as HTMLElement).tagName !== 'INPUT') {
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden text-slate-900 dark:text-white">
        {/* Search Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-orange-500 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type any Indian city, town, district or PIN code..."
            className="w-full bg-transparent text-base sm:text-lg font-medium placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-bold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200"
          >
            ESC
          </button>
        </div>

        {/* Search Results List */}
        <div className="max-h-96 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
          {results.map((item) => (
            <button
              key={`${item.id}-${item.name}`}
              onClick={() => {
                onSelectLocation(item.name);
                onClose();
              }}
              className="w-full px-5 py-3.5 hover:bg-orange-50 dark:hover:bg-slate-800/80 flex items-center justify-between text-left transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-orange-600">
                      {item.name}
                    </span>
                    {item.pinCodeSample && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
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
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {item.type}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
              </div>
            </button>
          ))}

          {query.trim().length > 0 && results.length === 0 && (
            <div className="p-8 text-center space-y-3">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Discover custom Indian location for "{query}"
              </p>
              <button
                onClick={() => {
                  onSelectLocation(query);
                  onClose();
                }}
                className="px-5 py-2 rounded-xl bg-orange-500 text-white text-xs font-bold shadow-md shadow-orange-500/20"
              >
                Search "{query}"
              </button>
            </div>
          )}

          {query.trim().length === 0 && (
            <div className="p-5 space-y-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
                <span>Trending Locations to Discover:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {QUICK_RECOMMENDATIONS.map((name) => (
                  <button
                    key={name}
                    onClick={() => {
                      onSelectLocation(name);
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
