import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpDown, Search, MapPin, Footprints, Loader2, CheckCircle2 } from 'lucide-react';
import { PRESET_ROUTES } from '../data/mockRoutes';
import { WalkingPace, PostalLocation } from '../types/transit';
import { fetchLiveGeocode } from '../services/liveTransit';

interface RouteSearchProps {
  originCode: string;
  destCode: string;
  resolvedOrigin: PostalLocation;
  resolvedDest: PostalLocation;
  onOriginChange: (code: string) => void;
  onDestChange: (code: string) => void;
  onSelectOriginLocation: (loc: PostalLocation) => void;
  onSelectDestLocation: (loc: PostalLocation) => void;
  walkingPace: WalkingPace;
  onWalkingPaceChange: (pace: WalkingPace) => void;
  onSwap: () => void;
  onSelectPreset: (origin: string, dest: string) => void;
}

export const RouteSearch: React.FC<RouteSearchProps> = ({
  originCode,
  destCode,
  resolvedOrigin,
  resolvedDest,
  onOriginChange,
  onDestChange,
  onSelectOriginLocation,
  onSelectDestLocation,
  walkingPace,
  onWalkingPaceChange,
  onSwap,
  onSelectPreset,
}) => {
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);
  const [originSuggestions, setOriginSuggestions] = useState<PostalLocation[]>([]);
  const [destSuggestions, setDestSuggestions] = useState<PostalLocation[]>([]);
  const [loadingOrigin, setLoadingOrigin] = useState(false);
  const [loadingDest, setLoadingDest] = useState(false);

  // Debounced live geocode for Origin
  useEffect(() => {
    if (!originCode || originCode.length < 3) {
      setOriginSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoadingOrigin(true);
      try {
        const results = await fetchLiveGeocode(originCode);
        setOriginSuggestions(results);
        if (results.length > 0 && results[0].isLive) {
          onSelectOriginLocation(results[0]);
        }
      } finally {
        setLoadingOrigin(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [originCode]);

  // Debounced live geocode for Destination
  useEffect(() => {
    if (!destCode || destCode.length < 3) {
      setDestSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoadingDest(true);
      try {
        const results = await fetchLiveGeocode(destCode);
        setDestSuggestions(results);
        if (results.length > 0 && results[0].isLive) {
          onSelectDestLocation(results[0]);
        }
      } finally {
        setLoadingDest(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [destCode]);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs transition-colors">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between pb-4 border-b border-slate-100 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Door-to-Door Transit Planner
            </h1>
            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live OneMap &amp; LTA Feeds
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Key in any Singapore postal code or place name to retrieve live building locations and bus timings
          </p>
        </div>

        {/* Walking Pace Selector */}
        <div className="flex items-center gap-2 self-start lg:self-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mr-1">
            <Footprints className="w-3.5 h-3.5 text-slate-400" />
            <span>Pace:</span>
          </div>
          <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
            {(['relaxed', 'normal', 'brisk'] as WalkingPace[]).map((p) => {
              const labels = { relaxed: 'Relaxed', normal: 'Normal', brisk: 'Brisk' };
              const speedLabels = { relaxed: '3.5 km/h', normal: '4.8 km/h', brisk: '5.8 km/h' };
              const active = walkingPace === p;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => onWalkingPaceChange(p)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                    active
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title={speedLabels[p]}
                >
                  {labels[p]}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Search Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mt-4 items-center">
        {/* Origin Postal Code */}
        <div className="md:col-span-5 relative">
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
            Starting Postal Code / Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-emerald-600 dark:text-emerald-400">
              <MapPin className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={originCode}
              onChange={(e) => onOriginChange(e.target.value)}
              onFocus={() => setShowOriginSuggestions(true)}
              onBlur={() => setTimeout(() => setShowOriginSuggestions(false), 250)}
              placeholder="e.g. 529510 or 048581"
              maxLength={24}
              className="w-full pl-9 pr-9 py-2.5 text-sm font-medium bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition-all font-mono"
            />
            {loadingOrigin && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            )}
          </div>

          {/* Resolved Live Name Preview */}
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 truncate flex items-center gap-1.5">
            <span className="font-semibold text-slate-800 dark:text-slate-200">{resolvedOrigin.name}</span>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <span className="truncate">{resolvedOrigin.area}</span>
            {resolvedOrigin.isLive && (
              <span className="ml-auto text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-medium flex items-center gap-0.5 shrink-0">
                <CheckCircle2 className="w-3 h-3" /> OneMap Live
              </span>
            )}
          </div>

          {/* Live Autocomplete Suggestions Dropdown */}
          {showOriginSuggestions && originSuggestions.length > 0 && (
            <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl max-h-60 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700/50">
              <div className="p-2 text-[10px] font-semibold uppercase text-slate-400 tracking-wider">
                Live OneMap Results ({originSuggestions.length})
              </div>
              {originSuggestions.map((loc, i) => (
                <button
                  key={`${loc.postalCode}-${i}`}
                  type="button"
                  onMouseDown={() => {
                    onOriginChange(loc.postalCode);
                    onSelectOriginLocation(loc);
                    setShowOriginSuggestions(false);
                  }}
                  className="w-full text-left px-3 py-2.5 text-xs hover:bg-slate-50 dark:hover:bg-slate-700/60 flex items-center justify-between transition-colors"
                >
                  <div className="truncate pr-2">
                    <span className="font-semibold text-slate-900 dark:text-white block truncate">
                      {loc.name}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 text-[11px] block truncate">
                      {loc.address || loc.area}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-600 dark:text-slate-300 shrink-0 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">
                    {loc.postalCode}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Swap Button */}
        <div className="md:col-span-2 flex justify-center py-1 md:py-0">
          <button
            type="button"
            onClick={onSwap}
            title="Swap Origin and Destination"
            aria-label="Swap Starting and Destination Postal Codes"
            className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-all shadow-2xs hover:scale-105 active:scale-95"
          >
            <ArrowUpDown className="w-4 h-4" />
          </button>
        </div>

        {/* Destination Postal Code */}
        <div className="md:col-span-5 relative">
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
            Destination Postal Code / Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-red-500 dark:text-red-400">
              <MapPin className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={destCode}
              onChange={(e) => onDestChange(e.target.value)}
              onFocus={() => setShowDestSuggestions(true)}
              onBlur={() => setTimeout(() => setShowDestSuggestions(false), 250)}
              placeholder="e.g. 238839 or Orchard Road"
              maxLength={24}
              className="w-full pl-9 pr-9 py-2.5 text-sm font-medium bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition-all font-mono"
            />
            {loadingDest && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            )}
          </div>

          {/* Resolved Live Name Preview */}
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 truncate flex items-center gap-1.5">
            <span className="font-semibold text-slate-800 dark:text-slate-200">{resolvedDest.name}</span>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <span className="truncate">{resolvedDest.area}</span>
            {resolvedDest.isLive && (
              <span className="ml-auto text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-medium flex items-center gap-0.5 shrink-0">
                <CheckCircle2 className="w-3 h-3" /> OneMap Live
              </span>
            )}
          </div>

          {/* Live Autocomplete Suggestions Dropdown */}
          {showDestSuggestions && destSuggestions.length > 0 && (
            <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl max-h-60 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700/50">
              <div className="p-2 text-[10px] font-semibold uppercase text-slate-400 tracking-wider">
                Live OneMap Results ({destSuggestions.length})
              </div>
              {destSuggestions.map((loc, i) => (
                <button
                  key={`${loc.postalCode}-${i}`}
                  type="button"
                  onMouseDown={() => {
                    onDestChange(loc.postalCode);
                    onSelectDestLocation(loc);
                    setShowDestSuggestions(false);
                  }}
                  className="w-full text-left px-3 py-2.5 text-xs hover:bg-slate-50 dark:hover:bg-slate-700/60 flex items-center justify-between transition-colors"
                >
                  <div className="truncate pr-2">
                    <span className="font-semibold text-slate-900 dark:text-white block truncate">
                      {loc.name}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 text-[11px] block truncate">
                      {loc.address || loc.area}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-600 dark:text-slate-300 shrink-0 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">
                    {loc.postalCode}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Preset Quick Routes */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 whitespace-nowrap">
          Quick test routes:
        </span>
        {PRESET_ROUTES.map((route, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onSelectPreset(route.origin, route.destination)}
            className="text-xs px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-600 transition-colors whitespace-nowrap"
          >
            {route.title} ({route.origin} → {route.destination})
          </button>
        ))}
      </div>
    </div>
  );
};
