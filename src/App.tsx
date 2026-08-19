import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StateExplorer } from './components/StateExplorer';
import { TasteIndiaSection } from './components/TasteIndiaSection';
import { PlacesSection } from './components/PlacesSection';
import { HotelDiscoverySection } from './components/HotelDiscoverySection';
import { PickedForYouSection } from './components/PickedForYouSection';
import { DestinationDashboard } from './components/DestinationDashboard';
import { SearchModal } from './components/SearchModal';
import { SavedDrawer } from './components/SavedDrawer';
import { MyItineraryPlanner } from './components/MyItineraryPlanner';
import { AddToItineraryModal } from './components/AddToItineraryModal';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Footer } from './components/Footer';
import { getLocationDetails } from './data/indiaGeographicData';
import { LocationDetails, SavedItem, TripItinerary } from './types';

const DEFAULT_TRIPS: TripItinerary[] = [
  {
    id: 'trip-varanasi-3day',
    title: '3 Days in Varanasi & Sarnath',
    destination: 'Varanasi',
    tagline: 'Ancient Ghats, Sunrise River Boats, Banarasi Silk & Sacred Flavors',
    daysCount: 3,
    vibe: 'Culture, Heritage & Food',
    budgetTier: 'Moderate',
    pace: 'Balanced',
    estimatedTotalBudget: '₹6,500 - ₹12,000 per person',
    bestTimeToGo: 'October to March',
    packingTips: [
      'Modest lightweight cotton wear covering knees & shoulders',
      'Easy slip-on sandals/shoes for frequent temple visits',
      'Small bag for temple offerings & cash notes for boatmen'
    ],
    localTransitAdvice: 'Take cycle or e-rickshaws through Godowlia chowk. Walk inside narrow galiyan.',
    isAiGenerated: false,
    createdAt: new Date().toISOString(),
    days: [
      {
        dayNumber: 1,
        theme: 'Sacred Ghats, Dawn Wooden Boat & Street Flavors',
        slots: [
          {
            id: 'vns-d1-s1',
            timePeriod: 'Morning',
            timeSlot: '05:30 AM - 08:00 AM',
            activityTitle: 'Sunrise Wooden Boat Ride on the Holy Ganges',
            activityType: 'place',
            locationName: 'Assi Ghat to Manikarnika Ghat',
            description: 'Row past historic riverside palaces as dawn prayers echo across the water.',
            localTip: 'Hire a hand-rowed wooden boat instead of motorboats for tranquil morning reflections.',
            estimatedCostINR: '₹400 - ₹600 for boat',
            completed: false
          },
          {
            id: 'vns-d1-s2',
            timePeriod: 'Morning',
            timeSlot: '08:30 AM - 10:00 AM',
            activityTitle: 'Iconic Kachori Jalebi Breakfast at Ram Bhandar',
            activityType: 'food',
            locationName: 'Thatheri Bazaar, Varanasi',
            description: 'Crispy lentil kachoris served on leaf plates with spicy potato gravy and hot saffron jalebis.',
            localTip: 'Arrive before 09:30 AM before stocks run out!',
            estimatedCostINR: '₹70 - ₹120',
            completed: false
          },
          {
            id: 'vns-d1-s3',
            timePeriod: 'Afternoon',
            timeSlot: '02:00 PM - 04:30 PM',
            activityTitle: 'Kashi Vishwanath Corridor & Heritage Silk Walk',
            activityType: 'place',
            locationName: 'Vishwanath Gali',
            description: 'Marvel at the golden spires and explore century-old Banarasi handloom weaving workshops.',
            localTip: 'Deposit mobile phones and leather belts at the temple locker counter.',
            estimatedCostINR: 'Free entry',
            completed: false
          },
          {
            id: 'vns-d1-s4',
            timePeriod: 'Evening',
            timeSlot: '06:15 PM - 08:00 PM',
            activityTitle: 'Grand Ganga Maha Aarti at Dashashwamedh Ghat',
            activityType: 'place',
            locationName: 'Dashashwamedh Ghat',
            description: 'Witness the synchronized multi-tiered brass lamp ritual performed by young priests amidst conch shells.',
            localTip: 'Reach by 05:45 PM to grab front-row stone step seating.',
            estimatedCostINR: 'Free',
            completed: false
          },
          {
            id: 'vns-d1-s5',
            timePeriod: 'Night',
            timeSlot: '08:30 PM - 09:30 PM',
            activityTitle: 'Banarasi Meetha Paan & Malaiyo Dessert at Godowlia',
            activityType: 'food',
            locationName: 'Godowlia Chowk',
            description: 'Savor melt-in-mouth winter dew foam (Malaiyo) and digestive betel leaf paan with gulkand.',
            localTip: 'Keshav Tambool Bhandar near Ravidas Gate is the most renowned paan stall.',
            estimatedCostINR: '₹50 - ₹100',
            completed: false
          }
        ]
      },
      {
        dayNumber: 2,
        theme: 'Sarnath Buddhist Stupas & Royal Ramnagar Fort',
        slots: [
          {
            id: 'vns-d2-s1',
            timePeriod: 'Morning',
            timeSlot: '09:00 AM - 12:30 PM',
            activityTitle: 'Sarnath Dhamek Stupa & Archaeological Museum',
            activityType: 'place',
            locationName: 'Sarnath, 10km from Varanasi',
            description: 'Visit the site where Lord Buddha delivered his first sermon; see the original Ashoka Pillar Lion Capital.',
            localTip: 'Closed on Fridays. Book e-ticket online via ASI portal for faster entry.',
            estimatedCostINR: '₹25 entry',
            completed: false
          },
          {
            id: 'vns-d2-s2',
            timePeriod: 'Afternoon',
            timeSlot: '01:00 PM - 02:30 PM',
            activityTitle: 'Authentic Banarasi Thali at Baati Chokha',
            activityType: 'food',
            locationName: 'Teliyabag, Varanasi',
            description: 'Wood-fired wheat sattu baatis dipped in desi ghee with smoked brinjal mash and kheer.',
            estimatedCostINR: '₹280 per person',
            completed: false
          },
          {
            id: 'vns-d2-s3',
            timePeriod: 'Evening',
            timeSlot: '04:00 PM - 06:30 PM',
            activityTitle: 'Ramnagar Fort & Riverfront Sunset',
            activityType: 'place',
            locationName: 'Ramnagar, Ganga East Bank',
            description: '18th-century sandstone fortress housing vintage royal palanquins, weaponry, and astronomical clocks.',
            localTip: 'Do not miss Shiv Prasad Lassi Bhandar right outside the fort gate!',
            estimatedCostINR: '₹50 entry + ₹60 lassi',
            completed: false
          }
        ]
      },
      {
        dayNumber: 3,
        theme: 'Hidden Alleyways, Classical Music & Souvenirs',
        slots: [
          {
            id: 'vns-d3-s1',
            timePeriod: 'Morning',
            timeSlot: '08:00 AM - 11:00 AM',
            activityTitle: 'Heritage Alley Walking Tour & Blue Lassi House',
            activityType: 'place',
            locationName: 'Manikarnika Gali',
            description: 'Explore the 3,000-year-old street layout, sacred wells, and artisan copper crafts.',
            localTip: 'Try Pomegranate & Pistachio Lassi topped with rabri.',
            estimatedCostINR: '₹120',
            completed: false
          },
          {
            id: 'vns-d3-s2',
            timePeriod: 'Afternoon',
            timeSlot: '01:30 PM - 04:00 PM',
            activityTitle: 'Authentic Banarasi Silk Sari Shopping',
            activityType: 'place',
            locationName: 'Chowk & Peeli Kothi',
            description: 'Direct procurement from generational master weavers of Zari and Tanchoi silks.',
            estimatedCostINR: 'Variable',
            completed: false
          }
        ]
      }
    ]
  }
];

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeView, setActiveView] = useState<'home' | 'dashboard' | 'itinerary'>('home');
  const [selectedDetails, setSelectedDetails] = useState<LocationDetails | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  
  // Wishlist state
  const [savedItems, setSavedItems] = useState<SavedItem[]>(() => {
    try {
      const saved = localStorage.getItem('bharat_explore_saved');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Itinerary trips state
  const [trips, setTrips] = useState<TripItinerary[]>(() => {
    try {
      const savedTrips = localStorage.getItem('bharat_explore_trips');
      return savedTrips ? JSON.parse(savedTrips) : DEFAULT_TRIPS;
    } catch {
      return DEFAULT_TRIPS;
    }
  });

  const [activeTripId, setActiveTripId] = useState<string>(() => trips[0]?.id || 'trip-varanasi-3day');
  
  // Add to itinerary modal state
  const [isAddToItineraryModalOpen, setIsAddToItineraryModalOpen] = useState(false);
  const [itemToAdd, setItemToAdd] = useState<{
    id: string;
    type: string;
    title: string;
    locationName: string;
    imageUrl?: string;
    subtitle?: string;
  } | null>(null);

  // Sync dark mode class with root <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Persist saved items
  useEffect(() => {
    try {
      localStorage.setItem('bharat_explore_saved', JSON.stringify(savedItems));
    } catch (e) {
      console.error(e);
    }
  }, [savedItems]);

  // Persist trips
  useEffect(() => {
    try {
      localStorage.setItem('bharat_explore_trips', JSON.stringify(trips));
    } catch (e) {
      console.error(e);
    }
  }, [trips]);

  // Global key listener for '/' shortcut to search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isSearchModalOpen) {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          setIsSearchModalOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchModalOpen]);

  const handleSearchOrSelectDestination = (queryOrName: string) => {
    const details = getLocationDetails(queryOrName);
    setSelectedDetails(details);
    setActiveView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSaveItem = (item: {
    id: string;
    type: 'location' | 'place' | 'food' | 'hotel';
    title: string;
    locationName: string;
    imageUrl: string;
    subtitle: string;
  }) => {
    setSavedItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) {
        return prev.filter((i) => i.id !== item.id);
      } else {
        const newItem: SavedItem = {
          ...item,
          savedAt: new Date().toISOString()
        };
        return [newItem, ...prev];
      }
    });
  };

  const handleRemoveSavedItem = (id: string) => {
    setSavedItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleClearAllSaved = () => {
    setSavedItems([]);
  };

  const handleSelectNavSection = (sectionId: string) => {
    if (activeView !== 'home') {
      setActiveView('home');
      setSelectedDetails(null);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Itinerary handlers
  const handleOpenItinerary = () => {
    setActiveView('itinerary');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTriggerAddToItinerary = (item: {
    id: string;
    type: string;
    title: string;
    locationName?: string;
    imageUrl?: string;
    subtitle?: string;
  }) => {
    setItemToAdd({
      ...item,
      locationName: item.locationName || 'India'
    });
    setIsAddToItineraryModalOpen(true);
  };

  const handleCreateTripAndAdd = (destination: string, slotPayload: any) => {
    const newTripId = `trip-${Date.now()}`;
    const newTrip: TripItinerary = {
      id: newTripId,
      title: `Trip to ${destination}`,
      destination: destination,
      tagline: `Custom itinerary in ${destination}`,
      daysCount: 3,
      createdAt: new Date().toISOString(),
      days: [
        {
          dayNumber: 1,
          theme: 'Arrival & First Highlights',
          slots: [slotPayload]
        },
        { dayNumber: 2, theme: 'Heritage & Food Trail', slots: [] },
        { dayNumber: 3, theme: 'Local Exploration & Markets', slots: [] }
      ]
    };

    setTrips((prev) => [newTrip, ...prev]);
    setActiveTripId(newTripId);
  };

  const handleAddToExistingTrip = (tripId: string, dayNumber: number, slotPayload: any) => {
    setTrips((prev) =>
      prev.map((t) => {
        if (t.id === tripId) {
          const updatedDays = t.days.map((day) => {
            if (day.dayNumber === dayNumber) {
              return {
                ...day,
                slots: [...day.slots, slotPayload]
              };
            }
            return day;
          });
          return { ...t, days: updatedDays };
        }
        return t;
      })
    );
    setActiveTripId(tripId);
  };

  const handleCreateNewTrip = (newTrip: TripItinerary) => {
    setTrips((prev) => [newTrip, ...prev]);
    setActiveTripId(newTrip.id);
  };

  const handleUpdateTrip = (updatedTrip: TripItinerary) => {
    setTrips((prev) => prev.map((t) => (t.id === updatedTrip.id ? updatedTrip : t)));
  };

  const handleDeleteTrip = (tripId: string) => {
    setTrips((prev) => {
      const remaining = prev.filter((t) => t.id !== tripId);
      if (remaining.length > 0 && activeTripId === tripId) {
        setActiveTripId(remaining[0].id);
      }
      return remaining;
    });
  };

  const isCurrentLocationSaved = selectedDetails
    ? savedItems.some((i) => i.id === selectedDetails.location.id)
    : false;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#070a10] text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans">
      {/* Top Universal Navbar */}
      <Navbar
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        savedItems={savedItems}
        onOpenSavedDrawer={() => setIsSavedDrawerOpen(true)}
        onOpenSearchModal={() => setIsSearchModalOpen(true)}
        onSelectNavSection={handleSelectNavSection}
        onHomeClick={() => {
          setActiveView('home');
          setSelectedDetails(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenItinerary={handleOpenItinerary}
        activeView={activeView}
        tripCount={trips.length}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeView === 'itinerary' ? (
          <ErrorBoundary fallbackTitle="Itinerary Planner Error" fallbackMessage="There was an issue rendering the itinerary planner.">
            <MyItineraryPlanner
              trips={trips}
              activeTripId={activeTripId}
              onSelectTrip={setActiveTripId}
              onCreateNewTrip={handleCreateNewTrip}
              onUpdateTrip={handleUpdateTrip}
              onDeleteTrip={handleDeleteTrip}
              savedItems={savedItems}
              onOpenExploreDestination={(dest) => handleSearchOrSelectDestination(dest)}
            />
          </ErrorBoundary>
        ) : activeView === 'dashboard' && selectedDetails ? (
          <ErrorBoundary fallbackTitle="Destination View Error" fallbackMessage="There was an issue rendering the destination details.">
            <DestinationDashboard
              details={selectedDetails}
              onBack={() => {
                setActiveView('home');
                setSelectedDetails(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectNearby={(name) => handleSearchOrSelectDestination(name)}
              onToggleSave={handleToggleSaveItem}
              isSaved={isCurrentLocationSaved}
              darkMode={darkMode}
              onAddToItinerary={handleTriggerAddToItinerary}
            />
          </ErrorBoundary>
        ) : (
          <div className="space-y-0">
            {/* 1. Hero Section with Realtime India Search */}
            <HeroSection
              onSearch={(query) => handleSearchOrSelectDestination(query)}
              onSelectSuggestion={(name) => handleSearchOrSelectDestination(name)}
            />

            {/* 2. Explore States & Hierarchical Discovery */}
            <StateExplorer
              onSelectDestination={(dest) => handleSearchOrSelectDestination(dest)}
            />

            {/* 3. Taste India - Food Delicacies */}
            <TasteIndiaSection
              onSelectFoodDestination={(dest) => handleSearchOrSelectDestination(dest)}
              onSaveItem={handleToggleSaveItem}
              savedItemIds={savedItems.map((i) => i.id)}
              onAddToItinerary={handleTriggerAddToItinerary}
            />

            {/* 4. Places You Can't Miss - Attractions */}
            <PlacesSection
              onSelectPlaceDestination={(dest) => handleSearchOrSelectDestination(dest)}
              onAddToItinerary={handleTriggerAddToItinerary}
            />

            {/* 5. Stay Your Way - Hotel Tiers (Budget to Luxury) */}
            <HotelDiscoverySection
              onSelectHotelDestination={(dest) => handleSearchOrSelectDestination(dest)}
              onAddToItinerary={handleTriggerAddToItinerary}
            />

            {/* 6. Picked For You - Curated Circuits */}
            <PickedForYouSection
              onSelectDestination={(dest) => handleSearchOrSelectDestination(dest)}
            />
          </div>
        )}
      </main>

      {/* Global Quick Search Overlay Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectLocation={(name) => handleSearchOrSelectDestination(name)}
      />

      {/* Saved Wishlist Drawer */}
      <SavedDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedItems={savedItems}
        onRemoveItem={handleRemoveSavedItem}
        onClearAll={handleClearAllSaved}
        onSelectDestination={(name) => handleSearchOrSelectDestination(name)}
        onAddToItinerary={handleTriggerAddToItinerary}
        onOpenItineraryPlanner={handleOpenItinerary}
      />

      {/* Add To Itinerary Slot Assignment Modal */}
      <AddToItineraryModal
        isOpen={isAddToItineraryModalOpen}
        onClose={() => {
          setIsAddToItineraryModalOpen(false);
          setItemToAdd(null);
        }}
        item={itemToAdd}
        trips={trips}
        onCreateTripAndAdd={handleCreateTripAndAdd}
        onAddToExistingTrip={handleAddToExistingTrip}
      />

      {/* Footer Directory & Legal */}
      <Footer
        onSelectStateDestination={(name) => handleSearchOrSelectDestination(name)}
      />
    </div>
  );
}
