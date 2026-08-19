export type IndiaRegion = 'North' | 'South' | 'East' | 'West' | 'Central' | 'Northeast';

export interface Coordinates {
  lat: number;
  lng: number;
}

export type LocationTier = 
  | 'metro' 
  | 'tier-1' 
  | 'tier-2' 
  | 'tier-3' 
  | 'district_hq' 
  | 'town' 
  | 'small_town'
  | 'village' 
  | 'hill_station' 
  | 'religious' 
  | 'coastal' 
  | 'heritage'
  | 'nature';

export interface LocationItem {
  id: string;
  name: string;
  hindiName?: string;
  region: IndiaRegion;
  state: string;
  district: string;
  tier: LocationTier;
  pinCodes: string[];
  coordinates: Coordinates;
  tagline: string;
  overview: string;
  bestTimeToVisit: string;
  idealDuration: string;
  weatherSnippet: {
    temp: string;
    condition: string;
    bestSeason: string;
  };
  coverImage: string;
  gallery: string[];
  famousFor: string[];
}

export type FoodCategory = 'street_food' | 'traditional_main' | 'sweet' | 'snack' | 'beverage' | 'breakfast' | string;

export interface FoodItem {
  id: string;
  name: string;
  hindiName?: string;
  category: FoodCategory;
  description: string;
  originLocation: string;
  district: string;
  state: string;
  isVegetarian: boolean;
  spiceLevel: 'Mild' | 'Medium' | 'Spicy';
  rating: number;
  priceRange: string;
  iconicPlacesToEat: string[];
  imageUrl: string;
  tags: string[];
}

export type PlaceCategory = 
  | 'monument' 
  | 'temple' 
  | 'mosque' 
  | 'church' 
  | 'gurudwara' 
  | 'fort' 
  | 'palace'
  | 'museum' 
  | 'lake' 
  | 'waterfall' 
  | 'park' 
  | 'market' 
  | 'nature' 
  | 'adventure' 
  | 'hidden_gem'
  | string;

export interface PlaceItem {
  id: string;
  name: string;
  locationName: string;
  district: string;
  state: string;
  category: PlaceCategory;
  description: string;
  address: string;
  coordinates: Coordinates;
  rating: number;
  reviewsCount: number;
  entryFee: string;
  timings: string;
  bestTimeToVisit: string;
  imageUrl: string;
  distanceFromCenter?: string;
  tags: string[];
}

export type HotelCategory = 'budget' | '3-star' | '4-star' | '5-star' | 'luxury' | '3_star' | '4_star' | '5_star';
export type HotelTier = HotelCategory;

export interface HotelItem {
  id: string;
  name: string;
  locationName: string;
  district: string;
  state: string;
  category?: HotelCategory;
  tier?: HotelCategory;
  starRating: number;
  guestRating: number;
  reviewsCount: number;
  pricePerNight: number;
  address: string;
  coordinates: Coordinates;
  amenities: string[];
  imageUrl: string;
  isNearbyCityFallback?: boolean;
  fallbackCityName?: string;
  distanceFromSearchedLocation?: string;
  bookingLink?: string;
  isVerified?: boolean;
}

export interface RestaurantItem {
  id: string;
  name: string;
  locationName: string;
  district: string;
  state: string;
  cuisine?: string[];
  cuisines?: string[];
  rating: number;
  reviewsCount: number;
  priceForTwo?: number;
  costForTwo?: string;
  isPureVeg: boolean;
  address: string;
  coordinates: Coordinates;
  mustTryDishes?: string[];
  signatureDishes?: string[];
  timings: string;
  imageUrl: string;
  distanceFromCenter?: string;
  phone?: string;
}

export interface NearbyDestination {
  id: string;
  name: string;
  district: string;
  state: string;
  distanceKm: number;
  travelTime: string;
  connectivity: string;
  famousAttractions: string[];
  famousFood: string[];
  hasLuxuryHotels: boolean;
  coverImage: string;
}

export interface DestinationDetail {
  location: LocationItem;
  foods: FoodItem[];
  places: PlaceItem[];
  hotels: HotelItem[];
  restaurants: RestaurantItem[];
  nearby: NearbyDestination[];
  verifiedLuxuryCount: number;
}

export type LocationDetails = DestinationDetail;

export interface StateInfo {
  name: string;
  code: string;
  capital: string;
  region: IndiaRegion;
  tagline: string;
  description: string;
  districtsCount: number;
  famousFoods: string[];
  topDestinations: string[];
  coverImage: string;
}

export interface SavedItem {
  id: string;
  type: 'destination' | 'location' | 'food' | 'place' | 'hotel' | 'restaurant';
  title: string;
  subtitle: string;
  image?: string;
  imageUrl?: string;
  locationName?: string;
  savedAt: string | number;
  data?: any;
}

// ---------------- ITINERARY PLANNER TYPES ---------------- //

export interface ItinerarySlot {
  id: string;
  timePeriod: 'Morning' | 'Afternoon' | 'Evening' | 'Night' | string;
  timeSlot: string;
  activityTitle: string;
  activityType: 'place' | 'food' | 'hotel' | 'transit' | 'leisure' | string;
  locationName: string;
  description: string;
  foodOrAttractionHighlight?: string;
  estimatedCostINR?: string;
  localTip?: string;
  completed?: boolean;
  linkedSavedItemId?: string;
  imageUrl?: string;
}

export interface ItineraryDay {
  dayNumber: number;
  theme: string;
  date?: string;
  slots: ItinerarySlot[];
}

export interface TripItinerary {
  id: string;
  title: string;
  destination: string;
  tagline?: string;
  daysCount: number;
  startDate?: string;
  vibe?: string;
  budgetTier?: string;
  pace?: string;
  estimatedTotalBudget?: string;
  bestTimeToGo?: string;
  packingTips?: string[];
  localTransitAdvice?: string;
  days: ItineraryDay[];
  createdAt: string;
  isAiGenerated?: boolean;
}
