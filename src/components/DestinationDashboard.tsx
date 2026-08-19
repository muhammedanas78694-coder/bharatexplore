import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Utensils, 
  Building2, 
  Sparkles, 
  Share2, 
  Heart, 
  Calendar, 
  Clock, 
  Thermometer, 
  Star, 
  ShieldCheck, 
  Navigation, 
  Info,
  Car,
  ChevronRight,
  Map as MapIcon,
  CalendarPlus
} from 'lucide-react';
import { DestinationDetail } from '../types';
import { InteractiveMap } from './InteractiveMap';
import { ErrorBoundary } from './ErrorBoundary';

interface DestinationDashboardProps {
  details: DestinationDetail;
  onBack: () => void;
  onSelectNearby: (locationName: string) => void;
  onToggleSave: (item: { id: string; type: 'location' | 'place' | 'food' | 'hotel'; title: string; locationName: string; imageUrl: string; subtitle: string }) => void;
  isSaved: boolean;
  darkMode?: boolean;
  onAddToItinerary?: (item: { id: string; type: string; title: string; locationName: string; imageUrl?: string; subtitle?: string }) => void;
}

type TabType = 'overview' | 'food' | 'places' | 'restaurants' | 'hotels' | 'split_map' | 'nearby';

export const DestinationDashboard: React.FC<DestinationDashboardProps> = ({
  details,
  onBack,
  onSelectNearby,
  onToggleSave,
  isSaved,
  darkMode = false,
  onAddToItinerary
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [selectedPlaceCategory, setSelectedPlaceCategory] = useState<string>('all');
  const [selectedHotelTier, setSelectedHotelTier] = useState<string>('all');
  const [selectedMapItemId, setSelectedMapItemId] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const { location, foods, places, hotels, restaurants, nearby, verifiedLuxuryCount } = details;

  // Filter places
  const filteredPlaces = selectedPlaceCategory === 'all'
    ? places
    : places.filter((p) => p.category === selectedPlaceCategory);

  // Filter hotels
  const filteredHotels = selectedHotelTier === 'all'
    ? hotels
    : hotels.filter((h) => {
        const cat = h.tier || h.category;
        if (selectedHotelTier === '5_star' || selectedHotelTier === '5-star') {
          return cat === '5-star' || cat === '5_star' || cat === 'luxury';
        }
        if (selectedHotelTier === '4_star' || selectedHotelTier === '4-star') {
          return cat === '4-star' || cat === '4_star';
        }
        if (selectedHotelTier === '3_star' || selectedHotelTier === '3-star') {
          return cat === '3-star' || cat === '3_star';
        }
        return cat === selectedHotelTier;
      });

  // Category counts
  const placeCategories = ['all', ...Array.from(new Set(places.map((p) => p.category)))];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const heroPhoto = location.coverImage || location.gallery?.[0] || 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80';
  const bestSeason = location.weatherSnippet?.bestSeason || location.bestTimeToVisit || 'October to March';
  const avgTemp = location.weatherSnippet?.temp || '24°C';

  // Fallback nearby luxury hotels (if small town has 0 luxury)
  const nearbyWithLuxury = nearby.filter(n => n.hasLuxuryHotels);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070a10] text-slate-900 dark:text-slate-100 transition-colors pb-24">
      {/* Top Navigation & Breadcrumbs */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-16 sm:top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Back Button & Breadcrumbs */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 transition-colors flex items-center justify-center text-slate-700 dark:text-slate-300 shadow-sm"
              title="Back to India Explore"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            {/* Breadcrumb Hierarchy */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 overflow-x-auto whitespace-nowrap py-1">
              <span>India</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span>{location.state}</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span>{location.district}</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="font-bold text-slate-900 dark:text-white">{location.name}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {onAddToItinerary && (
              <button
                onClick={() => onAddToItinerary({
                  id: location.id,
                  type: 'location',
                  title: location.name,
                  locationName: location.name,
                  imageUrl: heroPhoto,
                  subtitle: `${location.district}, ${location.state}`
                })}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-md shadow-orange-500/20 transition-all"
              >
                <CalendarPlus className="w-3.5 h-3.5" />
                <span>Add to Trip</span>
              </button>
            )}

            <button
              onClick={() => onToggleSave({
                id: location.id,
                type: 'location',
                title: location.name,
                locationName: location.name,
                imageUrl: heroPhoto,
                subtitle: `${location.district}, ${location.state}`
              })}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                isSaved
                  ? 'bg-red-50 dark:bg-red-950/40 border-red-300 text-red-600 dark:text-red-400'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
              <span>{isSaved ? 'Saved in Wishlist' : 'Save'}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-all"
            >
              <Share2 className="w-3.5 h-3.5 text-slate-500" />
              <span>{copiedLink ? 'Copied URL!' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Banner Section */}
      <div className="relative h-[340px] sm:h-[420px] lg:h-[460px] overflow-hidden">
        <img
          src={heroPhoto}
          alt={location.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070a10] via-black/50 to-black/20" />

        {/* Hero Content Overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            <div className="max-w-3xl text-white">
              {/* Type Badge & District */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-bold uppercase tracking-wider shadow">
                  {location.tier.replace('_', ' ').replace('-', ' ')}
                </span>
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-slate-200 text-xs font-medium border border-white/20">
                  {location.district} District &bull; {location.state}
                </span>
                {location.pinCodes && location.pinCodes.length > 0 && (
                  <span className="px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-mono">
                    PIN {location.pinCodes[0]}
                  </span>
                )}
              </div>

              {/* Title & Hindi Script */}
              <div className="flex items-baseline gap-3 mb-2">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-serif tracking-tight drop-shadow-md">
                  {location.name}
                </h1>
                {location.hindiName && (
                  <span className="text-xl sm:text-3xl text-orange-300/90 font-serif">
                    {location.hindiName}
                  </span>
                )}
              </div>

              {/* Tagline */}
              <p className="text-base sm:text-xl text-slate-200 font-medium italic mb-6">
                "{location.tagline}"
              </p>

              {/* Quick Info Badges Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm">
                <div className="px-3 py-2 rounded-xl bg-black/50 backdrop-blur-md border border-white/15 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Best Season</div>
                    <div className="font-semibold text-white truncate">{bestSeason}</div>
                  </div>
                </div>

                <div className="px-3 py-2 rounded-xl bg-black/50 backdrop-blur-md border border-white/15 flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Avg Weather</div>
                    <div className="font-semibold text-white truncate">{avgTemp}</div>
                  </div>
                </div>

                <div className="px-3 py-2 rounded-xl bg-black/50 backdrop-blur-md border border-white/15 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Ideal Duration</div>
                    <div className="font-semibold text-white truncate">{location.idealDuration}</div>
                  </div>
                </div>

                <div className="px-3 py-2 rounded-xl bg-black/50 backdrop-blur-md border border-white/15 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Famous For</div>
                    <div className="font-semibold text-white truncate">{location.famousFor?.[0] || 'Culture & Heritage'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Tabs & Viewport */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-slate-200 dark:border-slate-800 no-scrollbar">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>Overview & Culture</span>
          </button>

          <button
            onClick={() => setActiveTab('food')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'food'
                ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/25'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>Taste & Food ({foods.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('places')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'places'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Places & Sights ({places.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('restaurants')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'restaurants'
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/25'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>Famous Restaurants ({restaurants.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('hotels')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'hotels'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/25'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Hotels & Stays ({hotels.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('split_map')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'split_map'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            <MapIcon className="w-4 h-4" />
            <span>Interactive Split Map</span>
          </button>

          <button
            onClick={() => setActiveTab('nearby')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'nearby'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            <Car className="w-4 h-4" />
            <span>Nearby Excursions ({nearby.length})</span>
          </button>
        </div>

        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Description & Cultural Heritage */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md">
                  <h3 className="text-xl sm:text-2xl font-bold font-serif mb-4 text-slate-900 dark:text-white">
                    About {location.name}
                  </h3>
                  <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {location.overview}
                  </p>

                  {/* Highlights Bullet Badges */}
                  <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      Key Highlights & Identity
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {location.famousFor?.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1.5 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-900/60 text-xs font-semibold"
                        >
                          ✦ {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Photo Gallery Grid */}
                {location.gallery && location.gallery.length > 0 && (
                  <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md">
                    <h3 className="text-xl font-bold font-serif mb-4 text-slate-900 dark:text-white">
                      Visual Impressions of {location.name}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {location.gallery.map((img, i) => (
                        <div key={i} className="h-44 rounded-2xl overflow-hidden shadow">
                          <img src={img} alt={`${location.name} ${i}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Travel Connectivity & Map Preview */}
              <div className="space-y-6">
                {/* Weather & Travel Tip Card */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
                  <h4 className="text-base font-bold font-serif text-slate-900 dark:text-white flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-orange-500" />
                    <span>Travel Guide & Season</span>
                  </h4>

                  <div className="space-y-3 text-xs sm:text-sm">
                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
                      <div className="font-bold text-slate-800 dark:text-slate-200">🌤️ Best Season to Visit:</div>
                      <div className="text-slate-600 dark:text-slate-400 mt-0.5">{bestSeason}</div>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
                      <div className="font-bold text-slate-800 dark:text-slate-200">⏱️ Recommended Duration:</div>
                      <div className="text-slate-600 dark:text-slate-400 mt-0.5">{location.idealDuration}</div>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
                      <div className="font-bold text-slate-800 dark:text-slate-200">📍 District & Region:</div>
                      <div className="text-slate-600 dark:text-slate-400 mt-0.5">{location.district} District, {location.region} India</div>
                    </div>
                  </div>
                </div>

                {/* Quick Map Widget */}
                <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md">
                  <div className="flex items-center justify-between mb-3 px-2">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Geographic Coordinates</span>
                    <button
                      onClick={() => setActiveTab('split_map')}
                      className="text-xs text-orange-600 font-bold hover:underline flex items-center gap-1"
                    >
                      <span>Full Map</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <ErrorBoundary fallbackTitle="Map Preview Unavailable" fallbackMessage="Could not load map coordinates.">
                    <InteractiveMap
                      center={location.coordinates}
                      zoom={12}
                      places={places.slice(0, 3)}
                      hotels={hotels.slice(0, 3)}
                      className="h-48 w-full rounded-2xl"
                      darkMode={darkMode}
                    />
                  </ErrorBoundary>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. FOOD TAB */}
        {activeTab === 'food' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 dark:text-white">
                  Signature Foods of {location.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Local specialties, street-food legends, and must-try delicacies rooted in {location.district}.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foods.map((food) => (
                <div
                  key={food.id}
                  className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={food.imageUrl}
                      alt={food.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-bold text-white border border-white/20">
                      <span className={`w-2 h-2 rounded-full ${food.isVegetarian ? 'bg-emerald-400' : 'bg-red-500'}`} />
                      <span>{food.isVegetarian ? 'Pure Veg' : 'Non-Veg'}</span>
                    </div>

                    <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-bold text-amber-300 border border-white/20">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{food.rating.toFixed(1)}</span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[10px] uppercase tracking-wider text-amber-300 font-bold">
                        {String(food.category).replace('_', ' ')}
                      </span>
                      <h4 className="text-xl font-bold font-serif leading-tight">
                        {food.name}
                      </h4>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                      {food.description}
                    </p>

                    {/* Iconic Places to Eat */}
                    <div>
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Famous Stalls / Shops:
                      </div>
                      <div className="space-y-1">
                        {food.iconicPlacesToEat.map((spot) => (
                          <div key={spot} className="text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                            <span>📍</span>
                            <span>{spot}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 font-medium">
                      <span>Price: <strong className="text-slate-900 dark:text-white">{food.priceRange}</strong></span>
                      <div className="flex items-center gap-2">
                        <span className="text-orange-600 dark:text-orange-400 font-bold">{food.spiceLevel} Spice</span>
                        {onAddToItinerary && (
                          <button
                            onClick={() => onAddToItinerary({
                              id: food.id,
                              type: 'food',
                              title: food.name,
                              locationName: location.name,
                              imageUrl: food.imageUrl,
                              subtitle: food.description
                            })}
                            className="p-1.5 rounded-lg bg-orange-500/10 hover:bg-orange-500 text-orange-600 hover:text-white transition-colors"
                            title="Add to Itinerary"
                          >
                            <CalendarPlus className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. PLACES TAB */}
        {activeTab === 'places' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 dark:text-white">
                  Places to Visit in {location.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Temples, historical monuments, scenic lakes and iconic attractions.
                </p>
              </div>

              {/* Category Filters */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
                {placeCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedPlaceCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all whitespace-nowrap ${
                      selectedPlaceCategory === cat
                        ? 'bg-emerald-600 text-white shadow'
                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlaces.map((place) => (
                <div
                  key={place.id}
                  className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={place.imageUrl}
                      alt={place.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold border border-white/20 uppercase">
                        {place.category}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-bold text-amber-300 border border-white/20">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{place.rating.toFixed(1)}</span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h4 className="text-xl font-bold font-serif leading-tight">
                        {place.name}
                      </h4>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                      {place.description}
                    </p>

                    <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Timings: <strong>{place.timings}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-orange-500" />
                        <span className="truncate">{place.address}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold">
                      <span className="text-slate-700 dark:text-slate-300">Entry: {place.entryFee}</span>
                      <div className="flex items-center gap-2">
                        {onAddToItinerary && (
                          <button
                            onClick={() => onAddToItinerary({
                              id: place.id,
                              type: 'place',
                              title: place.name,
                              locationName: location.name,
                              imageUrl: place.imageUrl,
                              subtitle: place.description
                            })}
                            className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-600 text-emerald-600 hover:text-white transition-colors"
                            title="Add to Itinerary"
                          >
                            <CalendarPlus className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setActiveTab('split_map');
                            setSelectedMapItemId(place.id);
                          }}
                          className="text-emerald-600 hover:text-emerald-700 font-bold flex items-center gap-1"
                        >
                          <span>View on Map</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. RESTAURANTS TAB */}
        {activeTab === 'restaurants' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 dark:text-white">
                Best Restaurants in {location.name}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Top dining spots, historic sweet bhandars, and multicuisine gems.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.map((rest) => {
                const restCuisines = rest.cuisines || rest.cuisine || [];
                const signatureDishes = rest.signatureDishes || rest.mustTryDishes || [];
                const cost = rest.costForTwo || (rest.priceForTwo ? `₹${rest.priceForTwo} for two` : '₹400 for two');

                return (
                  <div
                    key={rest.id}
                    className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={rest.imageUrl}
                        alt={rest.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-bold text-white border border-white/20">
                        <span className={`w-2 h-2 rounded-full ${rest.isPureVeg ? 'bg-emerald-400' : 'bg-orange-400'}`} />
                        <span>{rest.isPureVeg ? 'Pure Veg' : 'Veg & Non-Veg'}</span>
                      </div>

                      <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-bold text-amber-300 border border-white/20">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{rest.rating.toFixed(1)}</span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h4 className="text-xl font-bold font-serif leading-tight">
                          {rest.name}
                        </h4>
                        <p className="text-xs text-orange-200">{restCuisines.join(', ')}</p>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      {signatureDishes.length > 0 && (
                        <div>
                          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                            Signature Dishes:
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {signatureDishes.map((dish) => (
                              <span
                                key={dish}
                                className="text-xs px-2 py-0.5 rounded-md bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 font-medium"
                              >
                                {dish}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                        <div>📍 {rest.address}</div>
                        <div>🕒 {rest.timings}</div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                        <span className="font-bold text-slate-900 dark:text-white">Cost: {cost}</span>
                        <span className="text-slate-400">{rest.reviewsCount} reviews</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 5. HOTELS TAB */}
        {activeTab === 'hotels' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 dark:text-white">
                  Hotels & Stays in {location.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Budget lodgings, 3-star comfort, 4-star executive, and luxury hotels.
                </p>
              </div>

              {/* Tier Filters */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
                {['all', 'budget', '3_star', '4_star', '5_star'].map((tier) => (
                  <button
                    key={tier}
                    onClick={() => setSelectedHotelTier(tier)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all whitespace-nowrap ${
                      selectedHotelTier === tier
                        ? 'bg-cyan-600 text-white shadow'
                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    {tier.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* If 0 hotels match */}
            {filteredHotels.length === 0 && (
              <div className="p-8 rounded-3xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-center space-y-3">
                <ShieldCheck className="w-8 h-8 text-amber-500 mx-auto" />
                <h4 className="text-lg font-bold text-amber-900 dark:text-amber-200 font-serif">
                  No verified {selectedHotelTier.replace('_', ' ')} hotels located directly inside {location.name}.
                </h4>
                <p className="text-sm text-amber-800 dark:text-amber-300 max-w-xl mx-auto">
                  {location.name} is well-connected to neighboring luxury hubs. Please see verified recommendations below:
                </p>
              </div>
            )}

            {/* Local Hotel Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHotels.map((hotel) => {
                const tierLabel = (hotel.tier || hotel.category || 'stay').replace('_', ' ').replace('-', ' ');

                return (
                  <div
                    key={hotel.id}
                    className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={hotel.imageUrl}
                        alt={hotel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      <div className="absolute top-4 left-4 flex items-center gap-1.5">
                        <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 text-[11px] font-bold border border-white/20">
                          {'★'.repeat(Math.max(1, Math.min(5, hotel.starRating || 3)))} {(tierLabel || 'STAY').toUpperCase()}
                        </span>
                      </div>

                      <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-cyan-600/90 text-white text-[11px] font-bold">
                        ★ {typeof hotel.guestRating === 'number' ? hotel.guestRating.toFixed(1) : '4.5'} / 5.0
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h4 className="text-xl font-bold font-serif leading-tight">
                          {hotel.name}
                        </h4>
                        <p className="text-xs text-slate-200 truncate mt-0.5">{hotel.address}</p>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="flex flex-wrap gap-1.5">
                        {hotel.amenities?.map((am) => (
                          <span
                            key={am}
                            className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                          >
                            {am}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-medium">Starting from</span>
                          <span className="text-lg font-black text-slate-900 dark:text-white">
                            ₹{hotel.pricePerNight.toLocaleString('en-IN')}
                            <span className="text-xs font-normal text-slate-500"> / night</span>
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {onAddToItinerary && (
                            <button
                              onClick={() => onAddToItinerary({
                                id: hotel.id,
                                type: 'hotel',
                                title: hotel.name,
                                locationName: location.name,
                                imageUrl: hotel.imageUrl,
                                subtitle: `₹${hotel.pricePerNight}/night • ${hotel.address}`
                              })}
                              className="p-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-600 text-cyan-600 hover:text-white transition-colors"
                              title="Add to Itinerary"
                            >
                              <CalendarPlus className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setActiveTab('split_map');
                              setSelectedMapItemId(hotel.id);
                            }}
                            className="py-2 px-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs flex items-center gap-1"
                          >
                            <span>View on Map</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* If Small Town rule triggers (0 verified luxury hotels), show neighboring verified luxury stays */}
            {verifiedLuxuryCount === 0 && nearbyWithLuxury.length > 0 && (
              <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-cyan-100 dark:bg-cyan-950 text-cyan-600 flex items-center justify-center">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
                      Nearest Verified Luxury Stays (Neighboring Major Hub)
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      5-star and heritage luxury options accessible via quick highway drive from {location.name}.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {nearbyWithLuxury.map((item) => (
                    <div
                      key={item.id}
                      className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl p-5 border border-cyan-200 dark:border-cyan-900/40 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-600">
                            {item.distanceKm} km ({item.travelTime})
                          </div>
                          <h5 className="font-bold text-base text-slate-900 dark:text-white font-serif">
                            {item.name}
                          </h5>
                          <p className="text-xs text-slate-500">{item.connectivity}</p>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 text-xs font-bold">
                          5★ Hub
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800">
                        <span>Top Stay: Luxury Heritage Suites</span>
                        <button
                          onClick={() => onSelectNearby(item.name.split('(')[0].trim())}
                          className="font-bold text-cyan-600 hover:underline"
                        >
                          Explore Hub →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 6. SPLIT MAP TAB */}
        {activeTab === 'split_map' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 dark:text-white">
                  Interactive Split Map of {location.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Synchronized map & card view. Click any place or stay to pin-point coordinates.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Side: Scrollable Listing Cards */}
              <div className="lg:col-span-5 space-y-3 max-h-[640px] overflow-y-auto pr-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 sticky top-0 bg-slate-50 dark:bg-[#070a10] py-1 z-10">
                  Places & Attractions ({places.length})
                </div>
                {places.map((place) => (
                  <div
                    key={place.id}
                    onClick={() => setSelectedMapItemId(place.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex gap-3 ${
                      selectedMapItemId === place.id
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 shadow-md'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <img
                      src={place.imageUrl}
                      alt={place.name}
                      className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                          {place.category}
                        </span>
                        <span className="text-xs font-bold text-amber-500">★ {place.rating.toFixed(1)}</span>
                      </div>
                      <h5 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                        {place.name}
                      </h5>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {place.address}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 sticky top-0 bg-slate-50 dark:bg-[#070a10] py-1 z-10 pt-4">
                  Hotels & Accommodations ({hotels.length})
                </div>
                {hotels.map((hotel) => (
                  <div
                    key={hotel.id}
                    onClick={() => setSelectedMapItemId(hotel.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex gap-3 ${
                      selectedMapItemId === hotel.id
                        ? 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-500 shadow-md'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <img
                      src={hotel.imageUrl}
                      alt={hotel.name}
                      className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-bold text-cyan-600 uppercase tracking-wider">
                          {hotel.starRating}★ {hotel.tier || hotel.category}
                        </span>
                        <span className="text-xs font-bold text-slate-900 dark:text-white">₹{hotel.pricePerNight}</span>
                      </div>
                      <h5 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                        {hotel.name}
                      </h5>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {hotel.address}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Side: Map Container */}
              <div className="lg:col-span-7 sticky top-36">
                <ErrorBoundary fallbackTitle="Interactive Map View" fallbackMessage="Map view is temporarily reloading.">
                  <InteractiveMap
                    center={location.coordinates}
                    zoom={12}
                    places={places}
                    hotels={hotels}
                    restaurants={restaurants}
                    selectedItemId={selectedMapItemId}
                    onSelectItem={(id) => setSelectedMapItemId(id)}
                    className="h-[600px] w-full rounded-3xl"
                    darkMode={darkMode}
                  />
                </ErrorBoundary>
              </div>
            </div>
          </div>
        )}

        {/* 7. NEARBY EXCURSIONS TAB */}
        {activeTab === 'nearby' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 dark:text-white">
                Nearby Excursions & Neighboring Towns
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Explore neighboring destinations within quick driving distance from {location.name}.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nearby.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-bold">
                        {item.distanceKm} km away
                      </span>
                      <span className="text-xs font-semibold text-slate-400">
                        🚗 {item.travelTime}
                      </span>
                    </div>

                    <h4 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
                      {item.name}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2">
                      {item.connectivity}
                    </p>

                    {item.famousAttractions && item.famousAttractions.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {item.famousAttractions.map(att => (
                          <span key={att} className="text-[11px] px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300">
                            {att}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => onSelectNearby(item.name.split('(')[0].trim())}
                    className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>Explore {item.name.split('(')[0].trim()}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
