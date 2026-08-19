import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { PlaceItem, HotelItem, RestaurantItem, Coordinates } from '../types';

interface InteractiveMapProps {
  center: Coordinates;
  zoom?: number;
  places?: PlaceItem[];
  hotels?: HotelItem[];
  restaurants?: RestaurantItem[];
  selectedItemId?: string | null;
  onSelectItem?: (id: string, type: 'place' | 'hotel' | 'restaurant') => void;
  darkMode?: boolean;
  className?: string;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  center,
  zoom = 12,
  places = [],
  hotels = [],
  restaurants = [],
  selectedItemId,
  onSelectItem,
  darkMode = false,
  className = 'h-[480px] w-full rounded-3xl overflow-hidden'
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const safeCenterLat = center?.lat ?? 20.5937;
  const safeCenterLng = center?.lng ?? 78.9629;

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [safeCenterLat, safeCenterLng],
        zoom: zoom,
        zoomControl: true,
        scrollWheelZoom: true
      });

      // CartoDB tiles for elegant UI match
      const tileUrl = darkMode
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

      L.tileLayer(tileUrl, {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a> | &copy; OpenStreetMap',
        maxZoom: 19
      }).addTo(map);

      const markersGroup = L.layerGroup().addTo(map);
      markersLayerRef.current = markersGroup;
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [darkMode]);

  // Center update
  useEffect(() => {
    if (mapInstanceRef.current && safeCenterLat != null && safeCenterLng != null) {
      mapInstanceRef.current.flyTo([safeCenterLat, safeCenterLng], zoom, {
        duration: 1.2
      });
    }
  }, [safeCenterLat, safeCenterLng, zoom]);

  // Markers update
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    const bounds = L.latLngBounds([]);

    // Helper to create styled pin icon
    const createCustomIcon = (color: string, iconSymbol: string, isSelected: boolean) => {
      const size = isSelected ? 38 : 30;
      return L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.35);
            border: 2px solid #ffffff;
            cursor: pointer;
            transition: transform 0.2s ease;
          ">
            <span style="
              transform: rotate(45deg);
              color: #ffffff;
              font-size: ${isSelected ? 14 : 12}px;
              font-weight: bold;
            ">${iconSymbol}</span>
          </div>
        `,
        iconSize: [size, size],
        iconAnchor: [size / 2, size]
      });
    };

    // Add Places Markers (Emerald / Green)
    (Array.isArray(places) ? places : []).forEach((place) => {
      if (!place || !place.coordinates || typeof place.coordinates.lat !== 'number' || typeof place.coordinates.lng !== 'number') return;
      const isSelected = selectedItemId === place.id;
      const icon = createCustomIcon('#10b981', '📍', isSelected);
      const ratingStr = typeof place.rating === 'number' ? place.rating.toFixed(1) : '4.5';
      const categoryStr = (place.category || 'Attraction').toUpperCase();

      const marker = L.marker([place.coordinates.lat, place.coordinates.lng], { icon })
        .bindPopup(`
          <div style="min-width: 200px; padding: 2px;">
            ${place.imageUrl ? `<img src="${place.imageUrl}" style="width: 100%; height: 110px; object-fit: cover; border-radius: 8px; margin-bottom: 6px;" />` : ''}
            <div style="font-weight: 700; font-size: 14px; margin-bottom: 2px; color: #0f172a;">${place.name || 'Location'}</div>
            <div style="font-size: 11px; color: #10b981; font-weight: 600; text-transform: uppercase;">${categoryStr} • ★ ${ratingStr}</div>
            <div style="font-size: 11px; color: #64748b; margin-top: 4px;">${place.address || ''}</div>
          </div>
        `);

      marker.on('click', () => {
        if (onSelectItem) onSelectItem(place.id, 'place');
      });

      markersLayerRef.current?.addLayer(marker);
      bounds.extend([place.coordinates.lat, place.coordinates.lng]);
    });

    // Add Hotel Markers (Cyan / Blue)
    (Array.isArray(hotels) ? hotels : []).forEach((hotel) => {
      if (!hotel || !hotel.coordinates || typeof hotel.coordinates.lat !== 'number' || typeof hotel.coordinates.lng !== 'number') return;
      const isSelected = selectedItemId === hotel.id;
      const icon = createCustomIcon('#0284c7', '🏨', isSelected);
      const starRatingStr = hotel.starRating ? `${hotel.starRating}★ ` : '';
      const tierStr = (hotel.tier ? String(hotel.tier) : (hotel.category ? String(hotel.category) : 'Stay')).replace('_', ' ').toUpperCase();
      const priceStr = typeof hotel.pricePerNight === 'number' ? hotel.pricePerNight.toLocaleString('en-IN') : '0';

      const marker = L.marker([hotel.coordinates.lat, hotel.coordinates.lng], { icon })
        .bindPopup(`
          <div style="min-width: 200px; padding: 2px;">
            ${hotel.imageUrl ? `<img src="${hotel.imageUrl}" style="width: 100%; height: 110px; object-fit: cover; border-radius: 8px; margin-bottom: 6px;" />` : ''}
            <div style="font-weight: 700; font-size: 14px; margin-bottom: 2px; color: #0f172a;">${hotel.name || 'Hotel'}</div>
            <div style="font-size: 11px; color: #0284c7; font-weight: 600;">${starRatingStr}${tierStr} • ₹${priceStr}/night</div>
            <div style="font-size: 11px; color: #64748b; margin-top: 4px;">${hotel.address || ''}</div>
          </div>
        `);

      marker.on('click', () => {
        if (onSelectItem) onSelectItem(hotel.id, 'hotel');
      });

      markersLayerRef.current?.addLayer(marker);
      bounds.extend([hotel.coordinates.lat, hotel.coordinates.lng]);
    });

    // Add Restaurant Markers (Amber / Orange)
    (Array.isArray(restaurants) ? restaurants : []).forEach((rest) => {
      if (!rest || !rest.coordinates || typeof rest.coordinates.lat !== 'number' || typeof rest.coordinates.lng !== 'number') return;
      const isSelected = selectedItemId === rest.id;
      const icon = createCustomIcon('#f59e0b', '🍽️', isSelected);
      const ratingStr = typeof rest.rating === 'number' ? rest.rating.toFixed(1) : '4.5';
      const costStr = rest.costForTwo || '₹600 for two';

      const marker = L.marker([rest.coordinates.lat, rest.coordinates.lng], { icon })
        .bindPopup(`
          <div style="min-width: 200px; padding: 2px;">
            ${rest.imageUrl ? `<img src="${rest.imageUrl}" style="width: 100%; height: 110px; object-fit: cover; border-radius: 8px; margin-bottom: 6px;" />` : ''}
            <div style="font-weight: 700; font-size: 14px; margin-bottom: 2px; color: #0f172a;">${rest.name || 'Restaurant'}</div>
            <div style="font-size: 11px; color: #d97706; font-weight: 600;">★ ${ratingStr} • ${costStr}</div>
            <div style="font-size: 11px; color: #64748b; margin-top: 4px;">${rest.address || ''}</div>
          </div>
        `);

      marker.on('click', () => {
        if (onSelectItem) onSelectItem(rest.id, 'restaurant');
      });

      markersLayerRef.current?.addLayer(marker);
      bounds.extend([rest.coordinates.lat, rest.coordinates.lng]);
    });

    // If we have markers and default center, adjust bounds
    if (bounds.isValid() && (places.length + hotels.length + restaurants.length) > 1) {
      mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    }
  }, [places, hotels, restaurants, selectedItemId, onSelectItem]);

  return (
    <div className={`relative border border-slate-200 dark:border-slate-800 shadow-xl ${className}`}>
      <div ref={mapContainerRef} className="w-full h-full" />
      
      {/* Legend Badge */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 flex items-center gap-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span>Places ({places.length})</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-600" />
          <span>Stays ({hotels.length})</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span>Dine ({restaurants.length})</span>
        </div>
      </div>
    </div>
  );
};
