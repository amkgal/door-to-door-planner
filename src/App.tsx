import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { RouteSearch } from './components/RouteSearch';
import { DecisionSummary } from './components/DecisionSummary';
import { OptionCard } from './components/OptionCard';
import { TransitSchematicMap } from './components/TransitSchematicMap';
import { LiveTripModal } from './components/LiveTripModal';
import { SavedHubsView } from './components/SavedHubsView';
import { ApiInspectorModal } from './components/ApiInspectorModal';
import { generateThreeOptions, resolvePostalLocation } from './data/mockRoutes';
import { generateLiveOptions } from './services/liveTransit';
import { JourneyOption, WalkingPace, PostalLocation } from './types/transit';
import { Compass } from 'lucide-react';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [originCode, setOriginCode] = useState('048581'); // One Raffles Place
  const [destCode, setDestCode] = useState('238839'); // 313 Somerset Orchard
  const [resolvedOrigin, setResolvedOrigin] = useState<PostalLocation>(() => resolvePostalLocation('048581'));
  const [resolvedDest, setResolvedDest] = useState<PostalLocation>(() => resolvePostalLocation('238839'));
  const [options, setOptions] = useState<JourneyOption[]>(() => {
    const init = generateThreeOptions('048581', '238839', 'normal', new Date());
    return init.options;
  });

  const [walkingPace, setWalkingPace] = useState<WalkingPace>('normal');
  const [selectedOptionId, setSelectedOptionId] = useState<string>('option-a');
  const [activeView, setActiveView] = useState<'planner' | 'schematic' | 'saved'>('planner');
  const [activeLiveTrip, setActiveLiveTrip] = useState<JourneyOption | null>(null);
  const [showApiInspector, setShowApiInspector] = useState(false);
  const [filterPreference, setFilterPreference] = useState<'all' | 'option-a' | 'option-b' | 'option-c'>('all');
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Dark mode effect
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Live clock tick
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 10000);
    return () => clearInterval(timer);
  }, []);

  const currentTimeString = useMemo(() => {
    const h = currentTime.getHours().toString().padStart(2, '0');
    const m = currentTime.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
  }, [currentTime]);

  // Generate options based on live resolved origin and destination locations
  useEffect(() => {
    let active = true;
    generateLiveOptions(resolvedOrigin, resolvedDest, walkingPace, currentTime).then((liveOpts) => {
      if (active) {
        setOptions(liveOpts);
      }
    });
    return () => {
      active = false;
    };
  }, [resolvedOrigin, resolvedDest, walkingPace, currentTime]);

  // Handle swap
  const handleSwap = () => {
    const tempCode = originCode;
    const tempLoc = resolvedOrigin;
    setOriginCode(destCode);
    setResolvedOrigin(resolvedDest);
    setDestCode(tempCode);
    setResolvedDest(tempLoc);
  };

  const handleSelectPreset = (orig: string, dest: string) => {
    setOriginCode(orig);
    setDestCode(dest);
    setResolvedOrigin(resolvePostalLocation(orig));
    setResolvedDest(resolvePostalLocation(dest));
    setActiveView('planner');
  };

  const visibleOptions = useMemo(() => {
    if (filterPreference === 'all') return options;
    return options.filter((o) => o.id === filterPreference);
  }, [options, filterPreference]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors flex flex-col font-sans">
      {/* 3-Zone Minimalist Header */}
      <Header
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        activeView={activeView}
        setActiveView={setActiveView}
        currentTimeString={currentTimeString}
        onOpenApiInspector={() => setShowApiInspector(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Postal Code Route Search Box */}
        <RouteSearch
          originCode={originCode}
          destCode={destCode}
          resolvedOrigin={resolvedOrigin}
          resolvedDest={resolvedDest}
          onOriginChange={setOriginCode}
          onDestChange={setDestCode}
          onSelectOriginLocation={setResolvedOrigin}
          onSelectDestLocation={setResolvedDest}
          walkingPace={walkingPace}
          onWalkingPaceChange={setWalkingPace}
          onSwap={handleSwap}
          onSelectPreset={handleSelectPreset}
        />

        {/* View Switching */}
        {activeView === 'saved' ? (
          <SavedHubsView
            onSelectHubAsOrigin={(code) => {
              setOriginCode(code);
              setResolvedOrigin(resolvePostalLocation(code));
              setActiveView('planner');
            }}
            onSelectHubAsDestination={(code) => {
              setDestCode(code);
              setResolvedDest(resolvePostalLocation(code));
              setActiveView('planner');
            }}
          />
        ) : (
          <>
            {/* Decision Matrix: Which Bus Stop to Walk To? */}
            <DecisionSummary
              options={options}
              selectedId={selectedOptionId}
              onSelectOption={(id) => setSelectedOptionId(id)}
            />

            {/* Interactive Schematic Map Section */}
            {activeView === 'schematic' ? (
              <TransitSchematicMap
                origin={resolvedOrigin}
                destination={resolvedDest}
                options={options}
                selectedId={selectedOptionId}
                onSelectOption={(id) => setSelectedOptionId(id)}
              />
            ) : (
              /* Collapsible or compact map preview affordance */
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 shrink-0">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Spatial Schematic Overview
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      View candidate bus stop walking radii and bus path trajectories on the geometric map
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveView('schematic')}
                  className="px-3.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap"
                >
                  Expand Full Schematic Map
                </button>
              </div>
            )}

            {/* Filter / Tabs for the 3 Options */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                  Proposed Door-to-Door Options (3)
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Comprehensive 5-stage breakdown: walk to stop, wait, next bus arrival, ride, and final walk
                </p>
              </div>

              {/* Functional interactive filter tabs */}
              <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setFilterPreference('all')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                    filterPreference === 'all'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  All 3 Options
                </button>
                <button
                  type="button"
                  onClick={() => setFilterPreference('option-a')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                    filterPreference === 'option-a'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Option A (Fastest)
                </button>
                <button
                  type="button"
                  onClick={() => setFilterPreference('option-b')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                    filterPreference === 'option-b'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Option B (Least Walk)
                </button>
                <button
                  type="button"
                  onClick={() => setFilterPreference('option-c')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                    filterPreference === 'option-c'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Option C (Next Bus)
                </button>
              </div>
            </div>

            {/* Detailed Cards for Options */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {visibleOptions.map((opt) => (
                <OptionCard
                  key={opt.id}
                  option={opt}
                  isSelected={opt.id === selectedOptionId}
                  onSelect={() => setSelectedOptionId(opt.id)}
                  onStartLiveTrip={(o) => setActiveLiveTrip(o)}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Live Trip Modal */}
      {activeLiveTrip && (
        <LiveTripModal
          option={activeLiveTrip}
          onClose={() => setActiveLiveTrip(null)}
        />
      )}

      {/* API Inspector Explorer Modal */}
      {showApiInspector && (
        <ApiInspectorModal onClose={() => setShowApiInspector(false)} />
      )}

      {/* Quiet Minimalist Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 mt-12 py-6 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900 dark:text-white">Transịt</span>
            <span>·</span>
            <span>Minimalist Door-to-Door Bus Navigation Engine</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Postal Code Routing Ready</span>
            <span>·</span>
            <span>Live Bus Arrival Countdown</span>
            <span>·</span>
            <span>Clean Front-End Architecture</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
