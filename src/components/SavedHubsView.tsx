import React from 'react';
import { MapPin, Navigation, ArrowRight, Building2, Trees, ShoppingBag, Landmark } from 'lucide-react';
import { KNOWN_POSTAL_LOCATIONS } from '../data/mockRoutes';
import { PostalLocation } from '../types/transit';

interface SavedHubsViewProps {
  onSelectHubAsOrigin: (code: string) => void;
  onSelectHubAsDestination: (code: string) => void;
}

export const SavedHubsView: React.FC<SavedHubsViewProps> = ({
  onSelectHubAsOrigin,
  onSelectHubAsDestination,
}) => {
  const hubs = Object.values(KNOWN_POSTAL_LOCATIONS);

  const getIcon = (name: string) => {
    if (name.includes('Orchard') || name.includes('Mall') || name.includes('Somerset')) {
      return <ShoppingBag className="w-4 h-4 text-emerald-600" />;
    }
    if (name.includes('Botanic') || name.includes('Gardens')) {
      return <Trees className="w-4 h-4 text-emerald-600" />;
    }
    if (name.includes('Chinatown') || name.includes('Marina')) {
      return <Landmark className="w-4 h-4 text-emerald-600" />;
    }
    return <Building2 className="w-4 h-4 text-emerald-600" />;
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs transition-colors">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
          Common Transit Hubs & Destinations
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Select any postal code landmark below to quickly set as your start or destination point
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {hubs.map((hub) => (
          <div
            key={hub.postalCode}
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 flex flex-col justify-between transition-all"
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center mb-3">
                {getIcon(hub.name)}
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                {hub.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                {hub.area}
              </p>
              <div className="mt-2 inline-block font-mono text-xs text-slate-600 dark:text-slate-300 font-semibold bg-slate-200/60 dark:bg-slate-700/60 px-2 py-0.5 rounded">
                Postal {hub.postalCode}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center gap-2">
              <button
                type="button"
                onClick={() => onSelectHubAsOrigin(hub.postalCode)}
                className="flex-1 py-1.5 px-2 text-[11px] font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-slate-300 transition-colors"
              >
                Set as Start
              </button>
              <button
                type="button"
                onClick={() => onSelectHubAsDestination(hub.postalCode)}
                className="flex-1 py-1.5 px-2 text-[11px] font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-slate-300 transition-colors"
              >
                Set as Dest
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
