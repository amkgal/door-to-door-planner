import React from 'react';
import { Footprints, Clock, Bus, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { JourneyOption } from '../types/transit';

interface DecisionSummaryProps {
  options: JourneyOption[];
  selectedId: string;
  onSelectOption: (id: string) => void;
}

export const DecisionSummary: React.FC<DecisionSummaryProps> = ({
  options,
  selectedId,
  onSelectOption,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
            Stop Decision Matrix
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Compare candidate bus stops from your starting postal code
          </p>
        </div>
        <div className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1.5 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Real-time platform estimates</span>
        </div>
      </div>

      {/* Grid Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {options.map((opt) => {
          const isSelected = opt.id === selectedId;
          const badgeColors = {
            emerald: 'border-emerald-500 text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20',
            blue: 'border-blue-500 text-blue-700 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/20',
            amber: 'border-amber-500 text-amber-700 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-950/20',
          };

          return (
            <div
              key={opt.id}
              onClick={() => onSelectOption(opt.id)}
              className={`relative rounded-xl p-4 border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-slate-900 dark:border-white ring-1 ring-slate-900 dark:ring-white bg-slate-50/80 dark:bg-slate-800/60 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 bg-white dark:bg-slate-900'
              }`}
            >
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {opt.label}
                    </span>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500">·</span>
                    <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate max-w-[140px]">
                      {opt.badgeTitle}
                    </span>
                  </div>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </div>

                {/* Target Bus Stop */}
                <div className="mb-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold">
                    Target Bus Stop
                  </div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white truncate mt-0.5">
                    {opt.walkToStop.name}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <Footprints className="w-3 h-3 text-slate-400" />
                    <span>
                      {opt.walkToStop.walkMinutes} min walk ({opt.walkToStop.distanceMeters}m)
                    </span>
                  </div>
                </div>

                {/* Bus & Waiting */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                    <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      Wait at Stop:
                    </span>
                    <span className="font-mono font-semibold tabular-nums text-slate-900 dark:text-white">
                      {opt.busArrival.waitMinutes} mins
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                    <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                      <Bus className="w-3.5 h-3.5" />
                      Next Bus Line:
                    </span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                      Bus {opt.busArrival.serviceNumber}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                    <span className="text-slate-500 dark:text-slate-400">Bus Ride:</span>
                    <span className="font-mono tabular-nums text-slate-900 dark:text-white">
                      {opt.busJourney.rideMinutes} mins ({opt.busJourney.stopCount} stops)
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                    <span className="text-slate-500 dark:text-slate-400">Destination Walk:</span>
                    <span className="font-mono tabular-nums text-slate-900 dark:text-white">
                      {opt.walkToDestination.walkMinutes} mins ({opt.walkToDestination.distanceMeters}m)
                    </span>
                  </div>
                </div>
              </div>

              {/* Total Summary Footer */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase text-slate-400 tracking-wider font-semibold">
                    Total Journey
                  </div>
                  <div className="text-lg font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                    {opt.totalMinutes} <span className="text-xs font-normal text-slate-500 font-sans">mins</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase text-slate-400 tracking-wider font-semibold">
                    Arrive By
                  </div>
                  <div className="text-sm font-semibold font-mono tabular-nums text-slate-700 dark:text-slate-300">
                    {opt.arrivalClock}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
