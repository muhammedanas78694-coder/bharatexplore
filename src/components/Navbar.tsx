import React from 'react';
import { 
  Compass, 
  Heart, 
  Sun, 
  Moon, 
  Search, 
  MapPin, 
  Utensils, 
  Building2, 
  Sparkles,
  Menu,
  X
} from 'lucide-react';
import { SavedItem } from '../types';

interface NavbarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  savedItems: SavedItem[];
  onOpenSavedDrawer: () => void;
  onOpenSearchModal: () => void;
  onSelectNavSection: (sectionId: string) => void;
  onHomeClick: () => void;
  onOpenItinerary?: () => void;
  activeView?: 'home' | 'dashboard' | 'itinerary';
  tripCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  onToggleDarkMode,
  savedItems,
  onOpenSavedDrawer,
  onOpenSearchModal,
  onSelectNavSection,
  onHomeClick,
  onOpenItinerary,
  activeView = 'home',
  tripCount = 0
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/80 dark:bg-[#0b0f17]/85 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button 
          onClick={onHomeClick}
          className="flex items-center gap-2.5 group text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 via-amber-500 to-emerald-500 p-0.5 shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white dark:bg-[#0b0f17] rounded-[10px] flex items-center justify-center">
              <Compass className="w-5 h-5 text-orange-500 group-hover:rotate-45 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-orange-600 to-emerald-600 dark:from-white dark:via-orange-400 dark:to-emerald-400 bg-clip-text text-transparent">
                BharatExplore
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300 border border-orange-200 dark:border-orange-800 hidden sm:inline-block">
                INDIA 🇮🇳
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">
              Every City, Town & Delicacy
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
          <button 
            onClick={() => onSelectNavSection('states-section')}
            className="px-3.5 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-orange-600 dark:hover:text-orange-400 transition-colors flex items-center gap-1.5"
          >
            <MapPin className="w-4 h-4 text-orange-500" />
            <span>Explore States</span>
          </button>

          <button 
            onClick={() => onSelectNavSection('food-section')}
            className="px-3.5 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-orange-600 dark:hover:text-orange-400 transition-colors flex items-center gap-1.5"
          >
            <Utensils className="w-4 h-4 text-amber-500" />
            <span>Taste India</span>
          </button>

          <button 
            onClick={() => onSelectNavSection('places-section')}
            className="px-3.5 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-orange-600 dark:hover:text-orange-400 transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span>Iconic Places</span>
          </button>

          <button 
            onClick={() => onSelectNavSection('hotels-section')}
            className="px-3.5 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-orange-600 dark:hover:text-orange-400 transition-colors flex items-center gap-1.5"
          >
            <Building2 className="w-4 h-4 text-cyan-500" />
            <span>Stays & Hotels</span>
          </button>

          {onOpenItinerary && (
            <button 
              onClick={onOpenItinerary}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 font-bold ${
                activeView === 'itinerary'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md'
                  : 'hover:bg-orange-50 dark:hover:bg-orange-950/40 text-orange-600 dark:text-orange-400'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>My Itinerary</span>
              {tripCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-white">
                  {tripCount}
                </span>
              )}
            </button>
          )}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Trigger */}
          <button
            onClick={onOpenSearchModal}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100/90 dark:bg-slate-800/80 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 transition-all shadow-sm group"
          >
            <Search className="w-3.5 h-3.5 text-orange-500 group-hover:scale-110 transition-transform" />
            <span>Search city, PIN code...</span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-400">
              /
            </kbd>
          </button>

          {/* Saved Wishlist Button */}
          <button
            onClick={onOpenSavedDrawer}
            title="Saved Places & Food Wishlist"
            className="relative p-2.5 rounded-xl bg-slate-100/90 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center"
          >
            <Heart className={`w-4 h-4 ${savedItems.length > 0 ? 'text-red-500 fill-red-500' : 'text-slate-600 dark:text-slate-400'}`} />
            {savedItems.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md animate-pulse">
                {savedItems.length}
              </span>
            )}
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2.5 rounded-xl bg-slate-100/90 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-5 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0b0f17]/95 space-y-2">
          <button
            onClick={() => {
              onOpenSearchModal();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 font-semibold text-sm"
          >
            <Search className="w-4 h-4" />
            <span>Search India (Cities, Towns, PIN Codes)</span>
          </button>

          <button
            onClick={() => {
              onSelectNavSection('states-section');
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium text-left"
          >
            <MapPin className="w-4 h-4 text-orange-500" />
            <span>Explore All States & Regions</span>
          </button>

          <button
            onClick={() => {
              onSelectNavSection('food-section');
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium text-left"
          >
            <Utensils className="w-4 h-4 text-amber-500" />
            <span>Taste India (Regional Cuisine)</span>
          </button>

          <button
            onClick={() => {
              onSelectNavSection('places-section');
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium text-left"
          >
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span>Iconic Tourist Places & Forts</span>
          </button>

          <button
            onClick={() => {
              onSelectNavSection('hotels-section');
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium text-left"
          >
            <Building2 className="w-4 h-4 text-cyan-500" />
            <span>Verified Hotels (Budget to Luxury)</span>
          </button>

          {onOpenItinerary && (
            <button
              onClick={() => {
                onOpenItinerary();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm text-left shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>My Itinerary & AI Trip Planner</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
