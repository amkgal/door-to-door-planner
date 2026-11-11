import React, { useState } from 'react';
import { ArrowUpDown, Search, MapPin, Footprints, RotateCcw } from 'lucide-react';
import { KNOWN_POSTAL_LOCATIONS, PRESET_ROUTES, resolvePostalLocation } from '../data/mockRoutes';
import { WalkingPace } from '../types/transit';

interface RouteSearchProps {
  originCode: string;
  destCode: string;
  onOriginChange: (code: string) => void;
  onDestChange: (code: string) => void;
  walkingPace: WalkingPace;
  onWalkingPaceChange: (pace: WalkingPace) => void;
  onSwap: () => void;
  onSelectPreset: (origin: string, dest: string) => void;
}

export const RouteSearch: React.FC<RouteSearchProps> = ({
  originCode,
  destCode,
  onOriginChange,
  onDestChange,
  walkingPace,
  onWalkingPaceChange,
  onSwap,
  onSelectPreset,
}) => {
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);

  const resolvedOrigin = resolvePostalLocation(originCode);
  const resolvedDest = resolvePostalLocation(destCode);

  const knownList = Object.values(KNOWN_POSTAL_LOCATIONS);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs transition-colors">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between pb-4 border-b border-slate-100 dark:border-slate-800/80">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Door-to-Door Transit Planner
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Compare walking routes to candidate bus stops, wait times, and end-to-end journey duration
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
            Starting Postal Code
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
              onBlur={() => setTimeout(() => setShowOriginSuggestions(false), 200)}
              placeholder="e.g. 048581"
              maxLength={10}
              className="w-full pl-9 pr-3 py-2.5 text-sm font-medium bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition-all font-mono"
            />
          </div>

          {/* Resolved Name Preview */}
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 truncate flex items-center gap-1.5">
            <span className="font-medium text-slate-700 dark:text-slate-300">{resolvedOrigin.name}</span>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <span className="truncate">{resolvedOrigin.area}</span>
          </div>

          {/* Suggestions Dropdown */}
          {showOriginSuggestions && (
            <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg max-h-56 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700/50">
              <div className="p-2 text-[10px] font-semibold uppercase text-slate-400 tracking-wider">
                Select Popular Origin
              </div>
              {knownList.map((loc) => (
                <button
                  key={loc.postalCode}
                  type="button"
                  onMouseDown={() => {
                    onOriginChange(loc.postalCode);
                    setShowOriginSuggestions(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 dark:hover:bg-slate-700/60 flex items-center justify-between"
                >
                  <div className="truncate pr-2">
                    <span className="font-medium text-slate-900 dark:text-white">{loc.name}</span>
                    <span className="text-slate-500 dark:text-slate-400 text-[11px] block truncate">{loc.area}</span>
                  </div>
                  <span className="font-mono text-slate-400 dark:text-slate-500 shrink-0">{loc.postalCode}</span>
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
            Destination Postal Code
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
              onBlur={() => setTimeout(() => setShowDestSuggestions(false), 200)}
              placeholder="e.g. 238839"
              maxLength={10}
              className="w-full pl-9 pr-3 py-2.5 text-sm font-medium bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition-all font-mono"
            />
          </div>

          {/* Resolved Name Preview */}
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 truncate flex items-center gap-1.5">
            <span className="font-medium text-slate-700 dark:text-slate-300">{resolvedDest.name}</span>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <span className="truncate">{resolvedDest.area}</span>
          </div>

          {/* Suggestions Dropdown */}
          {showDestSuggestions && (
            <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg max-h-56 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700/50">
              <div className="p-2 text-[10px] font-semibold uppercase text-slate-400 tracking-wider">
                Select Popular Destination
              </div>
              {knownList.map((loc) => (
                <button
                  key={loc.postalCode}
                  type="button"
                  onMouseDown={() => {
                    onDestChange(loc.postalCode);
                    setShowDestSuggestions(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 dark:hover:bg-slate-700/60 flex items-center justify-between"
                >
                  <div className="truncate pr-2">
                    <span className="font-medium text-slate-900 dark:text-white">{loc.name}</span>
                    <span className="text-slate-500 dark:text-slate-400 text-[11px] block truncate">{loc.area}</span>
                  </div>
                  <span className="font-mono text-slate-400 dark:text-slate-500 shrink-0">{loc.postalCode}</span>
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
            {route.title}
          </button>
        ))}
      </div>
    </div>
  );
};
