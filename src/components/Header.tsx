import React from 'react';
import { Compass, Moon, Sun, Clock, Server } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  activeView: 'planner' | 'schematic' | 'saved';
  setActiveView: (view: 'planner' | 'schematic' | 'saved') => void;
  currentTimeString: string;
  onOpenApiInspector: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isDark,
  onToggleTheme,
  activeView,
  setActiveView,
  currentTimeString,
  onOpenApiInspector,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActiveView('planner');
          }}
          className="flex items-center gap-2.5 text-slate-900 dark:text-white font-semibold tracking-tight text-lg whitespace-nowrap shrink-0 group"
        >
          <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shadow-xs">
            <Compass className="w-4 h-4 transition-transform group-hover:rotate-45" />
          </div>
          <span className="font-bold tracking-tight">Transịt</span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden sm:flex items-center gap-6 text-xs font-medium text-slate-600 dark:text-slate-300">
          <button
            onClick={() => setActiveView('planner')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
              activeView === 'planner'
                ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white font-semibold'
                : 'border-transparent hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Route Comparison
          </button>
          <button
            onClick={() => setActiveView('schematic')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
              activeView === 'schematic'
                ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white font-semibold'
                : 'border-transparent hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Schematic Map
          </button>
          <button
            onClick={() => setActiveView('saved')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
              activeView === 'saved'
                ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white font-semibold'
                : 'border-transparent hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Saved Hubs
          </button>
        </nav>

        {/* Zone 3: Primary Action & Utilities */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums mr-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{currentTimeString}</span>
          </div>

          <button
            onClick={onOpenApiInspector}
            title="Inspect Live OneMap Transit Endpoints"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap"
          >
            <Server className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden sm:inline">API Endpoints</span>
          </button>

          <button
            onClick={onToggleTheme}
            aria-label="Toggle visual theme"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
