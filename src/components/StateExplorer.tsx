import React, { useState } from 'react';
import { 
  MapPin, 
  Utensils, 
  Compass,
  ArrowRight
} from 'lucide-react';
import { ALL_INDIAN_STATES } from '../data/indiaGeographicData';
import { IndiaRegion, StateInfo } from '../types';

interface StateExplorerProps {
  onSelectDestination: (destName: string) => void;
}

const REGIONS: Array<{ label: string; value: 'All' | IndiaRegion }> = [
  { label: 'All India', value: 'All' },
  { label: 'Central India', value: 'Central' },
  { label: 'North India', value: 'North' },
  { label: 'South India', value: 'South' },
  { label: 'West India', value: 'West' },
  { label: 'East India', value: 'East' },
  { label: 'Northeast India', value: 'Northeast' }
];

export const StateExplorer: React.FC<StateExplorerProps> = ({ onSelectDestination }) => {
  const [selectedRegion, setSelectedRegion] = useState<'All' | IndiaRegion>('All');
  const [hoveredState, setHoveredState] = useState<StateInfo | null>(null);

  const filteredStates = selectedRegion === 'All'
    ? ALL_INDIAN_STATES
    : ALL_INDIAN_STATES.filter((s) => s.region === selectedRegion);

  return (
    <section id="states-section" className="py-16 sm:py-24 bg-slate-50 dark:bg-[#070a10] border-b border-slate-200 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>Hierarchical State Discovery</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif tracking-tight text-slate-900 dark:text-white">
              Explore India
            </h2>
            <p className="mt-2 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
              Select any state to drill down from State &rarr; District &rarr; City &rarr; Local Food & Stays.
            </p>
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
            {REGIONS.map((reg) => (
              <button
                key={reg.value}
                onClick={() => setSelectedRegion(reg.value)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  selectedRegion === reg.value
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {reg.label}
              </button>
            ))}
          </div>
        </div>

        {/* State Grid Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredStates.map((state) => (
            <div
              key={state.code}
              onMouseEnter={() => setHoveredState(state)}
              className="group relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Container with Zoom */}
              <div className="relative h-52 sm:h-56 overflow-hidden">
                <img
                  src={state.coverImage}
                  alt={state.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    // Graceful fallback to rich India stock
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* State Region & Districts Pill */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[11px] font-bold border border-white/20">
                    {state.region} India
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-orange-500/90 text-white text-[11px] font-bold shadow">
                    {state.districtsCount} Districts
                  </span>
                </div>

                {/* State Title & Tagline in Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-2xl font-bold font-serif leading-tight">
                    {state.name}
                  </h3>
                  <p className="text-xs text-orange-200/90 font-medium italic mt-0.5 line-clamp-1">
                    "{state.tagline}"
                  </p>
                </div>
              </div>

              {/* State Details Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {state.description}
                </p>

                {/* Famous Foods Badges */}
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2">
                    <Utensils className="w-3.5 h-3.5" />
                    <span>Signature Local Food</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {state.famousFoods.slice(0, 3).map((food) => (
                      <span
                        key={food}
                        className="text-xs px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-900/60 font-medium"
                      >
                        {food}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Top Destinations Chips */}
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Top Towns & Cities</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {state.topDestinations.slice(0, 4).map((dest) => (
                      <button
                        key={dest}
                        onClick={() => onSelectDestination(dest)}
                        className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 transition-colors font-medium"
                      >
                        {dest}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Explore State Primary Button */}
                <button
                  onClick={() => onSelectDestination(state.capital)}
                  className="w-full mt-2 py-3 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 text-slate-900 dark:text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 group/btn shadow-sm"
                >
                  <span>Explore {state.name} Hubs</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
