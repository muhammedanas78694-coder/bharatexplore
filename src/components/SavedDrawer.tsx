import React from 'react';
import { X, Trash2, Heart, ArrowRight, CalendarPlus, Sparkles } from 'lucide-react';
import { SavedItem } from '../types';

interface SavedDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedItems: SavedItem[];
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
  onSelectDestination: (name: string) => void;
  onAddToItinerary?: (item: SavedItem) => void;
  onOpenItineraryPlanner?: () => void;
}

export const SavedDrawer: React.FC<SavedDrawerProps> = ({
  isOpen,
  onClose,
  savedItems,
  onRemoveItem,
  onClearAll,
  onSelectDestination,
  onAddToItinerary,
  onOpenItineraryPlanner
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between text-slate-900 dark:text-white animate-in slide-in-from-right duration-300">
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              <h3 className="font-bold font-serif text-lg">My India Wishlist ({savedItems.length})</h3>
            </div>

            <div className="flex items-center gap-2">
              {savedItems.length > 0 && (
                <button
                  onClick={onClearAll}
                  className="text-xs text-red-500 hover:underline font-semibold"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Drawer Items List */}
          <div className="p-5 flex-1 overflow-y-auto space-y-4">
            {savedItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3">
                <div className="w-14 h-14 rounded-full bg-red-50 dark:bg-red-950/40 text-red-400 flex items-center justify-center">
                  <Heart className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-base text-slate-800 dark:text-slate-200 font-serif">
                  Your Wishlist is Empty
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
                  Click the heart icon on any Indian city, food delicacy, temple, or stay to bookmark it here for your travels.
                </p>
              </div>
            ) : (
              savedItems.map((item) => (
                <div
                  key={item.id}
                  className="group bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-3 border border-slate-200 dark:border-slate-700/80 flex gap-3 items-center justify-between"
                >
                  <img
                    src={item.imageUrl || item.image}
                    alt={item.title}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-orange-600 dark:text-orange-400">
                      {item.type}
                    </span>
                    <h5 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                      {item.title}
                    </h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {item.subtitle || item.locationName}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1">
                    {onAddToItinerary && (
                      <button
                        onClick={() => onAddToItinerary(item)}
                        className="p-1.5 rounded-lg bg-orange-500/10 text-orange-600 hover:bg-orange-500 hover:text-white transition-colors"
                        title="Add to Day Itinerary"
                      >
                        <CalendarPlus className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => {
                        onSelectDestination(item.locationName || item.title);
                        onClose();
                      }}
                      className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-orange-500 hover:text-white"
                      title="Open Destination"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-2">
            {onOpenItineraryPlanner && (
              <button
                onClick={() => {
                  onClose();
                  onOpenItineraryPlanner();
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:from-orange-600 hover:to-amber-600 transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Open Day-by-Day Itinerary Planner</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-300 transition-colors"
            >
              Continue Exploring
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
