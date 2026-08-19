import React from 'react';
import { 
  Sparkles, 
  MapPin, 
  Star, 
  Clock, 
  ArrowRight,
  CalendarPlus 
} from 'lucide-react';
import { PlaceItem } from '../types';

interface PlacesSectionProps {
  onSelectPlaceDestination: (destinationName: string) => void;
  onAddToItinerary?: (item: any) => void;
}

const FEATURED_PLACES: PlaceItem[] = [
  {
    id: 'dashashwamedh-ghat-hp',
    name: 'Dashashwamedh Ghat & Maha Aarti',
    locationName: 'Varanasi',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    category: 'temple',
    description: 'The ancient holy riverfront where thousands gather daily at sunset for the synchronized brass lamp Ganga Aarti.',
    address: 'Dashashwamedh Ghat, Varanasi',
    coordinates: { lat: 25.3069, lng: 83.0104 },
    rating: 5.0,
    reviewsCount: 38000,
    entryFee: 'Free',
    timings: '6:30 PM Aarti',
    bestTimeToVisit: 'Sunset',
    imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
    tags: ['Ganga Aarti', 'Spiritual Center']
  },
  {
    id: 'upper-lake-bhopal-hp',
    name: 'Upper Lake (Bhojtal) & VIP Road',
    locationName: 'Bhopal',
    district: 'Bhopal',
    state: 'Madhya Pradesh',
    category: 'lake',
    description: 'Asia’s largest man-made lake flanked by scenic hill drives, cruising boats, and Raja Bhoj statue in the water.',
    address: 'VIP Road, Bhopal',
    coordinates: { lat: 23.2458, lng: 77.3824 },
    rating: 4.8,
    reviewsCount: 14200,
    entryFee: 'Free',
    timings: '6:00 AM - 9:00 PM',
    bestTimeToVisit: 'Evening Sunset',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    tags: ['City of Lakes', 'Sunset Cruise']
  },
  {
    id: 'golden-temple-amritsar-hp',
    name: 'Sri Harmandir Sahib (Golden Temple)',
    locationName: 'Amritsar',
    district: 'Amritsar',
    state: 'Punjab',
    category: 'gurudwara',
    description: 'The sacred golden sanctuary surrounded by holy waters, serving free meals to over 100,000 pilgrims everyday.',
    address: 'Heritage Street, Amritsar',
    coordinates: { lat: 31.6200, lng: 74.8765 },
    rating: 5.0,
    reviewsCount: 52000,
    entryFee: 'Free',
    timings: '24 Hours',
    bestTimeToVisit: 'Early Morning / Night',
    imageUrl: 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=800&q=80',
    tags: ['Holiest Sikh Shrine', 'World Kitchen']
  },
  {
    id: 'sidh-ganesha-sehore-hp',
    name: 'Ancient Sidh Ganesha Mandir',
    locationName: 'Sehore',
    district: 'Sehore',
    state: 'Madhya Pradesh',
    category: 'temple',
    description: 'Centuries-old historic shrine revered across the Malwa region, renovated during the Peshwa era.',
    address: 'Gopalpur, Sehore',
    coordinates: { lat: 23.1952, lng: 77.0681 },
    rating: 4.8,
    reviewsCount: 5400,
    entryFee: 'Free',
    timings: '5:00 AM - 9:00 PM',
    bestTimeToVisit: 'Morning Aarti',
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    tags: ['Ancient Temple', 'Malwa Heritage']
  },
  {
    id: 'sarafa-bazaar-indore-hp',
    name: 'Sarafa Midnight Food Bazaar',
    locationName: 'Indore',
    district: 'Indore',
    state: 'Madhya Pradesh',
    category: 'market',
    description: 'Jewelry market by daylight that awakens as India’s wildest midnight street food street after 8:30 PM.',
    address: 'Sarafa Bazaar, Indore',
    coordinates: { lat: 22.7182, lng: 75.8543 },
    rating: 4.9,
    reviewsCount: 26000,
    entryFee: 'Free',
    timings: '8:30 PM - 2:00 AM',
    bestTimeToVisit: 'Night',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    tags: ['Midnight Culture', 'Food Carnival']
  },
  {
    id: 'bhimbetka-caves-hp',
    name: 'Bhimbetka Prehistoric Caves (UNESCO)',
    locationName: 'Bhopal',
    district: 'Raisen / Bhopal',
    state: 'Madhya Pradesh',
    category: 'monument',
    description: '30,000-year-old rock shelters inside dense forests featuring paleolithic hunting art and ancient stone tools.',
    address: 'Bhimbetka, 45 km from Bhopal',
    coordinates: { lat: 22.9372, lng: 77.6128 },
    rating: 4.8,
    reviewsCount: 8200,
    entryFee: '₹25',
    timings: '7:00 AM - 5:30 PM',
    bestTimeToVisit: 'Winter Morning',
    imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    tags: ['UNESCO World Heritage', 'Prehistoric']
  }
];

export const PlacesSection: React.FC<PlacesSectionProps> = ({ 
  onSelectPlaceDestination,
  onAddToItinerary
}) => {
  return (
    <section id="places-section" className="py-16 sm:py-24 bg-slate-50 dark:bg-[#070a10] transition-colors border-b border-slate-200 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cultural & Natural Wonders</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif tracking-tight text-slate-900 dark:text-white">
              Places You Can't Miss
            </h2>
            <p className="mt-2 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl">
              Sacred ghats, centuries-old temples, tranquil lakes, prehistoric rock art, and buzzing bazaars.
            </p>
          </div>
        </div>

        {/* Places Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FEATURED_PLACES.map((place) => (
            <div
              key={place.id}
              className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image with Tag Overlay */}
              <div className="relative h-56 sm:h-60 overflow-hidden">
                <img
                  src={place.imageUrl}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                {/* Category Pill */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold border border-white/20 uppercase tracking-wider">
                    {place.category}
                  </span>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-bold text-amber-300 border border-white/20">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{place.rating.toFixed(1)}</span>
                </div>

                {/* Title & Location in Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-1 text-xs font-semibold text-emerald-300 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{place.locationName}, {place.state}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif leading-snug drop-shadow-md">
                    {place.name}
                  </h3>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {place.description}
                </p>

                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{place.timings}</span>
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-slate-200">
                    Entry: {place.entryFee}
                  </span>
                </div>

                {/* Explore Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectPlaceDestination(place.locationName)}
                    className="flex-1 py-3 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 text-slate-900 dark:text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 group/btn shadow-sm"
                  >
                    <span>Explore {place.locationName}</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                  {onAddToItinerary && (
                    <button
                      onClick={() => onAddToItinerary({
                        id: place.id,
                        type: 'place',
                        title: place.name,
                        locationName: place.locationName,
                        imageUrl: place.imageUrl,
                        subtitle: `${place.category} • ${place.timings}`
                      })}
                      className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-700 dark:text-slate-300 transition-colors"
                      title="Add to Itinerary"
                    >
                      <CalendarPlus className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
