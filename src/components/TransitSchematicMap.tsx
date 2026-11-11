import React from 'react';
import { Footprints, Bus, MapPin, Compass, Info } from 'lucide-react';
import { JourneyOption, PostalLocation } from '../types/transit';

interface TransitSchematicMapProps {
  origin: PostalLocation;
  destination: PostalLocation;
  options: JourneyOption[];
  selectedId: string;
  onSelectOption: (id: string) => void;
}

export const TransitSchematicMap: React.FC<TransitSchematicMapProps> = ({
  origin,
  destination,
  options,
  selectedId,
  onSelectOption,
}) => {
  const selectedOption = options.find((o) => o.id === selectedId) || options[0];

  // Fixed schematic canvas coordinates for clear diagrammatic layout
  // Origin is at left (x: 100, y: 220)
  // Destination is at right (x: 750, y: 220)
  // 3 Candidate Stops at (x: 240, y: 120), (x: 230, y: 220), (x: 250, y: 320)
  // Mid bus transit waypoints
  // Alighting stops at (x: 610, y: 140), (x: 620, y: 220), (x: 600, y: 300)

  const stopCoords = [
    {
      id: 'option-a',
      stopX: 240,
      stopY: 130,
      alightX: 610,
      alightY: 140,
      color: '#10B981', // Emerald
      labelOffset: { x: 0, y: -24 },
    },
    {
      id: 'option-b',
      stopX: 230,
      stopY: 220,
      alightX: 620,
      alightY: 220,
      color: '#2563EB', // Blue
      labelOffset: { x: 0, y: 24 },
    },
    {
      id: 'option-c',
      stopX: 250,
      stopY: 310,
      alightX: 600,
      alightY: 300,
      color: '#D97706', // Amber
      labelOffset: { x: 0, y: 24 },
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Compass className="w-4 h-4 text-slate-700 dark:text-slate-300" />
            <span>Schematic Transit Geometry</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Visualizing walking paths to candidate bus stops and transit trajectories
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-0.5 border-b-2 border-dashed border-slate-400" />
            <span>Walking path</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-1 rounded-full bg-emerald-500" />
            <span>Bus corridor</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full border border-slate-400 bg-white" />
            <span>Bus stop</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="w-full overflow-x-auto rounded-xl bg-slate-50/70 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 p-2">
        <svg
          viewBox="0 0 850 440"
          className="w-full min-w-[650px] max-h-[380px] select-none"
        >
          {/* Subtle grid background */}
          <defs>
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path
                d="M 30 0 L 0 0 0 30"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-slate-200/50 dark:text-slate-800/40"
              />
            </pattern>
          </defs>
          <rect width="850" height="440" fill="url(#grid)" />

          {/* Render Transit Options Paths */}
          {options.map((opt, i) => {
            const coords = stopCoords[i];
            const isSelected = opt.id === selectedId;
            const strokeColor = isSelected ? coords.color : '#94A3B8';
            const opacity = isSelected ? 1 : 0.35;
            const strokeWidth = isSelected ? 4 : 2;

            return (
              <g
                key={opt.id}
                className="cursor-pointer transition-opacity duration-300"
                onClick={() => onSelectOption(opt.id)}
              >
                {/* 1. Walking path from origin (100, 220) to Stop */}
                <path
                  d={`M 100 220 C 150 220, 180 ${coords.stopY}, ${coords.stopX} ${coords.stopY}`}
                  fill="none"
                  stroke={isSelected ? '#64748B' : '#CBD5E1'}
                  strokeWidth={isSelected ? 2.5 : 1.5}
                  strokeDasharray="4 4"
                />

                {/* Walk Tag along the path */}
                <g transform={`translate(${165}, ${(220 + coords.stopY) / 2})`}>
                  <rect
                    x="-24"
                    y="-9"
                    width="48"
                    height="18"
                    rx="9"
                    className="fill-white dark:fill-slate-800 stroke-slate-200 dark:stroke-slate-700"
                    strokeWidth="1"
                  />
                  <text
                    textAnchor="middle"
                    dy="3.5"
                    className="text-[9px] font-mono font-medium fill-slate-700 dark:fill-slate-300"
                  >
                    {opt.walkToStop.walkMinutes}m walk
                  </text>
                </g>

                {/* 2. Bus Route Path: from Stop to Alighting Stop */}
                <path
                  d={`M ${coords.stopX} ${coords.stopY} C ${(coords.stopX + coords.alightX) / 2} ${
                    coords.stopY
                  }, ${(coords.stopX + coords.alightX) / 2} ${coords.alightY}, ${coords.alightX} ${
                    coords.alightY
                  }`}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  opacity={opacity}
                />

                {/* Bus Line Badge on Path */}
                {isSelected && (
                  <g
                    transform={`translate(${(coords.stopX + coords.alightX) / 2}, ${
                      (coords.stopY + coords.alightY) / 2
                    })`}
                  >
                    <rect
                      x="-38"
                      y="-11"
                      width="76"
                      height="22"
                      rx="6"
                      fill={coords.color}
                      className="shadow-sm"
                    />
                    <text
                      textAnchor="middle"
                      dy="4"
                      className="text-[10px] font-mono font-bold fill-white tracking-wide"
                    >
                      BUS {opt.busArrival.serviceNumber} · {opt.busJourney.rideMinutes}m
                    </text>
                  </g>
                )}

                {/* 3. Walking path from Alighting Stop to Destination (750, 220) */}
                <path
                  d={`M ${coords.alightX} ${coords.alightY} C ${
                    (coords.alightX + 750) / 2
                  } ${coords.alightY}, ${(coords.alightX + 750) / 2} 220, 750 220`}
                  fill="none"
                  stroke={isSelected ? '#64748B' : '#CBD5E1'}
                  strokeWidth={isSelected ? 2.5 : 1.5}
                  strokeDasharray="4 4"
                />

                {/* Destination Walk Tag */}
                <g transform={`translate(${680}, ${(coords.alightY + 220) / 2})`}>
                  <rect
                    x="-24"
                    y="-9"
                    width="48"
                    height="18"
                    rx="9"
                    className="fill-white dark:fill-slate-800 stroke-slate-200 dark:stroke-slate-700"
                    strokeWidth="1"
                  />
                  <text
                    textAnchor="middle"
                    dy="3.5"
                    className="text-[9px] font-mono font-medium fill-slate-700 dark:fill-slate-300"
                  >
                    {opt.walkToDestination.walkMinutes}m walk
                  </text>
                </g>

                {/* Boarding Bus Stop Marker Node */}
                <g transform={`translate(${coords.stopX}, ${coords.stopY})`}>
                  <circle
                    r={isSelected ? 10 : 7}
                    fill={isSelected ? coords.color : '#FFFFFF'}
                    stroke={isSelected ? '#FFFFFF' : '#64748B'}
                    strokeWidth={isSelected ? 3 : 2}
                    className="transition-all"
                  />
                  <text
                    x={0}
                    y={coords.labelOffset.y}
                    textAnchor="middle"
                    className={`text-[10px] font-medium ${
                      isSelected
                        ? 'fill-slate-900 dark:fill-white font-bold'
                        : 'fill-slate-500 dark:fill-slate-400'
                    }`}
                  >
                    {opt.walkToStop.name}
                  </text>
                  <text
                    x={0}
                    y={coords.labelOffset.y > 0 ? coords.labelOffset.y + 12 : coords.labelOffset.y - 12}
                    textAnchor="middle"
                    className="text-[8px] font-mono fill-slate-400"
                  >
                    #{opt.walkToStop.code} · {opt.badgeTitle}
                  </text>
                </g>

                {/* Alighting Bus Stop Marker Node */}
                <g transform={`translate(${coords.alightX}, ${coords.alightY})`}>
                  <circle
                    r={isSelected ? 8 : 5}
                    fill={isSelected ? coords.color : '#FFFFFF'}
                    stroke={isSelected ? '#FFFFFF' : '#64748B'}
                    strokeWidth={isSelected ? 2.5 : 1.5}
                  />
                  <text
                    x={0}
                    y={coords.labelOffset.y}
                    textAnchor="middle"
                    className={`text-[9px] ${
                      isSelected
                        ? 'fill-slate-900 dark:fill-white font-semibold'
                        : 'fill-slate-500 dark:fill-slate-400'
                    }`}
                  >
                    {opt.busJourney.alightingStop.name}
                  </text>
                </g>
              </g>
            );
          })}

          {/* ORIGIN HUB NODE */}
          <g transform="translate(100, 220)">
            <circle r="18" className="fill-slate-900 dark:fill-white shadow-lg" />
            <circle r="8" className="fill-white dark:fill-slate-900" />
            <text
              x="0"
              y="-28"
              textAnchor="middle"
              className="text-xs font-bold fill-slate-900 dark:fill-white"
            >
              Start: {origin.postalCode}
            </text>
            <text
              x="0"
              y="-14"
              textAnchor="middle"
              className="text-[10px] fill-slate-500 dark:fill-slate-400 font-medium"
            >
              {origin.name}
            </text>
          </g>

          {/* DESTINATION HUB NODE */}
          <g transform="translate(750, 220)">
            <circle r="18" className="fill-red-500 dark:fill-red-400 shadow-lg" />
            <circle r="8" className="fill-white dark:fill-slate-900" />
            <text
              x="0"
              y="-28"
              textAnchor="middle"
              className="text-xs font-bold fill-slate-900 dark:fill-white"
            >
              Dest: {destination.postalCode}
            </text>
            <text
              x="0"
              y="-14"
              textAnchor="middle"
              className="text-[10px] fill-slate-500 dark:fill-slate-400 font-medium"
            >
              {destination.name}
            </text>
          </g>
        </svg>
      </div>

      {/* Decision Guidance Footer */}
      <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-slate-400" />
          <span>Click any bus stop node or option tab above to inspect route trajectory</span>
        </div>
        <div className="font-mono text-slate-700 dark:text-slate-300 font-medium">
          Currently focusing: <span className="font-bold">{selectedOption.label} ({selectedOption.walkToStop.name})</span>
        </div>
      </div>
    </div>
  );
};
