import React, { useRef } from 'react';
import { 
  Utensils, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  MapPin,
  ArrowRight,
  CalendarPlus
} from 'lucide-react';
import { FoodItem } from '../types';

interface TasteIndiaSectionProps {
  onSelectFoodDestination: (destinationName: string) => void;
  onSaveItem?: (item: any) => void;
  savedItemIds?: string[];
  onAddToItinerary?: (item: any) => void;
}

const FEATURED_INDIAN_FOODS: FoodItem[] = [
  {
    id: 'indore-poha-jalebi',
    name: 'Indori Poha-Jalebi & Sev',
    category: 'breakfast',
    description: 'Steamed flattened rice spiced with fennel, pomegranate pearls, topped with spicy Ratlami sev and paired with hot crisp saffron jalebi.',
    originLocation: 'Indore',
    district: 'Indore',
    state: 'Madhya Pradesh',
    isVegetarian: true,
    spiceLevel: 'Medium',
    rating: 5.0,
    priceRange: '₹30 - ₹70',
    iconicPlacesToEat: ['Prashant Poha (Jail Road)', '56 Dukan Stalls'],
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    tags: ['Street Food Capital', 'Breakfast GI Pride']
  },
  {
    id: 'varanasi-tamatar-chaat',
    name: 'Banarasi Tamatar Chaat',
    category: 'street_food',
    description: 'Spiced tomato mash simmered with cashews, hing, ginger, drenched in roasted jeera sugar-syrup and served in an earthen clay kulhad.',
    originLocation: 'Varanasi',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    isVegetarian: true,
    spiceLevel: 'Spicy',
    rating: 5.0,
    priceRange: '₹40 - ₹80',
    iconicPlacesToEat: ['Kashi Chaat Bhandar', 'Deena Chaat'],
    imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80',
    tags: ['Banaras Exclusive', 'Kulhad Specialty']
  },
  {
    id: 'amritsari-chur-chur-kulcha',
    name: 'Amritsari Chur-Chur Kulcha',
    category: 'traditional_main',
    description: 'Crispy layered tandoor-baked flatbread stuffed with spiced potato and onions, crushed by hand with melting butter, served with pindi chole.',
    originLocation: 'Amritsar',
    district: 'Amritsar',
    state: 'Punjab',
    isVegetarian: true,
    spiceLevel: 'Medium',
    rating: 5.0,
    priceRange: '₹70 - ₹120',
    iconicPlacesToEat: ['Bhai Kulwant Singh', 'Kesar Da Dhaba'],
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    tags: ['Pure Desi Ghee', 'Punjabi Heritage']
  },
  {
    id: 'sehore-dal-bafla',
    name: 'Sehore Sharbati Dal Bafla',
    category: 'traditional_main',
    description: 'Wood-fire baked wheat dough dumplings made with world-famous Sehore Sharbati wheat, soaked in desi ghee with spicy toor dal.',
    originLocation: 'Sehore',
    district: 'Sehore',
    state: 'Madhya Pradesh',
    isVegetarian: true,
    spiceLevel: 'Medium',
    rating: 4.9,
    priceRange: '₹140 - ₹220',
    iconicPlacesToEat: ['Shri Ram Bhojnalaya', 'Malwa Dhaba'],
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    tags: ['Sharbati Wheat', 'Malwa Feast']
  },
  {
    id: 'bhopali-gosht-korma',
    name: 'Bhopali Royal Gosht Korma',
    category: 'traditional_main',
    description: 'Slow-cooked Nawabi spiced mutton in a velvety onion-yogurt gravy seasoned with royal Afghan and Mughal spices.',
    originLocation: 'Bhopal',
    district: 'Bhopal',
    state: 'Madhya Pradesh',
    isVegetarian: false,
    spiceLevel: 'Medium',
    rating: 4.9,
    priceRange: '₹250 - ₹450',
    iconicPlacesToEat: ['Hakeem Hotel', 'Jehan Numa Palace'],
    imageUrl: 'https://images.unsplash.com/photo-1545247181-516773cae7be?auto=format&fit=crop&w=800&q=80',
    tags: ['Nawabi Royalty', 'Old City Special']
  },
  {
    id: 'banarasi-malaiyyo',
    name: 'Winter Dew Malaiyyo (Makhan Malai)',
    category: 'sweet',
    description: 'A cloud-like winter foam dessert churned from overnight dew-cooled milk, infused with saffron, green cardamom, and pistachios.',
    originLocation: 'Varanasi',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    isVegetarian: true,
    spiceLevel: 'Mild',
    rating: 5.0,
    priceRange: '₹50 - ₹100',
    iconicPlacesToEat: ['Shreeji Sweets Chaukhamba', 'Neelkanth'],
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    tags: ['Winter Miracle', 'Ephemeral Dessert']
  }
];

export const TasteIndiaSection: React.FC<TasteIndiaSectionProps> = ({
  onSelectFoodDestination,
  onSaveItem,
  savedItemIds = [],
  onAddToItinerary
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="food-section" className="py-16 sm:py-24 bg-white dark:bg-[#0b0f17] transition-colors border-b border-slate-200 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Utensils className="w-3.5 h-3.5" />
              <span>Hyper-Local Gastronomy</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif tracking-tight text-slate-900 dark:text-white">
              Taste India
            </h2>
            <p className="mt-2 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl">
              Authentic street food, regional delicacies, and centuries-old recipes tied to every specific Indian town.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-orange-500 hover:text-white text-slate-700 dark:text-slate-300 transition-colors shadow-sm"
              title="Scroll Left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-orange-500 hover:text-white text-slate-700 dark:text-slate-300 transition-colors shadow-sm"
              title="Scroll Right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Food Gallery */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 no-scrollbar scroll-smooth"
        >
          {FEATURED_INDIAN_FOODS.map((food) => {
            const isSaved = savedItemIds.includes(food.id);

            return (
              <div
                key={food.id}
                className="group flex-shrink-0 w-[300px] sm:w-[340px] md:w-[380px] bg-slate-50 dark:bg-slate-900/90 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-2xl hover:shadow-orange-500/15 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Large Food Image */}
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <img
                    src={food.imageUrl}
                    alt={food.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Veg / Non-Veg Indicator */}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-bold text-white border border-white/20">
                    <span className={`w-2 h-2 rounded-full ${food.isVegetarian ? 'bg-emerald-400' : 'bg-red-500'}`} />
                    <span>{food.isVegetarian ? 'Pure Veg' : 'Non-Veg'}</span>
                  </div>

                  {/* Rating & Price in Overlay */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-bold text-amber-300 border border-white/20">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{food.rating.toFixed(1)}</span>
                  </div>

                  {/* Origin City Tag */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-1 text-xs font-semibold text-orange-300 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-orange-400" />
                      <span>{food.originLocation}, {food.state}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-serif leading-snug drop-shadow-md">
                      {food.name}
                    </h3>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {food.description}
                  </p>

                  <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <span>Approx Price: <strong className="text-slate-900 dark:text-white font-bold">{food.priceRange}</strong></span>
                    <span className="text-orange-600 dark:text-orange-400 font-semibold">{food.spiceLevel} Spice</span>
                  </div>

                  {/* Action CTA Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectFoodDestination(food.originLocation)}
                      className="flex-1 py-3 px-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-orange-500/25 flex items-center justify-center gap-2 group/btn"
                    >
                      <span>Discover in {food.originLocation}</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                    {onAddToItinerary && (
                      <button
                        onClick={() => onAddToItinerary({
                          id: food.id,
                          type: 'food',
                          title: food.name,
                          locationName: food.originLocation,
                          imageUrl: food.imageUrl,
                          subtitle: `${food.description.slice(0, 75)}...`
                        })}
                        className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-orange-500 hover:text-white text-slate-700 dark:text-slate-300 transition-colors"
                        title="Add to Itinerary"
                      >
                        <CalendarPlus className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
