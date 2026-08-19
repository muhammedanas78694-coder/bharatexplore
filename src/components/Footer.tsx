import React from 'react';
import { Compass, MapPin, Utensils, Building2 } from 'lucide-react';
import { ALL_INDIAN_STATES } from '../data/indiaGeographicData';

interface FooterProps {
  onSelectStateDestination: (capitalOrCity: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectStateDestination }) => {
  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 via-amber-500 to-emerald-500 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-[#0b0f17] rounded-[10px] flex items-center justify-center">
                  <Compass className="w-5 h-5 text-orange-400" />
                </div>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white">
                  BharatExplore
                </span>
                <span className="text-[10px] font-bold ml-2 px-2 py-0.5 rounded-full bg-orange-950 text-orange-300 border border-orange-800">
                  INDIA 🇮🇳
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              The premier India-wide travel, food, and culture discovery platform. Covering all 28 states, 8 union territories, district headquarters, and towns.
            </p>

            <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                <span>All Indian States</span>
              </span>
              <span className="flex items-center gap-1">
                <Utensils className="w-3.5 h-3.5 text-amber-400" />
                <span>Hyper-Local Food</span>
              </span>
              <span className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Verified Stays</span>
              </span>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-4">
              Regional Escapes
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onSelectStateDestination('Bhopal')} className="hover:text-orange-400 transition-colors">
                  Central India (MP, Chhattisgarh)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectStateDestination('Amritsar')} className="hover:text-orange-400 transition-colors">
                  North India (Punjab, UP, Himachal)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectStateDestination('Munnar')} className="hover:text-orange-400 transition-colors">
                  South India (Kerala, Karnataka, TN)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectStateDestination('Jaipur')} className="hover:text-orange-400 transition-colors">
                  West India (Rajasthan, Gujarat, Goa)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectStateDestination('Kolkata')} className="hover:text-orange-400 transition-colors">
                  East & Northeast India
                </button>
              </li>
            </ul>
          </div>

          {/* Food Capitals */}
          <div>
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-4">
              Culinary Capitals
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onSelectStateDestination('Indore')} className="hover:text-amber-400 transition-colors">
                  Indore: Sarafa & 56 Dukan
                </button>
              </li>
              <li>
                <button onClick={() => onSelectStateDestination('Varanasi')} className="hover:text-amber-400 transition-colors">
                  Varanasi: Tamatar Chaat & Malaiyyo
                </button>
              </li>
              <li>
                <button onClick={() => onSelectStateDestination('Amritsar')} className="hover:text-amber-400 transition-colors">
                  Amritsar: Tandoor Kulchas & Lassi
                </button>
              </li>
              <li>
                <button onClick={() => onSelectStateDestination('Bhopal')} className="hover:text-amber-400 transition-colors">
                  Bhopal: Nawabi Korma & Poha
                </button>
              </li>
              <li>
                <button onClick={() => onSelectStateDestination('Sehore')} className="hover:text-amber-400 transition-colors">
                  Sehore: Sharbati Dal Bafla
                </button>
              </li>
            </ul>
          </div>

          {/* Heritage Hubs */}
          <div>
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-4">
              Sacred & Heritage
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onSelectStateDestination('Varanasi')} className="hover:text-emerald-400 transition-colors">
                  Ganga Ghats of Varanasi
                </button>
              </li>
              <li>
                <button onClick={() => onSelectStateDestination('Ujjain')} className="hover:text-emerald-400 transition-colors">
                  Mahakal Lok, Ujjain
                </button>
              </li>
              <li>
                <button onClick={() => onSelectStateDestination('Pachmarhi')} className="hover:text-emerald-400 transition-colors">
                  Satpura Hills & Bee Falls
                </button>
              </li>
              <li>
                <button onClick={() => onSelectStateDestination('Amritsar')} className="hover:text-emerald-400 transition-colors">
                  Sri Harmandir Sahib
                </button>
              </li>
              <li>
                <button onClick={() => onSelectStateDestination('Sehore')} className="hover:text-emerald-400 transition-colors">
                  Ancient Sidh Ganesha
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* All States Index Directory */}
        <div className="pt-8 border-t border-slate-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Explore All 28 States & Territories of India
          </h4>
          <div className="flex flex-wrap gap-2">
            {ALL_INDIAN_STATES.map((state) => (
              <button
                key={state.code}
                onClick={() => onSelectStateDestination(state.capital)}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-orange-500 text-slate-300 hover:text-white transition-colors"
              >
                {state.name}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} BharatExplore. Designed with pride for India.</p>
          <p className="flex items-center gap-1">
            <span>Made for travel, culture & culinary heritage across every Indian district.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
