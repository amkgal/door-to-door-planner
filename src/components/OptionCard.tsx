import React, { useState } from 'react';
import {
  Footprints,
  Clock,
  Bus,
  MapPin,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Navigation,
  Accessibility,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { JourneyOption } from '../types/transit';
import { JourneyTimeline } from './JourneyTimeline';

interface OptionCardProps {
  option: JourneyOption;
  isSelected: boolean;
  onSelect: () => void;
  onStartLiveTrip: (option: JourneyOption) => void;
}

export const OptionCard: React.FC<OptionCardProps> = ({
  option,
  isSelected,
  onSelect,
  onStartLiveTrip,
}) => {
  const [showStops, setShowStops] = useState(false);

  const badgeColorClasses = {
    emerald: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60',
    blue: 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60',
    amber: 'text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60',
  };

  return (
    <div
      className={`rounded-2xl transition-all duration-200 border overflow-hidden ${
        isSelected
          ? 'bg-white dark:bg-slate-900 border-slate-900 dark:border-white shadow-md ring-1 ring-slate-900 dark:ring-white'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700'
      }`}
    >
      {/* Top Banner / Card Header */}
      <div className="p-5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
              {option.label}
            </span>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <span
              className={`text-xs px-2.5 py-0.5 rounded-md font-medium ${
                badgeColorClasses[option.badgeTone]
              }`}
            >
              {option.badgeTitle}
            </span>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-4 text-xs font-mono tabular-nums">
            <div className="text-right">
              <span className="text-slate-400 dark:text-slate-500 font-sans text-[11px] block">
                Total Time
              </span>
              <span className="text-base font-bold text-slate-900 dark:text-white">
                {option.totalMinutes} min
              </span>
            </div>
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />
            <div className="text-right">
              <span className="text-slate-400 dark:text-slate-500 font-sans text-[11px] block">
                Arrival
              </span>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                {option.arrivalClock}
              </span>
            </div>
          </div>
        </div>

        {/* Highlight Rationale */}
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
          {option.highlightReason}
        </p>

        {/* Proportional Timeline Bar */}
        <div className="mt-4">
          <JourneyTimeline option={option} />
        </div>
      </div>

      {/* 5 Distinct Door-to-Door Stages */}
      <div className="p-5 space-y-4">
        {/* STAGE 1: Walk to Bus Stop */}
        <div className="flex items-start gap-3.5 group">
          <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 shrink-0 mt-0.5 font-mono text-xs font-bold">
            1
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-baseline justify-between gap-1">
              <div className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Footprints className="w-3.5 h-3.5 text-slate-500" />
                <span>Walk to Bus Stop</span>
              </div>
              <div className="text-xs font-mono font-bold tabular-nums text-slate-900 dark:text-white">
                {option.walkToStop.walkMinutes} mins{' '}
                <span className="text-slate-400 font-normal font-sans">
                  ({option.walkToStop.distanceMeters}m · ~{option.walkToStop.walkSteps} steps)
                </span>
              </div>
            </div>

            <div className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
              {option.walkToStop.name}{' '}
              <span className="text-xs font-mono font-normal text-slate-400">
                #{option.walkToStop.code}
              </span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {option.walkToStop.walkingInstruction}
            </div>

            {option.walkToStop.shelteredRatio >= 0.7 && (
              <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-3 h-3" />
                <span>{Math.round(option.walkToStop.shelteredRatio * 100)}% sheltered walkway</span>
              </div>
            )}
          </div>
        </div>

        {/* STAGE 2 & 3: Waiting Time & Next Bus Arrival */}
        <div className="flex items-start gap-3.5 group">
          <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs font-bold">
            2
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-baseline justify-between gap-1">
              <div className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Bus Waiting & Live Arrival</span>
              </div>
              <div className="text-xs font-mono font-bold tabular-nums text-amber-700 dark:text-amber-400">
                Wait ~{option.busArrival.waitMinutes} mins at stop
              </div>
            </div>

            {/* Arrival Clock Time & Subsequent bus */}
            <div className="mt-1.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600 dark:text-slate-300">
                  Next bus arrives at:
                </span>
                <span className="font-mono text-sm font-bold tabular-nums text-slate-900 dark:text-white">
                  {option.busArrival.nextArrivalClock}
                </span>
                <span className="text-slate-400 dark:text-slate-500 text-xs font-mono">
                  (~{option.busArrival.waitMinutes}m platform wait)
                </span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                Following bus: in {option.busArrival.subsequentArrivalMinutes}m
              </div>
            </div>

            {/* Bus Features & Occupancy */}
            <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
              <span className="px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-medium">
                {option.busArrival.occupancy}
              </span>
              <span>·</span>
              {option.busArrival.isDoubleDecker && <span>Double Decker</span>}
              {option.busArrival.isDoubleDecker && <span>·</span>}
              {option.busArrival.isWheelchairAccessible && (
                <span className="flex items-center gap-1">
                  <Accessibility className="w-3 h-3 text-slate-400" />
                  Wheelchair Accessible
                </span>
              )}
            </div>
          </div>
        </div>

        {/* STAGE 4: Actual Journey on Bus */}
        <div className="flex items-start gap-3.5 group">
          <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs font-bold">
            3
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-baseline justify-between gap-1">
              <div className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Bus className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Actual Journey on Bus</span>
              </div>
              <div className="text-xs font-mono font-bold tabular-nums text-emerald-700 dark:text-emerald-400">
                {option.busJourney.rideMinutes} mins ride
              </div>
            </div>

            {/* Bus Line Lockup */}
            <div className="mt-2 flex items-center gap-3">
              <div className="px-3 py-1 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-mono font-bold text-sm tracking-tight shadow-2xs">
                Bus {option.busArrival.serviceNumber}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300">
                <span>{option.busJourney.stopCount} stops</span>
                <span className="mx-1.5 text-slate-300 dark:text-slate-600">·</span>
                <span>{option.busJourney.distanceKm} km</span>
                <span className="mx-1.5 text-slate-300 dark:text-slate-600">·</span>
                <span className="font-mono text-slate-500">{option.busJourney.fareEstimate}</span>
              </div>
            </div>

            {/* Boarding and Alighting Info */}
            <div className="mt-2 text-xs text-slate-500 dark:text-slate-400 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-medium">Board at:</span>
                <span className="text-slate-800 dark:text-slate-200 font-medium">
                  {option.busJourney.boardingStop.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-medium">Alight at:</span>
                <span className="text-slate-800 dark:text-slate-200 font-medium">
                  {option.busJourney.alightingStop.name} (#{option.busJourney.alightingStop.code})
                </span>
              </div>
            </div>

            {/* Toggle Intermediate Stops View */}
            <div className="mt-2.5">
              <button
                type="button"
                onClick={() => setShowStops(!showStops)}
                className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 font-medium transition-colors"
              >
                <span>{showStops ? 'Hide stops list' : `View all ${option.busJourney.stopCount} stops`}</span>
                {showStops ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {showStops && (
                <div className="mt-2 pl-3 border-l-2 border-emerald-500/30 space-y-1.5 py-1 text-xs">
                  {option.busJourney.stopsList.map((stop, idx) => (
                    <div key={stop.id} className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-2 truncate">
                        <span className="font-mono text-[10px] text-slate-400 w-4">{idx + 1}.</span>
                        <span className="truncate">{stop.name}</span>
                      </div>
                      <span className="text-[11px] text-slate-400 truncate max-w-[120px] font-sans">
                        {stop.roadName}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* STAGE 5: Walking to Destination after getting off the bus */}
        <div className="flex items-start gap-3.5 group">
          <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 shrink-0 mt-0.5 font-mono text-xs font-bold">
            4
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-baseline justify-between gap-1">
              <div className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                <span>Walk to Destination from Bus Stop</span>
              </div>
              <div className="text-xs font-mono font-bold tabular-nums text-slate-900 dark:text-white">
                {option.walkToDestination.walkMinutes} mins{' '}
                <span className="text-slate-400 font-normal font-sans">
                  ({option.walkToDestination.distanceMeters}m · ~{option.walkToDestination.walkSteps} steps)
                </span>
              </div>
            </div>

            <div className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
              From {option.busJourney.alightingStop.name} to Destination
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {option.walkToDestination.walkingInstruction}
            </div>
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-slate-500 dark:text-slate-400">
          <span>Total walking: </span>
          <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono">
            {option.totalWalkingMinutes} mins ({option.totalWalkingDistanceMeters}m)
          </span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {!isSelected && (
            <button
              type="button"
              onClick={onSelect}
              className="flex-1 sm:flex-none px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-colors"
            >
              Select Option
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              onSelect();
              onStartLiveTrip(option);
            }}
            className="flex-1 sm:flex-none px-4 py-2 text-xs font-medium bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-xs flex items-center justify-center gap-1.5"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Start Live Trip</span>
          </button>
        </div>
      </div>
    </div>
  );
};
