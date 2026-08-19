import React, { useState } from 'react';
import { 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  Plus, 
  Trash2, 
  Printer, 
  Compass, 
  Utensils, 
  Building2, 
  Car, 
  ChevronRight, 
  RefreshCw, 
  MessageSquare, 
  Luggage, 
  Send,
  X,
  Bookmark,
  Check
} from 'lucide-react';
import { TripItinerary, ItinerarySlot, SavedItem } from '../types';

interface MyItineraryPlannerProps {
  trips: TripItinerary[];
  activeTripId: string;
  onSelectTrip: (tripId: string) => void;
  onCreateNewTrip: (newTrip: TripItinerary) => void;
  onUpdateTrip: (updatedTrip: TripItinerary) => void;
  onDeleteTrip: (tripId: string) => void;
  savedItems: SavedItem[];
  onOpenExploreDestination?: (destinationName: string) => void;
}

export const MyItineraryPlanner: React.FC<MyItineraryPlannerProps> = ({
  trips,
  activeTripId,
  onSelectTrip,
  onCreateNewTrip,
  onUpdateTrip,
  onDeleteTrip,
  savedItems,
  onOpenExploreDestination
}) => {
  const activeTrip = trips.find((t) => t.id === activeTripId) || trips[0];
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(1);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [isAiOptimizing, setIsAiOptimizing] = useState<boolean>(false);
  const [optimizationNote, setOptimizationNote] = useState<string | null>(null);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState<boolean>(false);
  const [isAddCustomSlotOpen, setIsAddCustomSlotOpen] = useState<boolean>(false);
  
  // Custom slot form state
  const [customSlotTitle, setCustomSlotTitle] = useState('');
  const [customSlotType, setCustomSlotType] = useState('place');
  const [customSlotPeriod, setCustomSlotPeriod] = useState('Morning');
  const [customSlotTime, setCustomSlotTime] = useState('10:00 AM - 12:00 PM');
  const [customSlotDesc, setCustomSlotDesc] = useState('');
  const [customSlotCost, setCustomSlotCost] = useState('₹100 - ₹200');

  // AI Itinerary Generator Form State
  const [aiDestination, setAiDestination] = useState(activeTrip?.destination || 'Varanasi');
  const [aiDays, setAiDays] = useState(3);
  const [aiVibe, setAiVibe] = useState('Culture, Heritage & Authentic Food');
  const [aiBudget, setAiBudget] = useState('Moderate');
  const [aiPace, setAiPace] = useState('Balanced');
  const [aiIncludeSaved, setAiIncludeSaved] = useState(true);
  const [aiCustomPrompt, setAiCustomPrompt] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // AI Concierge Chat State
  const [conciergeQuery, setConciergeQuery] = useState('');
  const [conciergeMessages, setConciergeMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: `Namaste! I am your AI Travel Concierge for ${activeTrip?.destination || 'India'}. Ask me anything about local temple dress codes, hidden food stalls, taxi rates, or best sunset points!`
    }
  ]);
  const [isConciergeLoading, setIsConciergeLoading] = useState(false);

  // Active Day object
  const activeDay = activeTrip?.days.find((d) => d.dayNumber === selectedDayNumber) || activeTrip?.days[0];

  // Toggle slot completion
  const handleToggleSlotCompletion = (slotId: string) => {
    if (!activeTrip || !activeDay) return;
    const updatedDays = activeTrip.days.map((day) => {
      if (day.dayNumber === activeDay.dayNumber) {
        return {
          ...day,
          slots: day.slots.map((s) => (s.id === slotId ? { ...s, completed: !s.completed } : s))
        };
      }
      return day;
    });
    onUpdateTrip({ ...activeTrip, days: updatedDays });
  };

  // Delete slot
  const handleDeleteSlot = (slotId: string) => {
    if (!activeTrip || !activeDay) return;
    const updatedDays = activeTrip.days.map((day) => {
      if (day.dayNumber === activeDay.dayNumber) {
        return {
          ...day,
          slots: day.slots.filter((s) => s.id !== slotId)
        };
      }
      return day;
    });
    onUpdateTrip({ ...activeTrip, days: updatedDays });
  };

  // Move slot Up or Down
  const handleMoveSlot = (index: number, direction: 'up' | 'down') => {
    if (!activeTrip || !activeDay) return;
    const slots = [...activeDay.slots];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= slots.length) return;

    const temp = slots[index];
    slots[index] = slots[targetIndex];
    slots[targetIndex] = temp;

    const updatedDays = activeTrip.days.map((day) => {
      if (day.dayNumber === activeDay.dayNumber) {
        return { ...day, slots };
      }
      return day;
    });
    onUpdateTrip({ ...activeTrip, days: updatedDays });
  };

  // Add custom slot
  const handleAddCustomSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSlotTitle.trim() || !activeTrip || !activeDay) return;

    const newSlot: ItinerarySlot = {
      id: `slot-manual-${Date.now()}`,
      timePeriod: customSlotPeriod,
      timeSlot: customSlotTime,
      activityTitle: customSlotTitle,
      activityType: customSlotType,
      locationName: activeTrip.destination,
      description: customSlotDesc || `Explore ${customSlotTitle} in ${activeTrip.destination}.`,
      estimatedCostINR: customSlotCost,
      completed: false
    };

    const updatedDays = activeTrip.days.map((day) => {
      if (day.dayNumber === activeDay.dayNumber) {
        return {
          ...day,
          slots: [...day.slots, newSlot]
        };
      }
      return day;
    });

    onUpdateTrip({ ...activeTrip, days: updatedDays });
    setCustomSlotTitle('');
    setCustomSlotDesc('');
    setIsAddCustomSlotOpen(false);
  };

  // Add item from saved wishlist
  const handleAddSavedItemToDay = (item: SavedItem) => {
    if (!activeTrip || !activeDay) return;
    const newSlot: ItinerarySlot = {
      id: `slot-saved-${Date.now()}-${item.id}`,
      timePeriod: 'Afternoon',
      timeSlot: '02:00 PM - 04:30 PM',
      activityTitle: item.title,
      activityType: item.type === 'location' ? 'place' : item.type,
      locationName: item.locationName || activeTrip.destination,
      description: item.subtitle || `Visit ${item.title} bookmarked from your wishlist.`,
      estimatedCostINR: item.type === 'food' ? '₹150 - ₹400' : 'Standard entry',
      imageUrl: item.imageUrl || item.image,
      linkedSavedItemId: item.id,
      completed: false
    };

    const updatedDays = activeTrip.days.map((day) => {
      if (day.dayNumber === activeDay.dayNumber) {
        return {
          ...day,
          slots: [...day.slots, newSlot]
        };
      }
      return day;
    });

    onUpdateTrip({ ...activeTrip, days: updatedDays });
  };

  // Trigger Gemini AI Itinerary Generator
  const handleGenerateAiItinerary = async () => {
    setIsGeneratingAi(true);
    setAiError(null);

    try {
      const response = await fetch('/api/gemini/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination: aiDestination,
          days: aiDays,
          vibe: aiVibe,
          budget: aiBudget,
          pace: aiPace,
          savedItems: aiIncludeSaved ? savedItems : [],
          customNotes: aiCustomPrompt
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      const newGeneratedTrip: TripItinerary = {
        id: `trip-ai-${Date.now()}`,
        title: data.title || `${aiDays} Days in ${aiDestination}`,
        destination: data.destination || aiDestination,
        tagline: data.tagline || `${aiDays}-day curated tour of ${aiDestination}`,
        daysCount: data.daysCount || aiDays,
        vibe: aiVibe,
        budgetTier: aiBudget,
        pace: aiPace,
        estimatedTotalBudget: data.estimatedTotalBudget || '₹4,000 - ₹8,500',
        bestTimeToGo: data.bestTimeToGo || 'October to March',
        packingTips: data.packingTips || [
          'Comfortable breathable cotton wear',
          'Slip-on footwear for temples',
          'Small cash notes for street food'
        ],
        localTransitAdvice: data.localTransitAdvice || 'Use verified app cabs or pre-negotiated auto rickshaws.',
        isAiGenerated: true,
        createdAt: new Date().toISOString(),
        days: (Array.isArray(data.days) ? data.days : []).map((d: any, idx: number) => ({
          dayNumber: d.dayNumber || idx + 1,
          theme: d.theme || `Day ${idx + 1} Highlights`,
          slots: (Array.isArray(d.slots) ? d.slots : []).map((s: any, sIdx: number) => ({
            id: `slot-gen-${Date.now()}-${idx}-${sIdx}`,
            timePeriod: s.timePeriod || 'Morning',
            timeSlot: s.timeSlot || '09:00 AM - 11:30 AM',
            activityTitle: s.activityTitle || 'Sightseeing',
            activityType: s.activityType || 'place',
            locationName: s.locationName || aiDestination,
            description: s.description || '',
            foodOrAttractionHighlight: s.foodOrAttractionHighlight,
            estimatedCostINR: s.estimatedCostINR || '₹100',
            localTip: s.localTip,
            completed: false
          }))
        }))
      };

      onCreateNewTrip(newGeneratedTrip);
      setIsAiModalOpen(false);
      setSelectedDayNumber(1);
    } catch (err: any) {
      console.error('AI generation error:', err);
      setAiError(err?.message || 'Could not generate itinerary. Please try again.');
    } finally {
      setIsGeneratingAi(false);
    }
  };

  // Trigger Gemini AI Route Optimization for active day
  const handleOptimizeDayWithAi = async () => {
    if (!activeTrip || !activeDay || activeDay.slots.length === 0) return;

    setIsAiOptimizing(true);
    setOptimizationNote(null);

    try {
      const response = await fetch('/api/gemini/optimize-day', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination: activeTrip.destination,
          dayNumber: activeDay.dayNumber,
          currentSlots: activeDay.slots
        })
      });

      if (!response.ok) throw new Error('Optimization failed');

      const data = await response.json();
      if (data.optimizedSlots) {
        const updatedSlots: ItinerarySlot[] = data.optimizedSlots.map((s: any, idx: number) => ({
          id: `slot-opt-${Date.now()}-${idx}`,
          timePeriod: s.timePeriod || 'Morning',
          timeSlot: s.timeSlot || '09:00 AM - 11:00 AM',
          activityTitle: s.activityTitle,
          activityType: s.activityType,
          locationName: s.locationName || activeTrip.destination,
          description: s.description,
          estimatedCostINR: s.estimatedCostINR,
          localTip: s.localTip,
          completed: false
        }));

        const updatedDays = activeTrip.days.map((d) => {
          if (d.dayNumber === activeDay.dayNumber) {
            return { ...d, slots: updatedSlots };
          }
          return d;
        });

        onUpdateTrip({ ...activeTrip, days: updatedDays });
        setOptimizationNote(data.optimizationSummary || 'Schedule reordered for optimal traffic flow & temple timings.');
        setTimeout(() => setOptimizationNote(null), 6000);
      }
    } catch (err) {
      console.error(err);
      setOptimizationNote('Unable to optimize. Kept current order.');
    } finally {
      setIsAiOptimizing(false);
    }
  };

  // Concierge Chat Handler
  const handleAskConcierge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!conciergeQuery.trim() || isConciergeLoading) return;

    const userQ = conciergeQuery.trim();
    setConciergeMessages((prev) => [...prev, { sender: 'user', text: userQ }]);
    setConciergeQuery('');
    setIsConciergeLoading(true);

    try {
      const response = await fetch('/api/gemini/ask-concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination: activeTrip?.destination || 'India',
          question: userQ,
          itineraryContext: {
            destination: activeTrip?.destination,
            day: activeDay?.dayNumber,
            theme: activeDay?.theme,
            plannedActivities: activeDay?.slots.map((s) => s.activityTitle)
          }
        })
      });

      const data = await response.json();
      setConciergeMessages((prev) => [
        ...prev,
        { sender: 'ai', text: data.answer || 'I am ready to help with any details for your journey.' }
      ]);
    } catch (err) {
      setConciergeMessages((prev) => [
        ...prev,
        { sender: 'ai', text: 'Sorry, I ran into a network hiccup. Please ask again!' }
      ]);
    } finally {
      setIsConciergeLoading(false);
    }
  };

  const totalSlotsCount = activeTrip?.days.reduce((acc, d) => acc + d.slots.length, 0) || 0;
  const completedSlotsCount = activeTrip?.days.reduce((acc, d) => acc + d.slots.filter((s) => s.completed).length, 0) || 0;
  const progressPercent = totalSlotsCount > 0 ? Math.round((completedSlotsCount / totalSlotsCount) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070a10] text-slate-900 dark:text-slate-100 transition-colors py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header & Trip Selector Bar */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                <span>BharatExplore Planner</span>
              </span>
              {activeTrip?.isAiGenerated && (
                <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>AI Powered</span>
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-serif tracking-tight">
              My India Itinerary
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Build, customize, and optimize your day-by-day journeys across India.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs shadow-lg shadow-purple-500/25 flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4 text-purple-200" />
              <span>Generate with AI</span>
            </button>

            <button
              onClick={() => {
                const newTitle = prompt('Enter Destination Name (e.g. Jaipur, Rishikesh, Hampi):', 'Jaipur');
                if (newTitle) {
                  const newTrip: TripItinerary = {
                    id: `trip-${Date.now()}`,
                    title: `Trip to ${newTitle}`,
                    destination: newTitle,
                    tagline: `Custom planned holiday in ${newTitle}`,
                    daysCount: 3,
                    createdAt: new Date().toISOString(),
                    days: [
                      { dayNumber: 1, theme: 'Arrival & First Sights', slots: [] },
                      { dayNumber: 2, theme: 'Major Attractions & Cultural Trail', slots: [] },
                      { dayNumber: 3, theme: 'Local Food & Markets', slots: [] }
                    ]
                  };
                  onCreateNewTrip(newTrip);
                }
              }}
              className="px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 font-bold text-xs flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4 text-orange-500" />
              <span>New Blank Trip</span>
            </button>

            <button
              onClick={() => window.print()}
              className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 text-xs font-semibold"
              title="Print Itinerary"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Trips Switcher Tab Carousel */}
        {trips.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
            {trips.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  onSelectTrip(t.id);
                  setSelectedDayNumber(1);
                }}
                className={`px-5 py-3 rounded-2xl border text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2.5 ${
                  t.id === activeTrip?.id
                    ? 'bg-orange-500 text-white border-orange-500 shadow-md'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-orange-200'
                }`}
              >
                <span>📍 {t.destination} ({t.daysCount} Days)</span>
              </button>
            ))}
          </div>
        )}

        {/* Active Trip Overview Card */}
        {activeTrip ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 dark:text-white">
                    {activeTrip.title}
                  </h2>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 italic">
                  "{activeTrip.tagline || `Custom itinerary for ${activeTrip.destination}`}"
                </p>

                {/* Progress bar */}
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-48 h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {completedSlotsCount} / {totalSlotsCount} activities completed ({progressPercent}%)
                  </span>
                </div>
              </div>

              {/* Trip Metadata Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Budget Est.</span>
                  <span className="font-bold text-slate-900 dark:text-white truncate">
                    {activeTrip.estimatedTotalBudget || '₹5,000 - ₹10,000'}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Best Season</span>
                  <span className="font-bold text-slate-900 dark:text-white truncate">
                    {activeTrip.bestTimeToGo || 'Oct - Mar'}
                  </span>
                </div>

                {onOpenExploreDestination && (
                  <button
                    onClick={() => onOpenExploreDestination(activeTrip.destination)}
                    className="p-3 rounded-2xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900/60 text-orange-700 dark:text-orange-300 font-bold flex items-center justify-between col-span-2 sm:col-span-1"
                  >
                    <span>Destination Guide</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Day Selector Tabs & Optimization */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                {activeTrip.days.map((day) => (
                  <button
                    key={day.dayNumber}
                    onClick={() => setSelectedDayNumber(day.dayNumber)}
                    className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      selectedDayNumber === day.dayNumber
                        ? 'bg-orange-500 text-white shadow-md'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Day {day.dayNumber}</span>
                  </button>
                ))}
              </div>

              {/* Action: AI Optimize Day Schedule */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleOptimizeDayWithAi}
                  disabled={isAiOptimizing || !activeDay || activeDay.slots.length === 0}
                  className="px-3.5 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-bold hover:bg-purple-100 transition-all flex items-center gap-1.5 disabled:opacity-50"
                  title="AI optimizes stops according to Indian city traffic and opening timings"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isAiOptimizing ? 'animate-spin' : ''}`} />
                  <span>{isAiOptimizing ? 'Optimizing...' : `AI Optimize Day ${selectedDayNumber}`}</span>
                </button>

                <button
                  onClick={() => setIsSavedDrawerOpen(!isSavedDrawerOpen)}
                  className="px-3.5 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-bold hover:bg-amber-100 transition-all flex items-center gap-1.5"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Saved Items ({savedItems.length})</span>
                </button>
              </div>
            </div>

            {/* AI Optimization Notification Banner */}
            {optimizationNote && (
              <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/60 text-purple-800 dark:text-purple-200 text-xs flex items-center gap-2 animate-in fade-in">
                <Sparkles className="w-4 h-4 text-purple-600 flex-shrink-0" />
                <span><strong>AI Route Optimization:</strong> {optimizationNote}</span>
              </div>
            )}

            {/* Day Theme Title */}
            {activeDay && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider block">
                    Day {activeDay.dayNumber} Theme & Focus
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif">
                    {activeDay.theme}
                  </h3>
                </div>

                <button
                  onClick={() => setIsAddCustomSlotOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-1 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Activity</span>
                </button>
              </div>
            )}

            {/* Main Day Timeline Slots */}
            <div className="space-y-4">
              {activeDay && activeDay.slots.length === 0 ? (
                <div className="p-12 text-center rounded-3xl bg-slate-50 dark:bg-slate-800/20 border-2 border-dashed border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-600 flex items-center justify-center mx-auto">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold font-serif text-slate-800 dark:text-slate-200">
                    No activities scheduled for Day {selectedDayNumber} yet
                  </h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Add places, street food spots, and hotels from your saved bookmarks, create custom activities, or generate an instant AI itinerary.
                  </p>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => setIsAddCustomSlotOpen(true)}
                      className="px-4 py-2 rounded-xl bg-orange-500 text-white text-xs font-bold"
                    >
                      + Add Custom Activity
                    </button>
                    <button
                      onClick={() => setIsAiModalOpen(true)}
                      className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Generate with AI</span>
                    </button>
                  </div>
                </div>
              ) : (
                activeDay?.slots.map((slot, index) => {
                  const typeIcon = 
                    slot.activityType === 'food' ? <Utensils className="w-4 h-4 text-amber-500" /> :
                    slot.activityType === 'hotel' ? <Building2 className="w-4 h-4 text-cyan-500" /> :
                    slot.activityType === 'transit' ? <Car className="w-4 h-4 text-blue-500" /> :
                    <Compass className="w-4 h-4 text-emerald-500" />;

                  return (
                    <div
                      key={slot.id}
                      className={`group p-5 rounded-2xl border transition-all duration-300 flex flex-col sm:flex-row items-start justify-between gap-4 ${
                        slot.completed
                          ? 'bg-slate-100/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 shadow-sm'
                      }`}
                    >
                      {/* Left: Complete Toggle & Time Badge */}
                      <div className="flex items-start gap-3 w-full sm:w-auto">
                        <button
                          onClick={() => handleToggleSlotCompletion(slot.id)}
                          className="mt-1 text-slate-400 hover:text-emerald-500 transition-colors"
                        >
                          {slot.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100 dark:fill-emerald-950" />
                          ) : (
                            <Circle className="w-5 h-5" />
                          )}
                        </button>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                              {slot.timeSlot}
                            </span>
                            <span className="text-[10px] uppercase font-bold text-orange-600 dark:text-orange-400 flex items-center gap-1">
                              {typeIcon}
                              <span>{slot.activityType}</span>
                            </span>
                          </div>

                          <h4 className={`text-base font-bold text-slate-900 dark:text-white font-serif ${slot.completed ? 'line-through' : ''}`}>
                            {slot.activityTitle}
                          </h4>

                          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                            {slot.description}
                          </p>

                          {/* Local Tip from AI */}
                          {slot.localTip && (
                            <div className="mt-2.5 p-2.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-[11px] text-amber-900 dark:text-amber-200 flex items-start gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                              <span><strong>Insider Tip:</strong> {slot.localTip}</span>
                            </div>
                          )}

                          {slot.estimatedCostINR && (
                            <div className="mt-2 text-[11px] text-slate-500 font-medium">
                              Estimated Expense: <strong className="text-slate-800 dark:text-slate-200">{slot.estimatedCostINR}</strong>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right: Slot Controls (Reorder & Delete) */}
                      <div className="flex items-center gap-1 self-end sm:self-center">
                        <button
                          onClick={() => handleMoveSlot(index, 'up')}
                          disabled={index === 0}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-20"
                          title="Move Earlier"
                        >
                          ▲
                        </button>
                        <button
                          onClick={() => handleMoveSlot(index, 'down')}
                          disabled={index === (activeDay?.slots.length || 0) - 1}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-20"
                          title="Move Later"
                        >
                          ▼
                        </button>
                        <button
                          onClick={() => handleDeleteSlot(slot.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Quick Drawer for Saved Items to Inject into Day */}
            {isSavedDrawerOpen && (
              <div className="p-6 rounded-3xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bookmark className="w-4 h-4 text-amber-600" />
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white font-serif">
                      Your Saved Wishlist Items (Click + to add into Day {selectedDayNumber})
                    </h4>
                  </div>
                  <button
                    onClick={() => setIsSavedDrawerOpen(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {savedItems.length === 0 ? (
                  <p className="text-xs text-slate-500">
                    No bookmarked items found. Save places, dishes, or hotels from the explore pages to easily schedule them.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto">
                    {savedItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2"
                      >
                        <div className="min-w-0">
                          <span className="text-[9px] uppercase font-bold text-orange-600">{item.type}</span>
                          <h5 className="font-bold text-xs text-slate-900 dark:text-white truncate">{item.title}</h5>
                          <p className="text-[10px] text-slate-500 truncate">{item.subtitle || item.locationName}</p>
                        </div>
                        <button
                          onClick={() => handleAddSavedItemToDay(item)}
                          className="p-2 rounded-xl bg-orange-500 text-white hover:bg-orange-600 flex-shrink-0"
                          title="Add to Day"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : null}

        {/* AI Local Concierge Chat & Packing Assistant Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: AI Local Travel Concierge Q&A */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif">AI Local Travel Concierge</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Instant real-time answers about food safety, transit rates, aarti timings & customs.
                </p>
              </div>
            </div>

            {/* Chat History Box */}
            <div className="h-60 overflow-y-auto space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs">
              {conciergeMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-orange-500 text-white font-medium'
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm leading-relaxed'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isConciergeLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-400 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 animate-spin text-purple-500" />
                    <span>Consulting local guides...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleAskConcierge} className="flex gap-2">
              <input
                type="text"
                value={conciergeQuery}
                onChange={(e) => setConciergeQuery(e.target.value)}
                placeholder="e.g. What is the standard auto rate from station to hotel?"
                className="flex-1 px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                disabled={isConciergeLoading || !conciergeQuery.trim()}
                className="px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Ask AI</span>
              </button>
            </form>
          </div>

          {/* Right: AI Packing & Local Advisory Card */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
                <Luggage className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif">Packing & Local Advisory</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Custom checklist for {activeTrip?.destination || 'India'}.
                </p>
              </div>
            </div>

            {/* Packing checklist */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Recommended Packing Items:
              </span>
              <div className="space-y-1.5">
                {(activeTrip?.packingTips || [
                  'Modest cotton clothing covering knees & shoulders',
                  'Slip-on footwear for frequent temple entries',
                  'Compact umbrella or sun hat for afternoon sightseeing',
                  'Cash in smaller ₹50, ₹100, and ₹500 denominations'
                ]).map((tip, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Local Transit Advice */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Local Transit Guidance:
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {activeTrip?.localTransitAdvice || 'E-rickshaws are best for narrow temple alleys. Pre-book inter-city cabs.'}
              </p>
            </div>
          </div>
        </div>

        {/* MODAL: AI Itinerary Generator Form */}
        {isAiModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 text-slate-900 dark:text-white animate-in zoom-in-95 duration-300">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-serif">AI Smart Itinerary Creator</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Powered by Gemini 3.7 Flash for authentic India trips.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAiModalOpen(false)}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {aiError && (
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 text-xs font-semibold">
                  {aiError}
                </div>
              )}

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                    1. Destination in India
                  </label>
                  <input
                    type="text"
                    value={aiDestination}
                    onChange={(e) => setAiDestination(e.target.value)}
                    placeholder="e.g. Varanasi, Bhopal, Udaipur, Kasol, Madurai"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                      2. Duration
                    </label>
                    <select
                      value={aiDays}
                      onChange={(e) => setAiDays(Number(e.target.value))}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold focus:outline-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? 'Day' : 'Days'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                      3. Budget Tier
                    </label>
                    <select
                      value={aiBudget}
                      onChange={(e) => setAiBudget(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold focus:outline-none"
                    >
                      <option value="Budget Backpacker">Budget / Backpacker</option>
                      <option value="Moderate Comfort">Moderate Comfort</option>
                      <option value="Luxury Heritage">Luxury & Heritage</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                    4. Travel Vibe
                  </label>
                  <select
                    value={aiVibe}
                    onChange={(e) => setAiVibe(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold focus:outline-none"
                  >
                    <option value="Culture, Heritage & Authentic Food">Culture, Heritage & Food</option>
                    <option value="Spiritual Temples, Ghats & Meditation">Spiritual & Temples</option>
                    <option value="Street Food Trail & Local Feasts">Foodie & Street Gastronomy</option>
                    <option value="Adventure, Nature & Scenic Views">Nature & Scenic Views</option>
                    <option value="Relaxed Family & Leisure">Relaxed Family Leisure</option>
                  </select>
                </div>

                {savedItems.length > 0 && (
                  <div className="flex items-center gap-2 p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60">
                    <input
                      type="checkbox"
                      id="includeSaved"
                      checked={aiIncludeSaved}
                      onChange={(e) => setAiIncludeSaved(e.target.checked)}
                      className="w-4 h-4 text-purple-600 rounded"
                    />
                    <label htmlFor="includeSaved" className="text-xs font-semibold text-amber-900 dark:text-amber-200">
                      Prioritize and integrate my {savedItems.length} bookmarked wishlist items
                    </label>
                  </div>
                )}

                <div>
                  <label className="font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                    Special Requests / Travelers (Optional)
                  </label>
                  <input
                    type="text"
                    value={aiCustomPrompt}
                    onChange={(e) => setAiCustomPrompt(e.target.value)}
                    placeholder="e.g. Traveling with elderly parents, must include vegetarian street food"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAiModalOpen(false)}
                  className="flex-1 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleGenerateAiItinerary}
                  disabled={isGeneratingAi || !aiDestination.trim()}
                  className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isGeneratingAi ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" />
                      <span>Designing Your Trip...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Generate Itinerary</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: Custom Activity Creator */}
        {isAddCustomSlotOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <form
              onSubmit={handleAddCustomSlot}
              className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 text-slate-900 dark:text-white animate-in zoom-in-95 duration-300"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-lg font-bold font-serif">Add Activity to Day {selectedDayNumber}</h3>
                <button
                  type="button"
                  onClick={() => setIsAddCustomSlotOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-500 block mb-1">Activity Title *</label>
                  <input
                    type="text"
                    required
                    value={customSlotTitle}
                    onChange={(e) => setCustomSlotTitle(e.target.value)}
                    placeholder="e.g. Sunrise Boat Ride at Assi Ghat"
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-500 block mb-1">Type</label>
                    <select
                      value={customSlotType}
                      onChange={(e) => setCustomSlotType(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold focus:outline-none"
                    >
                      <option value="place">🏛️ Sightseeing / Place</option>
                      <option value="food">🍛 Food / Restaurant</option>
                      <option value="hotel">🏨 Hotel / Stay</option>
                      <option value="transit">🚖 Transit / Drive</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-500 block mb-1">Time Period</label>
                    <select
                      value={customSlotPeriod}
                      onChange={(e) => setCustomSlotPeriod(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold focus:outline-none"
                    >
                      <option value="Morning">Morning</option>
                      <option value="Afternoon">Afternoon</option>
                      <option value="Evening">Evening</option>
                      <option value="Night">Night</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-500 block mb-1">Timing Details</label>
                  <input
                    type="text"
                    value={customSlotTime}
                    onChange={(e) => setCustomSlotTime(e.target.value)}
                    placeholder="e.g. 06:00 AM - 08:30 AM"
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-500 block mb-1">Description / Notes</label>
                  <textarea
                    rows={2}
                    value={customSlotDesc}
                    onChange={(e) => setCustomSlotDesc(e.target.value)}
                    placeholder="e.g. Hire wooden hand-rowed boat; take hot lemon tea on the river"
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-500 block mb-1">Estimated Cost (INR)</label>
                  <input
                    type="text"
                    value={customSlotCost}
                    onChange={(e) => setCustomSlotCost(e.target.value)}
                    placeholder="e.g. ₹300 - ₹500"
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddCustomSlotOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-orange-500 text-white font-bold text-xs"
                >
                  Add Activity
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
