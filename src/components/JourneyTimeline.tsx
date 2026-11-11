import React from 'react';
import { Footprints, Clock, Bus, MapPin } from 'lucide-react';
import { JourneyOption } from '../types/transit';

interface JourneyTimelineProps {
  option: JourneyOption;
  compact?: boolean;
}

export const JourneyTimeline: React.FC<JourneyTimelineProps> = ({ option, compact = false }) => {
  const walk1 = option.walkToStop.walkMinutes;
  const wait = option.busArrival.waitMinutes;
  const ride = option.busJourney.rideMinutes;
  const walk2 = option.walkToDestination.walkMinutes;
  const total = walk1 + wait + ride + walk2;

  const pctWalk1 = Math.max(12, Math.round((walk1 / total) * 100));
  const pctWait = Math.max(10, Math.round((wait / total) * 100));
  const pctRide = Math.max(25, 100 - (pctWalk1 + pctWait + Math.max(12, Math.round((walk2 / total) * 100))));
  const pctWalk2 = 100 - (pctWalk1 + pctWait + pctRide);

  if (compact) {
    return (
      <div className="w-full">
        <div className="h-2 w-full rounded-full overflow-hidden flex bg-slate-100 dark:bg-slate-800">
          <div
            style={{ width: `${pctWalk1}%` }}
            className="bg-slate-400 dark:bg-slate-500 h-full"
            title={`Walk to stop: ${walk1}m`}
          />
          <div
            style={{ width: `${pctWait}%` }}
            className="bg-amber-400 dark:bg-amber-500 h-full border-l border-white/40 dark:border-slate-900/40"
            title={`Wait: ${wait}m`}
          />
          <div
            style={{ width: `${pctRide}%` }}
            className="bg-emerald-600 dark:bg-emerald-500 h-full border-l border-white/40 dark:border-slate-900/40"
            title={`Bus ride: ${ride}m`}
          />
          <div
            style={{ width: `${pctWalk2}%` }}
            className="bg-slate-400 dark:bg-slate-500 h-full border-l border-white/40 dark:border-slate-900/40"
            title={`Walk to destination: ${walk2}m`}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-2">
      {/* Proportion Bar */}
      <div className="h-3 w-full rounded-md overflow-hidden flex bg-slate-100 dark:bg-slate-800 p-0.5 gap-0.5">
        <div
          style={{ width: `${pctWalk1}%` }}
          className="bg-slate-400/80 dark:bg-slate-500 rounded-xs h-full transition-all duration-300"
          title={`Walk: ${walk1} mins (${option.walkToStop.distanceMeters}m)`}
        />
        <div
          style={{ width: `${pctWait}%` }}
          className="bg-amber-400 dark:bg-amber-500 rounded-xs h-full transition-all duration-300"
          title={`Wait at stop: ${wait} mins`}
        />
        <div
          style={{ width: `${pctRide}%` }}
          className="bg-emerald-600 dark:bg-emerald-500 rounded-xs h-full transition-all duration-300"
          title={`Bus ${option.busArrival.serviceNumber}: ${ride} mins`}
        />
        <div
          style={{ width: `${pctWalk2}%` }}
          className="bg-slate-400/80 dark:bg-slate-500 rounded-xs h-full transition-all duration-300"
          title={`Final walk: ${walk2} mins (${option.walkToDestination.distanceMeters}m)`}
        />
      </div>

      {/* Segment Legend with Clear Tabular Labels */}
      <div className="grid grid-cols-4 gap-1 text-[11px] text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5 truncate">
          <Footprints className="w-3 h-3 text-slate-400 shrink-0" />
          <span className="truncate">Walk {walk1}m</span>
        </div>
        <div className="flex items-center gap-1.5 truncate">
          <Clock className="w-3 h-3 text-amber-500 shrink-0" />
          <span className="truncate">Wait {wait}m</span>
        </div>
        <div className="flex items-center gap-1.5 truncate text-emerald-700 dark:text-emerald-400 font-medium">
          <Bus className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span className="truncate">Bus {option.busArrival.serviceNumber} ({ride}m)</span>
        </div>
        <div className="flex items-center gap-1.5 truncate">
          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
          <span className="truncate">Walk {walk2}m</span>
        </div>
      </div>
    </div>
  );
};
