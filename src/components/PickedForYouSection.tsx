import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface PickedForYouSectionProps {
  onSelectDestination: (destName: string) => void;
}

const CURATED_COLLECTIONS = [
  {
    id: 'street-food-trail',
    title: 'Street Food Capital Circuit',
    tagline: 'Indori Poha, Malwi Bafla, Bhopali Korma & Rabri Jalebi',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    tag: 'Gastronomy Trail',
    stops: ['Indore', 'Bhopal', 'Sehore', 'Ujjain'],
    primaryActionDestination: 'Indore'
  },
  {
    id: 'spiritual-awakening',
    title: 'Sacred Riverfronts & Sanctuaries',
    tagline: 'Varanasi Ghat Aarti, Amritsar Golden Temple & Mahakal Lok',
    imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
    tag: 'Spiritual Legacy',
    stops: ['Varanasi', 'Amritsar', 'Ujjain', 'Rishikesh'],
    primaryActionDestination: 'Varanasi'
  },
  {
    id: 'royal-heritage-forts',
    title: 'Forts, Palaces & Lake Havelis',
    tagline: 'Centuries-old stone bastions, Rajput architecture & royal suites',
    imageUrl: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80',
    tag: 'Royal Heritage',
    stops: ['Jaipur', 'Udaipur', 'Gwalior', 'Jodhpur'],
    primaryActionDestination: 'Jaipur'
  },
  {
    id: 'nature-hill-stations',
    title: 'Pristine Valleys & Hill Retreats',
    tagline: 'Queen of Satpura waterfalls, tea gardens & mist-clad valleys',
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    tag: 'Mountain Escapes',
    stops: ['Pachmarhi', 'Munnar', 'Coorg', 'Manali'],
    primaryActionDestination: 'Pachmarhi'
  }
];

export const PickedForYouSection: React.FC<PickedForYouSectionProps> = ({
  onSelectDestination
}) => {
  return (
    <section className="py-16 sm:py-24 bg-slate-50 dark:bg-[#070a10] transition-colors border-b border-slate-200 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personalized Discovery</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif tracking-tight text-slate-900 dark:text-white">
              Picked For You
            </h2>
            <p className="mt-2 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl">
              Curated regional trails designed for food lovers, spiritual seekers, and heritage explorers.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {CURATED_COLLECTIONS.map((col) => (
            <div
              key={col.id}
              className="group relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg min-h-[300px] flex flex-col justify-end p-6 sm:p-8"
            >
              <img
                src={col.imageUrl}
                alt={col.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

              <div className="relative z-10 text-white space-y-3">
                <span className="px-3 py-1 rounded-full bg-orange-500 text-white text-[11px] font-bold uppercase tracking-wider">
                  {col.tag}
                </span>

                <h3 className="text-2xl sm:text-3xl font-bold font-serif leading-tight">
                  {col.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed">
                  {col.tagline}
                </p>

                {/* Circuit Stops Chips */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  <span className="text-[11px] font-semibold text-orange-300">Featured Stops:</span>
                  {col.stops.map((stop) => (
                    <button
                      key={stop}
                      onClick={() => onSelectDestination(stop)}
                      className="text-xs px-2.5 py-0.5 rounded-md bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white font-medium transition-colors"
                    >
                      {stop}
                    </button>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onSelectDestination(col.primaryActionDestination)}
                    className="py-2.5 px-4 rounded-xl bg-white text-slate-900 hover:bg-orange-500 hover:text-white font-bold text-xs transition-all flex items-center gap-2"
                  >
                    <span>Start Trail at {col.primaryActionDestination}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
