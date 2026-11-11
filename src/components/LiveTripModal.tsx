import React, { useState, useEffect } from 'react';
import {
  X,
  Footprints,
  Clock,
  Bus,
  MapPin,
  ChevronRight,
  Volume2,
  CheckCircle2,
  Play,
  RotateCcw,
} from 'lucide-react';
import { JourneyOption } from '../types/transit';

interface LiveTripModalProps {
  option: JourneyOption;
  onClose: () => void;
}

export const LiveTripModal: React.FC<LiveTripModalProps> = ({ option, onClose }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(option.walkToStop.walkMinutes * 60);
  const [isPaused, setIsPaused] = useState(false);

  const steps = [
    {
      title: 'Walk to Bus Stop',
      subtitle: `${option.walkToStop.name} (#${option.walkToStop.code})`,
      detail: option.walkToStop.walkingInstruction,
      durationMins: option.walkToStop.walkMinutes,
      icon: Footprints,
      color: 'text-slate-900 dark:text-white',
      bg: 'bg-slate-100 dark:bg-slate-800',
    },
    {
      title: `Wait for Bus ${option.busArrival.serviceNumber}`,
      subtitle: `Boarding at ${option.walkToStop.name}`,
      detail: `Next bus expected at ${option.busArrival.nextArrivalClock}. ${option.busArrival.occupancy}.`,
      durationMins: option.busArrival.waitMinutes,
      icon: Clock,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-100 dark:bg-amber-950/40',
    },
    {
      title: `Ride Bus ${option.busArrival.serviceNumber}`,
      subtitle: `${option.busJourney.stopCount} stops to ${option.busJourney.alightingStop.name}`,
      detail: `Prepare to alight at ${option.busJourney.alightingStop.name} (#${option.busJourney.alightingStop.code}). Fare ~${option.busJourney.fareEstimate}.`,
      durationMins: option.busJourney.rideMinutes,
      icon: Bus,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-100 dark:bg-emerald-950/40',
    },
    {
      title: 'Walk to Final Destination',
      subtitle: `Alight at ${option.busJourney.alightingStop.name}`,
      detail: option.walkToDestination.walkingInstruction,
      durationMins: option.walkToDestination.walkMinutes,
      icon: MapPin,
      color: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-100 dark:bg-red-950/40',
    },
  ];

  const currentStep = steps[currentStepIndex];

  // Live timer tick
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex((curr) => curr + 1);
            return steps[currentStepIndex + 1].durationMins * 60;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [currentStepIndex, isPaused, steps]);

  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      setSecondsLeft(steps[currentStepIndex + 1].durationMins * 60);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      setSecondsLeft(steps[currentStepIndex - 1].durationMins * 60);
    }
  };

  const formatTimer = (totalSecs: number) => {
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Live Trip Navigation · {option.label}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close navigation"
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Progression Bar */}
        <div className="px-6 pt-4 flex gap-1.5">
          {steps.map((st, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                i < currentStepIndex
                  ? 'bg-slate-900 dark:bg-white'
                  : i === currentStepIndex
                  ? 'bg-emerald-500'
                  : 'bg-slate-100 dark:bg-slate-800'
              }`}
            />
          ))}
        </div>

        {/* Active Stage Card */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500">
              Stage {currentStepIndex + 1} of {steps.length}
            </span>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-900 dark:text-white tabular-nums bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{formatTimer(secondsLeft)}</span>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-2xl ${currentStep.bg} flex items-center justify-center shrink-0`}>
              <currentStep.icon className={`w-6 h-6 ${currentStep.color}`} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                {currentStep.title}
              </h4>
              <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mt-0.5">
                {currentStep.subtitle}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                {currentStep.detail}
              </p>
            </div>
          </div>

          {/* Quick Simulation Stepper */}
          <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
            <button
              onClick={handlePrevStep}
              disabled={currentStepIndex === 0}
              className="px-3 py-2 text-xs font-medium text-slate-500 disabled:opacity-30 hover:text-slate-900 dark:hover:text-white"
            >
              Previous Stage
            </button>

            <button
              onClick={handleNextStep}
              className="px-5 py-2.5 text-xs font-medium bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-all flex items-center gap-1.5"
            >
              <span>{currentStepIndex === steps.length - 1 ? 'Finish Trip' : 'Next Stage'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
