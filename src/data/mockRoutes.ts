import { JourneyOption, PostalLocation, WalkingPace } from '../types/transit';
import { formatSingaporeClock } from '../utils/timeFormat';

export const KNOWN_POSTAL_LOCATIONS: Record<string, PostalLocation> = {
  '048581': {
    postalCode: '048581',
    name: 'One Raffles Place',
    area: 'Central Business District',
    address: '1 Raffles Place, Singapore 048581',
    coordinates: { x: 38, y: 72 },
  },
  '238839': {
    postalCode: '238839',
    name: '313@Somerset (Orchard)',
    area: 'Orchard Shopping Belt',
    address: '313 Orchard Road, Singapore 238839',
    coordinates: { x: 42, y: 35 },
  },
  '018989': {
    postalCode: '018989',
    name: 'Marina Bay Sands',
    area: 'Downtown Core / Bayfront',
    address: '10 Bayfront Avenue, Singapore 018989',
    coordinates: { x: 65, y: 78 },
  },
  '089858': {
    postalCode: '089858',
    name: 'People\'s Park Complex',
    area: 'Chinatown / Outram',
    address: '1 Park Road, Singapore 089858',
    coordinates: { x: 30, y: 68 },
  },
  '188065': {
    postalCode: '188065',
    name: 'Bugis Junction',
    area: 'Bugis / Rochor Arts & Heritage',
    address: '200 Victoria Street, Singapore 188065',
    coordinates: { x: 55, y: 48 },
  },
  '247964': {
    postalCode: '247964',
    name: 'Singapore Botanic Gardens',
    area: 'Tanglin / Bukit Timah',
    address: '1 Cluny Road, Singapore 247964',
    coordinates: { x: 22, y: 25 },
  },
  '138683': {
    postalCode: '138683',
    name: 'Fusionopolis (One-North)',
    area: 'One-North R&D Quarter',
    address: '1 Fusionopolis Way, Singapore 138683',
    coordinates: { x: 15, y: 55 },
  },
  '469972': {
    postalCode: '469972',
    name: 'Bedok Mall',
    area: 'Bedok Town Centre',
    address: '311 New Upper Changi Road, Singapore 469972',
    coordinates: { x: 85, y: 45 },
  },
};

export const PRESET_ROUTES = [
  {
    title: 'CBD to Orchard Road',
    subtitle: 'Raffles Place → Somerset',
    origin: '048581',
    destination: '238839',
    tag: 'Popular Commute',
  },
  {
    title: 'Marina Bay to Chinatown',
    subtitle: 'Bayfront → Park Road',
    origin: '018989',
    destination: '089858',
    tag: 'Tourist Classic',
  },
  {
    title: 'Bugis to Botanic Gardens',
    subtitle: 'Victoria St → Cluny Rd',
    origin: '188065',
    destination: '247964',
    tag: 'Scenic & Leisure',
  },
  {
    title: 'Chinatown to One-North',
    subtitle: 'Outram → Fusionopolis',
    origin: '089858',
    destination: '138683',
    tag: 'Cross-Town Route',
  },
];

// Resolves or smartly generates readable name for any postal code
export function resolvePostalLocation(code: string): PostalLocation {
  const cleanCode = code.trim();
  if (KNOWN_POSTAL_LOCATIONS[cleanCode]) {
    return KNOWN_POSTAL_LOCATIONS[cleanCode];
  }
  
  // Format fallback cleanly
  const num = parseInt(cleanCode.replace(/\D/g, '') || '100000', 10);
  const districtNames = [
    'Downtown Hub', 'Tanjong Pagar Sector', 'Queenstown Corridor',
    'Tiong Bahru Enclave', 'River Valley Reach', 'Orchard Boulevard',
    'Newton Central', 'Novena Terrace', 'Toa Payoh Junction',
    'Kallang Waterfront', 'Geylang Gateway', 'Marine Parade Link'
  ];
  const area = districtNames[num % districtNames.length];
  
  return {
    postalCode: cleanCode,
    name: `Postal Area ${cleanCode}`,
    area: `${area}`,
    address: `District Zone ${cleanCode}`,
    coordinates: {
      x: 20 + ((num * 17) % 65),
      y: 20 + ((num * 29) % 65),
    },
  };
}

function formatClockTime(date: Date): string {
  return formatSingaporeClock(date);
}

function addMinutesToDate(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60000);
}

// Generate the 3 tailored options for comparison
export function generateThreeOptions(
  originPostal: string,
  destPostal: string,
  pace: WalkingPace = 'normal',
  baseDeparture: Date = new Date()
): {
  origin: PostalLocation;
  destination: PostalLocation;
  options: JourneyOption[];
} {
  const origin = resolvePostalLocation(originPostal);
  const destination = resolvePostalLocation(destPostal);

  // Pace multiplier
  const paceMultiplier = pace === 'brisk' ? 0.8 : pace === 'relaxed' ? 1.25 : 1.0;

  // Derive pseudo-random deterministic seed from postal codes so repeated searches feel stable
  const seedOrigin = parseInt(origin.postalCode.replace(/\D/g, '') || '101', 10);
  const seedDest = parseInt(destination.postalCode.replace(/\D/g, '') || '202', 10);
  const compositeSeed = (seedOrigin * 31 + seedDest * 17) % 1000;

  // -------------------------------------------------------------
  // OPTION A: "Fastest Door-to-Door"
  // Balanced walk to a high-speed express trunk bus stop
  // -------------------------------------------------------------
  const walkA_base = 4 + (compositeSeed % 3); // 4-6 min
  const walkA_mins = Math.max(2, Math.round(walkA_base * paceMultiplier));
  const walkA_meters = Math.round(walkA_mins * 75);
  const waitA_mins = 2 + ((compositeSeed * 3) % 4); // 2-5 min
  const busA_num = ['147', '190', '65', '174', '166', '857'][compositeSeed % 6];
  const rideA_mins = 14 + (compositeSeed % 6); // 14-19 min
  const stopsA_count = 6 + (compositeSeed % 4);
  const walkDestA_base = 3 + ((compositeSeed * 2) % 3); // 3-5 min
  const walkDestA_mins = Math.max(2, Math.round(walkDestA_base * paceMultiplier));
  const walkDestA_meters = Math.round(walkDestA_mins * 75);

  const totalA_mins = walkA_mins + waitA_mins + rideA_mins + walkDestA_mins;
  const depA = new Date(baseDeparture);
  const busArriveA = addMinutesToDate(depA, walkA_mins + waitA_mins);
  const finalArriveA = addMinutesToDate(depA, totalA_mins);

  const intermediateStopsA = [
    { id: 'st-1', name: 'Starting Point Arcade', sequence: 1, roadName: 'Robinson Road' },
    { id: 'st-2', name: 'Opp Hong Lim Cplx', sequence: 2, roadName: 'South Bridge Rd' },
    { id: 'st-3', name: 'Clarke Quay Stn Exit E', sequence: 3, roadName: 'Eu Tong Sen St' },
    { id: 'st-4', name: 'Fort Canning Stn', sequence: 4, roadName: 'River Valley Rd' },
    { id: 'st-5', name: 'Dhoby Ghaut Stn', sequence: 5, roadName: 'Orchard Rd' },
    { id: 'st-6', name: 'Winsland House', sequence: 6, roadName: 'Penang Rd' },
    { id: 'st-7', name: 'Midpoint Orchard', sequence: 7, roadName: 'Orchard Rd' },
  ].slice(0, stopsA_count);

  const optionA: JourneyOption = {
    id: 'option-a',
    label: 'Option A',
    badgeTitle: 'Fastest Door-to-Door',
    badgeTone: 'emerald',
    highlightReason: 'Shortest total travel duration with express trunk bus',
    walkToStop: {
      id: 'bs-03019',
      code: '03019',
      name: 'Opp Hong Lim Complex',
      roadName: 'South Bridge Road',
      directionHint: 'Northbound towards Central',
      distanceMeters: walkA_meters,
      walkMinutes: walkA_mins,
      walkSteps: Math.round(walkA_meters * 1.35),
      shelteredRatio: 0.85,
      walkingInstruction: 'Head north along sheltered pedestrian concourse, cross light at Cross St',
    },
    busArrival: {
      serviceNumber: busA_num,
      operator: 'SBS Transit',
      themeColor: '#10B981', // Emerald
      waitMinutes: waitA_mins,
      nextArrivalClock: formatClockTime(busArriveA),
      subsequentArrivalMinutes: waitA_mins + 7,
      occupancy: 'Seats Available',
      isWheelchairAccessible: true,
      isDoubleDecker: true,
    },
    busJourney: {
      boardingStop: {
        id: 'bs-03019',
        code: '03019',
        name: 'Opp Hong Lim Complex',
        roadName: 'South Bridge Road',
        directionHint: 'Towards destination corridor',
        distanceMeters: walkA_meters,
        walkMinutes: walkA_mins,
        walkSteps: Math.round(walkA_meters * 1.35),
        shelteredRatio: 0.85,
        walkingInstruction: '',
      },
      alightingStop: {
        id: 'bs-08138',
        code: '08138',
        name: 'Midpoint Orchard / Somerset',
        roadName: 'Orchard Road',
      },
      rideMinutes: rideA_mins,
      stopCount: stopsA_count,
      distanceKm: +(4.2 + (compositeSeed % 2)).toFixed(1),
      fareEstimate: '$1.48',
      stopsList: intermediateStopsA,
    },
    walkToDestination: {
      distanceMeters: walkDestA_meters,
      walkMinutes: walkDestA_mins,
      walkSteps: Math.round(walkDestA_meters * 1.3),
      walkingInstruction: 'Exit bus at front door, follow covered linkway directly to destination entrance',
    },
    totalMinutes: totalA_mins,
    totalWalkingMinutes: walkA_mins + walkDestA_mins,
    totalWalkingDistanceMeters: walkA_meters + walkDestA_meters,
    departureClock: formatClockTime(depA),
    arrivalClock: formatClockTime(finalArriveA),
    co2SavingsKg: 1.1,
    crowdLevel: 'Seats Available',
  };

  // -------------------------------------------------------------
  // OPTION B: "Shortest Walk"
  // Nearest immediate bus stop (only 1-2 mins walk). Great for luggage, elderly, or rain!
  // -------------------------------------------------------------
  const walkB_base = 1 + (compositeSeed % 2); // 1-2 min
  const walkB_mins = Math.max(1, Math.round(walkB_base * paceMultiplier));
  const walkB_meters = Math.round(walkB_mins * 68);
  const waitB_mins = 4 + (compositeSeed % 4); // 4-7 min wait
  const busB_num = ['190', '167', '700A', '124', '143', '960'][(compositeSeed + 2) % 6];
  const rideB_mins = 18 + (compositeSeed % 5); // 18-22 min
  const stopsB_count = 8 + (compositeSeed % 3);
  const walkDestB_base = 3 + (compositeSeed % 2); // 3-4 min
  const walkDestB_mins = Math.max(2, Math.round(walkDestB_base * paceMultiplier));
  const walkDestB_meters = Math.round(walkDestB_mins * 72);

  const totalB_mins = walkB_mins + waitB_mins + rideB_mins + walkDestB_mins;
  const depB = new Date(baseDeparture);
  const busArriveB = addMinutesToDate(depB, walkB_mins + waitB_mins);
  const finalArriveB = addMinutesToDate(depB, totalB_mins);

  const intermediateStopsB = [
    { id: 'st-b1', name: 'Prudential Tower', sequence: 1, roadName: 'Cecil Street' },
    { id: 'st-b2', name: 'OCBC Centre', sequence: 2, roadName: 'Chulia St' },
    { id: 'st-b3', name: 'Boat Quay Promenade', sequence: 3, roadName: 'North Canal Rd' },
    { id: 'st-b4', name: 'Clarke Quay Central', sequence: 4, roadName: 'Eu Tong Sen St' },
    { id: 'st-b5', name: 'Old Hill Street Police Stn', sequence: 5, roadName: 'Hill St' },
    { id: 'st-b6', name: 'SMU Concourse', sequence: 6, roadName: 'Bras Basah Rd' },
    { id: 'st-b7', name: 'Hotel Rendezvous', sequence: 7, roadName: 'Bras Basah Rd' },
    { id: 'st-b8', name: 'Orchard Plaza', sequence: 8, roadName: 'Orchard Rd' },
  ].slice(0, stopsB_count);

  const optionB: JourneyOption = {
    id: 'option-b',
    label: 'Option B',
    badgeTitle: 'Shortest Walk',
    badgeTone: 'blue',
    highlightReason: 'Nearest boarding bus stop just steps away (only ~110m walk)',
    walkToStop: {
      id: 'bs-03021',
      code: '03021',
      name: 'Prudential Tower Gate',
      roadName: 'Cecil Street',
      directionHint: 'Direct street frontage, 90m away',
      distanceMeters: walkB_meters,
      walkMinutes: walkB_mins,
      walkSteps: Math.round(walkB_meters * 1.35),
      shelteredRatio: 1.0, // 100% covered arcade
      walkingInstruction: 'Step right out of the building lobby onto covered footpath, stop is directly outside',
    },
    busArrival: {
      serviceNumber: busB_num,
      operator: 'SMRT Buses',
      themeColor: '#2563EB', // Blue
      waitMinutes: waitB_mins,
      nextArrivalClock: formatClockTime(busArriveB),
      subsequentArrivalMinutes: waitB_mins + 9,
      occupancy: 'Standing Room',
      isWheelchairAccessible: true,
      isDoubleDecker: false,
    },
    busJourney: {
      boardingStop: {
        id: 'bs-03021',
        code: '03021',
        name: 'Prudential Tower Gate',
        roadName: 'Cecil Street',
        directionHint: 'Outbound',
        distanceMeters: walkB_meters,
        walkMinutes: walkB_mins,
        walkSteps: Math.round(walkB_meters * 1.35),
        shelteredRatio: 1.0,
        walkingInstruction: '',
      },
      alightingStop: {
        id: 'bs-09048',
        code: '09048',
        name: 'Orchard Plaza / Somerset',
        roadName: 'Orchard Road',
      },
      rideMinutes: rideB_mins,
      stopCount: stopsB_count,
      distanceKm: +(4.8 + (compositeSeed % 2)).toFixed(1),
      fareEstimate: '$1.52',
      stopsList: intermediateStopsB,
    },
    walkToDestination: {
      distanceMeters: walkDestB_meters,
      walkMinutes: walkDestB_mins,
      walkSteps: Math.round(walkDestB_meters * 1.3),
      walkingInstruction: 'Cross pedestrian crossing with ramp into destination building',
    },
    totalMinutes: totalB_mins,
    totalWalkingMinutes: walkB_mins + walkDestB_mins,
    totalWalkingDistanceMeters: walkB_meters + walkDestB_meters,
    departureClock: formatClockTime(depB),
    arrivalClock: formatClockTime(finalArriveB),
    co2SavingsKg: 1.0,
    crowdLevel: 'Standing Room',
  };

  // -------------------------------------------------------------
  // OPTION C: "Next Bus Coming Now / Alternative Stop"
  // A slightly brisk walk to a stop where bus arrives immediately!
  // -------------------------------------------------------------
  const walkC_base = 5 + (compositeSeed % 2); // 5-6 min walk
  const walkC_mins = Math.max(3, Math.round(walkC_base * paceMultiplier));
  const walkC_meters = Math.round(walkC_mins * 78);
  const waitC_mins = 1; // Arriving right as you walk up!
  const busC_num = ['106', '111', '7', '175', '851', '970'][(compositeSeed + 4) % 6];
  const rideC_mins = 15 + ((compositeSeed * 2) % 4); // 15-18 min
  const stopsC_count = 7;
  const walkDestC_base = 2 + (compositeSeed % 2); // 2-3 min walk
  const walkDestC_mins = Math.max(2, Math.round(walkDestC_base * paceMultiplier));
  const walkDestC_meters = Math.round(walkDestC_mins * 70);

  const totalC_mins = walkC_mins + waitC_mins + rideC_mins + walkDestC_mins;
  const depC = new Date(baseDeparture);
  const busArriveC = addMinutesToDate(depC, walkC_mins + waitC_mins);
  const finalArriveC = addMinutesToDate(depC, totalC_mins);

  const intermediateStopsC = [
    { id: 'st-c1', name: 'Clarke Quay Stn Exit E', sequence: 1, roadName: 'Eu Tong Sen St' },
    { id: 'st-c2', name: 'Central Mall Hub', sequence: 2, roadName: 'Havelock Rd' },
    { id: 'st-c3', name: 'Apollo Centre', sequence: 3, roadName: 'New Bridge Rd' },
    { id: 'st-c4', name: 'UE Square Riverfront', sequence: 4, roadName: 'Clemenceau Ave' },
    { id: 'st-c5', name: 'Tank Road Mandir', sequence: 5, roadName: 'Tank Rd' },
    { id: 'st-c6', name: 'National Youth Council', sequence: 6, roadName: 'Grange Rd' },
    { id: 'st-c7', name: 'Somerset Station Gate', sequence: 7, roadName: 'Somerset Rd' },
  ].slice(0, stopsC_count);

  const optionC: JourneyOption = {
    id: 'option-c',
    label: 'Option C',
    badgeTitle: 'Next Bus Arriving Soon',
    badgeTone: 'amber',
    highlightReason: 'Bus arrives within 1 min of reaching the stop; zero platform idle time',
    walkToStop: {
      id: 'bs-04189',
      code: '04189',
      name: 'Clarke Quay Stn Exit E',
      roadName: 'Eu Tong Sen Street',
      directionHint: 'West corridor transit hub',
      distanceMeters: walkC_meters,
      walkMinutes: walkC_mins,
      walkSteps: Math.round(walkC_meters * 1.35),
      shelteredRatio: 0.7,
      walkingInstruction: 'Take the underpass to Exit E, escalator up directly beside the bus bay',
    },
    busArrival: {
      serviceNumber: busC_num,
      operator: 'Tower Transit',
      themeColor: '#D97706', // Amber
      waitMinutes: waitC_mins,
      nextArrivalClock: formatClockTime(busArriveC),
      subsequentArrivalMinutes: waitC_mins + 8,
      occupancy: 'Seats Available',
      isWheelchairAccessible: true,
      isDoubleDecker: true,
    },
    busJourney: {
      boardingStop: {
        id: 'bs-04189',
        code: '04189',
        name: 'Clarke Quay Stn Exit E',
        roadName: 'Eu Tong Sen Street',
        directionHint: 'Northbound',
        distanceMeters: walkC_meters,
        walkMinutes: walkC_mins,
        walkSteps: Math.round(walkC_meters * 1.35),
        shelteredRatio: 0.7,
        walkingInstruction: '',
      },
      alightingStop: {
        id: 'bs-08121',
        code: '08121',
        name: 'Somerset Station Concourse',
        roadName: 'Somerset Road',
      },
      rideMinutes: rideC_mins,
      stopCount: stopsC_count,
      distanceKm: +(4.5 + (compositeSeed % 2)).toFixed(1),
      fareEstimate: '$1.48',
      stopsList: intermediateStopsC,
    },
    walkToDestination: {
      distanceMeters: walkDestC_meters,
      walkMinutes: walkDestC_mins,
      walkSteps: Math.round(walkDestC_meters * 1.3),
      walkingInstruction: 'Direct sidewalk connection into destination atrium',
    },
    totalMinutes: totalC_mins,
    totalWalkingMinutes: walkC_mins + walkDestC_mins,
    totalWalkingDistanceMeters: walkC_meters + walkDestC_meters,
    departureClock: formatClockTime(depC),
    arrivalClock: formatClockTime(finalArriveC),
    co2SavingsKg: 1.2,
    crowdLevel: 'Seats Available',
  };

  return {
    origin,
    destination,
    options: [optionA, optionB, optionC],
  };
}
