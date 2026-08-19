import React, { useState } from 'react';
import { 
  Building2, 
  MapPin,
  ArrowRight,
  ShieldCheck,
  CalendarPlus
} from 'lucide-react';
import { HotelItem, HotelTier } from '../types';

interface HotelDiscoverySectionProps {
  onSelectHotelDestination: (destinationName: string) => void;
  onAddToItinerary?: (item: any) => void;
}

const FEATURED_HOTELS: HotelItem[] = [
  // Luxury / 5-star
  {
    id: 'taj-ganges-varanasi-hp',
    name: 'Taj Ganges, Varanasi',
    locationName: 'Varanasi',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    tier: '5_star',
    starRating: 5,
    guestRating: 4.8,
    reviewsCount: 3400,
    pricePerNight: 16500,
    address: 'Nadesar Palace Grounds, Varanasi',
    coordinates: { lat: 25.3340, lng: 82.9810 },
    amenities: ['Heritage Palace Gardens', 'Fine Dining', 'Luxury Spa', 'Swimming Pool', 'Airport Transfer'],
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    bookingLink: '#',
    isVerified: true
  },
  {
    id: 'jehan-numa-palace-bhopal-hp',
    name: 'Jehan Numa Palace Hotel',
    locationName: 'Bhopal',
    district: 'Bhopal',
    state: 'Madhya Pradesh',
    tier: 'luxury',
    starRating: 5,
    guestRating: 4.9,
    reviewsCount: 4200,
    pricePerNight: 11500,
    address: '157 Shamla Hills, Bhopal',
    coordinates: { lat: 23.2390, lng: 77.3870 },
    amenities: ['Colonial Architecture', 'Horse Riding Track', 'Courtyard Cafe', 'Fine Dining', 'Pool'],
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    bookingLink: '#',
    isVerified: true
  },
  {
    id: 'radisson-blu-indore-hp',
    name: 'Radisson Blu Hotel Indore',
    locationName: 'Indore',
    district: 'Indore',
    state: 'Madhya Pradesh',
    tier: '5_star',
    starRating: 5,
    guestRating: 4.7,
    reviewsCount: 2900,
    pricePerNight: 7200,
    address: 'Ring Road, Vijay Nagar, Indore',
    coordinates: { lat: 22.7533, lng: 75.8937 },
    amenities: ['Rooftop Pool', 'Multi-Cuisine Buffet', 'Business Lounge', 'Spa & Wellness', 'Free Wi-Fi'],
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
    bookingLink: '#',
    isVerified: true
  },

  // 4-star / 3-star
  {
    id: 'sayaji-hotel-indore-hp',
    name: 'Sayaji Hotel Indore',
    locationName: 'Indore',
    district: 'Indore',
    state: 'Madhya Pradesh',
    tier: '4_star',
    starRating: 4,
    guestRating: 4.6,
    reviewsCount: 3100,
    pricePerNight: 4800,
    address: 'H-1 Scheme No. 54, Vijay Nagar, Indore',
    coordinates: { lat: 22.7480, lng: 75.8940 },
    amenities: ['Mediterra Rooftop', 'Chopstick City', 'Bowling Alley', 'Gym', 'Free Breakfast'],
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    bookingLink: '#',
    isVerified: true
  },
  {
    id: 'courtyard-marriott-bhopal-hp',
    name: 'Courtyard by Marriott Bhopal',
    locationName: 'Bhopal',
    district: 'Bhopal',
    state: 'Madhya Pradesh',
    tier: '4_star',
    starRating: 4,
    guestRating: 4.7,
    reviewsCount: 2600,
    pricePerNight: 5500,
    address: 'DB City Mall, Arera Hills, Bhopal',
    coordinates: { lat: 23.2325, lng: 77.4300 },
    amenities: ['Attached to Mall', 'Outdoor Pool', 'MoMo Cafe', 'Fitness Centre', 'Valet Parking'],
    imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    bookingLink: '#',
    isVerified: true
  },

  // 3-star & Budget
  {
    id: 'hotel-tulsi-sehore-hp',
    name: 'Hotel Tulsi & Heritage Resort',
    locationName: 'Sehore',
    district: 'Sehore',
    state: 'Madhya Pradesh',
    tier: '3_star',
    starRating: 3,
    guestRating: 4.3,
    reviewsCount: 850,
    pricePerNight: 1950,
    address: 'Bhopal-Indore Bypass Road, Sehore',
    coordinates: { lat: 23.2000, lng: 77.0850 },
    amenities: ['Pure Veg Malwi Restaurant', 'AC Rooms', 'Lawn Garden', 'Safe Parking', 'Wi-Fi'],
    imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    bookingLink: '#',
    isVerified: true
  },
  {
    id: 'ganesh-yatri-niwas-sehore-hp',
    name: 'Shree Ganesh Yatri Niwas (Clean Budget)',
    locationName: 'Sehore',
    district: 'Sehore',
    state: 'Madhya Pradesh',
    tier: 'budget',
    starRating: 2,
    guestRating: 4.2,
    reviewsCount: 620,
    pricePerNight: 850,
    address: 'Near Sidh Ganesha Temple, Sehore',
    coordinates: { lat: 23.1960, lng: 77.0690 },
    amenities: ['Temple Proximity', 'Clean Hot Water', '24hr Front Desk', 'Filter Water', 'Family Rooms'],
    imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
    bookingLink: '#',
    isVerified: true
  }
];

const TIER_FILTERS: Array<{ label: string; value: 'all' | HotelTier }> = [
  { label: 'All Stays', value: 'all' },
  { label: '5★ Luxury & Palaces', value: '5_star' },
  { label: '4★ Premium', value: '4_star' },
  { label: '3★ Comfort', value: '3_star' },
  { label: 'Verified Budget (Under ₹1500)', value: 'budget' }
];

export const HotelDiscoverySection: React.FC<HotelDiscoverySectionProps> = ({
  onSelectHotelDestination,
  onAddToItinerary
}) => {
  const [selectedTier, setSelectedTier] = useState<'all' | HotelTier>('all');

  const filteredHotels = selectedTier === 'all'
    ? FEATURED_HOTELS
    : FEATURED_HOTELS.filter((h) => h.tier === selectedTier || (selectedTier === '5_star' && h.tier === 'luxury'));

  return (
    <section id="hotels-section" className="py-16 sm:py-24 bg-white dark:bg-[#0b0f17] transition-colors border-b border-slate-200 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Building2 className="w-3.5 h-3.5" />
              <span>Verified Indian Hospitality</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif tracking-tight text-slate-900 dark:text-white">
              Stay Your Way
            </h2>
            <p className="mt-2 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl">
              From historic palace suites in heritage cities to clean, dependable guest houses in small towns.
            </p>
          </div>

          {/* Tier Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
            {TIER_FILTERS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setSelectedTier(tab.value)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  selectedTier === tab.value
                    ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/25'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Hotel Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="group bg-slate-50 dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Hotel Photo */}
              <div className="relative h-52 sm:h-56 overflow-hidden">
                <img
                  src={hotel.imageUrl}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Star Badge & Verification */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 text-[11px] font-bold border border-white/20 flex items-center gap-1">
                    {'★'.repeat(Math.max(1, Math.min(5, hotel.starRating || 3)))} {(hotel.tier ? String(hotel.tier) : (hotel.category ? String(hotel.category) : 'Stay')).replace('_', ' ').toUpperCase()}
                  </span>
                  {hotel.isVerified && (
                    <span className="p-1 rounded-full bg-emerald-500 text-white shadow-sm" title="Verified Property">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>

                {/* Guest Rating Score */}
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-cyan-600/90 text-white text-[11px] font-bold shadow">
                  ★ {typeof hotel.guestRating === 'number' ? hotel.guestRating.toFixed(1) : '4.5'} / 5.0
                </div>

                {/* Location & Title */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-1 text-xs font-medium text-cyan-200 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{hotel.locationName}, {hotel.state}</span>
                  </div>
                  <h3 className="text-xl font-bold font-serif leading-snug drop-shadow-md">
                    {hotel.name}
                  </h3>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                {/* Amenities Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {hotel.amenities.slice(0, 3).map((amenity) => (
                    <span
                      key={amenity}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 font-medium"
                    >
                      {amenity}
                    </span>
                  ))}
                  {hotel.amenities.length > 3 && (
                    <span className="text-[11px] px-1.5 py-0.5 text-slate-400">
                      +{hotel.amenities.length - 3} more
                    </span>
                  )}
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
                  <div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">Starting from</span>
                    <span className="text-xl font-black text-slate-900 dark:text-white">
                      ₹{hotel.pricePerNight.toLocaleString('en-IN')}
                      <span className="text-xs font-normal text-slate-500"> / night</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectHotelDestination(hotel.locationName)}
                      className="py-2.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs transition-all shadow-md shadow-cyan-600/20 flex items-center gap-1.5"
                    >
                      <span>View Stays</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    {onAddToItinerary && (
                      <button
                        onClick={() => onAddToItinerary({
                          id: hotel.id,
                          type: 'hotel',
                          title: hotel.name,
                          locationName: hotel.locationName,
                          imageUrl: hotel.imageUrl,
                          subtitle: `₹${hotel.pricePerNight.toLocaleString('en-IN')}/night • ${hotel.address}`
                        })}
                        className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-cyan-600 hover:text-white text-slate-700 dark:text-slate-300 transition-colors"
                        title="Add to Itinerary"
                      >
                        <CalendarPlus className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
