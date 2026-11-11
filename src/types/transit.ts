export interface PostalLocation {
  postalCode: string;
  name: string;
  area: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  coordinates?: { x: number; y: number }; // For schematic mapping
  isLive?: boolean;
}

export type BusOccupancy = 'Seats Available' | 'Standing Room' | 'Crowded';

export interface IntermediateStop {
  id: string;
  name: string;
  sequence: number;
  roadName: string;
}

export interface BusStopOption {
  id: string;
  code: string;
  name: string;
  roadName: string;
  directionHint: string;
  distanceMeters: number;
  walkMinutes: number;
  walkSteps: number;
  shelteredRatio: number; // e.g. 0.85 = 85% sheltered
  walkingInstruction: string;
}

export interface BusArrivalInfo {
  serviceNumber: string;
  operator: string;
  themeColor: string;
  waitMinutes: number | null;
  nextArrivalClock: string; // e.g. "17:18" or "No timings available"
  subsequentArrivalMinutes: number | null;
  occupancy: BusOccupancy;
  isWheelchairAccessible: boolean;
  isDoubleDecker: boolean;
  noTimingsAvailable?: boolean;
  timingStatusMessage?: string;
}

export interface BusJourneyDetails {
  boardingStop: BusStopOption;
  alightingStop: {
    id: string;
    code: string;
    name: string;
    roadName: string;
  };
  rideMinutes: number;
  stopCount: number;
  distanceKm: number;
  fareEstimate: string;
  stopsList: IntermediateStop[];
}

export interface DestinationWalk {
  distanceMeters: number;
  walkMinutes: number;
  walkSteps: number;
  walkingInstruction: string;
}

export interface JourneyOption {
  id: string;
  label: 'Option A' | 'Option B' | 'Option C';
  badgeTitle: string; // e.g., "Fastest Overall", "Minimal Walking", "Bus Arriving Soon"
  badgeTone: 'emerald' | 'blue' | 'amber';
  
  // 1. Walking to the bus stop
  walkToStop: BusStopOption;
  
  // 2. Waiting time & 3. Arrival time of next bus
  busArrival: BusArrivalInfo;
  
  // 4. Actual journey on bus
  busJourney: BusJourneyDetails;
  
  // 5. Walking to destination after getting off
  walkToDestination: DestinationWalk;
  
  // Summary aggregations
  totalMinutes: number;
  totalWalkingMinutes: number;
  totalWalkingDistanceMeters: number;
  departureClock: string;
  arrivalClock: string;
  co2SavingsKg: number;
  crowdLevel: BusOccupancy;
  highlightReason: string;
  noTimingsAvailable?: boolean;
}

export interface AlternateModeNotice {
  title: string; // e.g., "Consider other modes of transportation"
  reason: string;
  recommendedMode: 'walk' | 'mrt' | 'taxi' | 'cycle';
  recommendedModeLabel: string;
  estimatedDurationMinutes: number;
  directWalkDistanceMeters?: number;
}

export interface JourneyPlannerResult {
  options: JourneyOption[];
  hasEfficientBusRoute: boolean;
  alternateModeNotice?: AlternateModeNotice;
}

export type WalkingPace = 'relaxed' | 'normal' | 'brisk';
