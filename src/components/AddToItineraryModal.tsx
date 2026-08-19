import React, { useState } from 'react';
import { X, Calendar, Check } from 'lucide-react';
import { TripItinerary } from '../types';

interface AddToItineraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    id: string;
    type: 'place' | 'food' | 'hotel' | 'location' | string;
    title: string;
    locationName: string;
    imageUrl?: string;
    subtitle?: string;
  } | null;
  trips: TripItinerary[];
  onCreateTripAndAdd: (destination: string, itemSlot: any) => void;
  onAddToExistingTrip: (tripId: string, dayNumber: number, slot: any) => void;
}

export const AddToItineraryModal: React.FC<AddToItineraryModalProps> = ({
  isOpen,
  onClose,
  item,
  trips,
  onCreateTripAndAdd,
  onAddToExistingTrip
}) => {
  const [selectedTripId, setSelectedTripId] = useState<string>(trips[0]?.id || 'new');
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(1);
  const [timePeriod, setTimePeriod] = useState<'Morning' | 'Afternoon' | 'Evening' | 'Night'>('Morning');
  const [timeSlot, setTimeSlot] = useState<string>('09:00 AM - 11:30 AM');
  const [newTripDestination, setNewTripDestination] = useState<string>(item?.locationName || 'Varanasi');
  const [newTripDays, setNewTripDays] = useState<number>(3);
  const [customNote, setCustomNote] = useState<string>('');

  if (!isOpen || !item) return null;

  const currentSelectedTrip = trips.find((t) => t.id === selectedTripId);

  const handleTimePeriodChange = (period: 'Morning' | 'Afternoon' | 'Evening' | 'Night') => {
    setTimePeriod(period);
    if (period === 'Morning') setTimeSlot('08:00 AM - 11:00 AM');
    if (period === 'Afternoon') setTimeSlot('01:00 PM - 03:30 PM');
    if (period === 'Evening') setTimeSlot('05:00 PM - 07:30 PM');
    if (period === 'Night') setTimeSlot('08:30 PM - 10:30 PM');
  };

  const handleSave = () => {
    const slotPayload = {
      id: `slot-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timePeriod,
      timeSlot,
      activityTitle: item.title,
      activityType: item.type === 'location' ? 'place' : item.type,
      locationName: item.locationName || item.title,
      description: item.subtitle || `Visit and experience ${item.title} in ${item.locationName}.`,
      foodOrAttractionHighlight: customNote || undefined,
      estimatedCostINR: item.type === 'food' ? '₹150 - ₹350' : item.type === 'hotel' ? 'As booked' : 'Standard entry / free',
      imageUrl: item.imageUrl,
      linkedSavedItemId: item.id
    };

    if (selectedTripId === 'new') {
      onCreateTripAndAdd(newTripDestination || item.locationName, slotPayload);
    } else {
      onAddToExistingTrip(selectedTripId, selectedDayNumber, slotPayload);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 animate-in zoom-in-95 duration-300 text-slate-900 dark:text-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/10 text-orange-600 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-serif">Add to Trip Itinerary</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Plan this activity into your day-by-day India travel schedule.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Selected Item Preview Card */}
        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
          {item.imageUrl && (
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
            />
          )}
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
              {item.type}
            </span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">
              {item.title}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              📍 {item.locationName}
            </p>
          </div>
        </div>

        {/* Step 1: Choose Trip */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            1. Select Trip
          </label>

          <select
            value={selectedTripId}
            onChange={(e) => setSelectedTripId(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {trips.map((trip) => (
              <option key={trip.id} value={trip.id}>
                {trip.title} ({trip.daysCount} Days in {trip.destination})
              </option>
            ))}
            <option value="new">+ Create a Brand New Trip</option>
          </select>
        </div>

        {/* If creating new trip */}
        {selectedTripId === 'new' && (
          <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/60">
            <div>
              <label className="text-[11px] font-bold text-orange-900 dark:text-orange-200 block mb-1">
                Destination City
              </label>
              <input
                type="text"
                value={newTripDestination}
                onChange={(e) => setNewTripDestination(e.target.value)}
                placeholder="e.g. Varanasi, Bhopal, Goa"
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 text-xs font-semibold border border-orange-200 dark:border-orange-800 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-orange-900 dark:text-orange-200 block mb-1">
                Total Trip Days
              </label>
              <select
                value={newTripDays}
                onChange={(e) => setNewTripDays(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 text-xs font-semibold border border-orange-200 dark:border-orange-800 focus:outline-none"
              >
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Day' : 'Days'}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Step 2: Choose Day */}
        {selectedTripId !== 'new' && currentSelectedTrip && (
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              2. Choose Day
            </label>
            <div className="grid grid-cols-4 gap-2">
              {currentSelectedTrip.days.map((day) => (
                <button
                  key={day.dayNumber}
                  type="button"
                  onClick={() => setSelectedDayNumber(day.dayNumber)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                    selectedDayNumber === day.dayNumber
                      ? 'bg-orange-500 text-white border-orange-500 shadow-md'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-orange-300'
                  }`}
                >
                  Day {day.dayNumber}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Choose Time Period */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            3. Time Slot
          </label>
          <div className="grid grid-cols-4 gap-2">
            {(['Morning', 'Afternoon', 'Evening', 'Night'] as const).map((period) => (
              <button
                key={period}
                type="button"
                onClick={() => handleTimePeriodChange(period)}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all ${
                  timePeriod === period
                    ? 'bg-amber-500 text-white border-amber-500 shadow-md'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Note or Specific Food/Attraction */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Special Notes (Optional)
          </label>
          <input
            type="text"
            value={customNote}
            onChange={(e) => setCustomNote(e.target.value)}
            placeholder="e.g. Try special kachori breakfast, book sunrise boat ride"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-lg shadow-orange-500/25 flex items-center justify-center gap-1.5 transition-all"
          >
            <Check className="w-4 h-4" />
            <span>Confirm & Add to Trip</span>
          </button>
        </div>
      </div>
    </div>
  );
};
