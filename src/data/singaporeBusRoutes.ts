/**
 * Authentic Singapore Bus Routes Directory
 * Real Singapore bus trunk services with their actual corridors and operating towns.
 * Ensures only authentic buses running between corridors are proposed.
 */

export interface SingaporeBusRoute {
  serviceNo: string;
  operator: 'SBS Transit' | 'SMRT Buses' | 'Tower Transit' | 'Go-Ahead Singapore';
  corridors: string[];
  direction: string;
  typicalHeadwayMins: number;
}

export const REAL_SINGAPORE_BUS_ROUTES: SingaporeBusRoute[] = [
  {
    serviceNo: '2',
    operator: 'Go-Ahead Singapore',
    corridors: ['changi village', 'loyang', 'tampines east', 'bedok', 'geylang', 'bugis', 'clarke quay', 'chinatown', 'tanjong pagar'],
    direction: 'Changi Village <-> Kampong Bahru via Chinatown & Bugis',
    typicalHeadwayMins: 9,
  },
  {
    serviceNo: '7',
    operator: 'SBS Transit',
    corridors: ['bedok', 'eunos', 'geylang', 'bugis', 'dhoby ghaut', 'somerset', 'orchard', 'holland', 'buona vista', 'clementi'],
    direction: 'Bedok <-> Clementi via Orchard & Holland Village',
    typicalHeadwayMins: 7,
  },
  {
    serviceNo: '10',
    operator: 'SBS Transit',
    corridors: ['tampines', 'bedok', 'marine parade', 'tanjong pagar', 'shenton', 'raffles', 'harbourfront', 'pasir panjang', 'clementi'],
    direction: 'Tampines <-> Clementi via CBD & HarbourFront',
    typicalHeadwayMins: 7,
  },
  {
    serviceNo: '12',
    operator: 'Go-Ahead Singapore',
    corridors: ['pasir ris', 'tampines', 'bedok', 'kallang', 'bugis', 'clarke quay', 'chinatown', 'new bridge'],
    direction: 'Pasir Ris <-> New Bridge Road via Bugis & Chinatown',
    typicalHeadwayMins: 8,
  },
  {
    serviceNo: '14',
    operator: 'SBS Transit',
    corridors: ['bedok', 'eunos', 'mountbatten', 'city hall', 'dhoby ghaut', 'orchard', 'somerset', 'clementi'],
    direction: 'Bedok <-> Clementi via Orchard & Somerset',
    typicalHeadwayMins: 8,
  },
  {
    serviceNo: '24',
    operator: 'SBS Transit',
    corridors: ['ang mo kio', 'serangoon', 'paya lebar', 'bedok', 'changi airport'],
    direction: 'Ang Mo Kio <-> Changi Airport via Serangoon & Bedok',
    typicalHeadwayMins: 9,
  },
  {
    serviceNo: '28',
    operator: 'SBS Transit',
    corridors: ['tampines', 'bedok', 'geylang', 'toa payoh'],
    direction: 'Tampines <-> Toa Payoh via Bedok Reservoir',
    typicalHeadwayMins: 9,
  },
  {
    serviceNo: '29',
    operator: 'SBS Transit',
    corridors: ['tampines', 'tampines east', 'changi village'],
    direction: 'Tampines <-> Changi Village',
    typicalHeadwayMins: 10,
  },
  {
    serviceNo: '30',
    operator: 'SBS Transit',
    corridors: ['bedok', 'marine parade', 'tanjong pagar', 'harbourfront', 'pasir panjang', 'clementi', 'jurong east', 'boon lay'],
    direction: 'Bedok <-> Boon Lay via HarbourFront & West Coast',
    typicalHeadwayMins: 8,
  },
  {
    serviceNo: '33',
    operator: 'SBS Transit',
    corridors: ['bedok', 'marine parade', 'geylang', 'bugis', 'clarke quay', 'chinatown', 'tiong bahru', 'alexandra', 'buona vista', 'clementi'],
    direction: 'Bedok <-> Kent Ridge via Chinatown & Alexandra',
    typicalHeadwayMins: 9,
  },
  {
    serviceNo: '36',
    operator: 'Go-Ahead Singapore',
    corridors: ['changi airport', 'marine parade', 'suntec', 'city hall', 'dhoby ghaut', 'somerset', 'orchard'],
    direction: 'Changi Airport <-> Orchard Loop',
    typicalHeadwayMins: 8,
  },
  {
    serviceNo: '51',
    operator: 'SBS Transit',
    corridors: ['hougang', 'macpherson', 'geylang', 'bugis', 'clarke quay', 'chinatown', 'alexandra', 'queenstown', 'jurong east'],
    direction: 'Hougang <-> Jurong East via Chinatown & Bugis',
    typicalHeadwayMins: 9,
  },
  {
    serviceNo: '61',
    operator: 'SMRT Buses',
    corridors: ['bukit batok', 'clementi', 'harbourfront', 'chinatown', 'clarke quay', 'bugis', 'kallang', 'macpherson', 'eunos'],
    direction: 'Bukit Batok <-> Eunos via Chinatown & HarbourFront',
    typicalHeadwayMins: 10,
  },
  {
    serviceNo: '65',
    operator: 'SBS Transit',
    corridors: ['tampines', 'bedok', 'macpherson', 'little india', 'dhoby ghaut', 'somerset', 'orchard', 'harbourfront'],
    direction: 'Tampines <-> HarbourFront via Somerset & Orchard',
    typicalHeadwayMins: 7,
  },
  {
    serviceNo: '67',
    operator: 'SMRT Buses',
    corridors: ['tampines', 'bedok', 'geylang', 'kallang', 'little india', 'newton', 'bukit timah', 'bukit panjang', 'choa chu kang'],
    direction: 'Tampines <-> Choa Chu Kang via Little India & Bukit Timah',
    typicalHeadwayMins: 9,
  },
  {
    serviceNo: '70',
    operator: 'SBS Transit',
    corridors: ['yio chu kang', 'serangoon', 'paya lebar', 'guillemard', 'suntec', 'shenton', 'raffles'],
    direction: 'Yio Chu Kang <-> Shenton Way via Serangoon',
    typicalHeadwayMins: 8,
  },
  {
    serviceNo: '74',
    operator: 'SBS Transit',
    corridors: ['hougang', 'ang mo kio', 'marymount', 'bukit timah', 'dover', 'buona vista', 'clementi'],
    direction: 'Hougang <-> Buona Vista via Ang Mo Kio & Dover',
    typicalHeadwayMins: 8,
  },
  {
    serviceNo: '80',
    operator: 'SBS Transit',
    corridors: ['sengkang', 'hougang', 'geylang', 'bugis', 'chinatown', 'tanjong pagar', 'harbourfront'],
    direction: 'Sengkang <-> HarbourFront via Bugis & Chinatown',
    typicalHeadwayMins: 8,
  },
  {
    serviceNo: '97',
    operator: 'Tower Transit',
    corridors: ['jurong east', 'clementi', 'west coast', 'pasir panjang', 'harbourfront', 'shenton', 'marina bay'],
    direction: 'Jurong East <-> Marina Centre via Shenton Way',
    typicalHeadwayMins: 8,
  },
  {
    serviceNo: '106',
    operator: 'Tower Transit',
    corridors: ['bukit batok', 'clementi', 'holland', 'buona vista', 'orchard', 'somerset', 'dhoby ghaut', 'marina bay', 'suntec', 'shenton'],
    direction: 'Bukit Batok <-> Shenton Way via Orchard & Somerset',
    typicalHeadwayMins: 6,
  },
  {
    serviceNo: '133',
    operator: 'SBS Transit',
    corridors: ['ang mo kio', 'serangoon', 'boon keng', 'lavender', 'bugis', 'suntec', 'marina bay', 'shenton'],
    direction: 'Ang Mo Kio <-> Shenton Way via Bugis & Marina Bay',
    typicalHeadwayMins: 8,
  },
  {
    serviceNo: '143',
    operator: 'Tower Transit',
    corridors: ['toa payoh', 'novena', 'orchard', 'somerset', 'chinatown', 'harbourfront', 'pasir panjang', 'west coast', 'jurong east'],
    direction: 'Toa Payoh <-> Jurong East via Orchard & Chinatown',
    typicalHeadwayMins: 7,
  },
  {
    serviceNo: '145',
    operator: 'SBS Transit',
    corridors: ['toa payoh', 'novena', 'balestier', 'bugis', 'clarke quay', 'chinatown', 'tanjong pagar', 'harbourfront', 'buona vista'],
    direction: 'Toa Payoh <-> Buona Vista via Chinatown & HarbourFront',
    typicalHeadwayMins: 8,
  },
  {
    serviceNo: '147',
    operator: 'SBS Transit',
    corridors: ['hougang', 'serangoon', 'potong pasir', 'clarke quay', 'chinatown', 'outram', 'bukit merah', 'commonwealth', 'clementi'],
    direction: 'Hougang <-> Clementi via Chinatown & Clarke Quay',
    typicalHeadwayMins: 6,
  },
  {
    serviceNo: '166',
    operator: 'SBS Transit',
    corridors: ['ang mo kio', 'thomson', 'novena', 'little india', 'clarke quay', 'chinatown', 'harbourfront', 'clementi'],
    direction: 'Ang Mo Kio <-> Clementi via Chinatown',
    typicalHeadwayMins: 8,
  },
  {
    serviceNo: '167',
    operator: 'Tower Transit',
    corridors: ['sembawang', 'yishun', 'thomson', 'novena', 'orchard', 'somerset', 'dhoby ghaut', 'city hall', 'shenton', 'raffles', 'bukit merah'],
    direction: 'Sembawang <-> Bukit Merah via Orchard & Shenton Way',
    typicalHeadwayMins: 10,
  },
  {
    serviceNo: '174',
    operator: 'SBS Transit',
    corridors: ['boon lay', 'jurong west', 'bukit timah', 'farrer', 'orchard', 'somerset', 'dhoby ghaut', 'clarke quay', 'chinatown', 'new bridge'],
    direction: 'Boon Lay <-> New Bridge Road via Orchard & Somerset',
    typicalHeadwayMins: 8,
  },
  {
    serviceNo: '176',
    operator: 'SMRT Buses',
    corridors: ['bukit panjang', 'bukit batok', 'jurong east', 'west coast', 'pasir panjang', 'telok blangah', 'bukit merah'],
    direction: 'Bukit Panjang <-> Bukit Merah via West Coast',
    typicalHeadwayMins: 8,
  },
  {
    serviceNo: '188',
    operator: 'SMRT Buses',
    corridors: ['choa chu kang', 'bukit batok', 'clementi', 'pasir panjang', 'harbourfront'],
    direction: 'Choa Chu Kang <-> HarbourFront via Clementi',
    typicalHeadwayMins: 8,
  },
  {
    serviceNo: '190',
    operator: 'SMRT Buses',
    corridors: ['choa chu kang', 'bukit panjang', 'stevens', 'orchard', 'somerset', 'dhoby ghaut', 'clarke quay', 'chinatown'],
    direction: 'Choa Chu Kang <-> Chinatown via Orchard & Somerset',
    typicalHeadwayMins: 5,
  },
  {
    serviceNo: '196',
    operator: 'SBS Transit',
    corridors: ['bedok', 'marine parade', 'shenton', 'raffles', 'tanjong pagar', 'buona vista', 'clementi'],
    direction: 'Bedok <-> Clementi via Shenton Way & Buona Vista',
    typicalHeadwayMins: 7,
  },
  {
    serviceNo: '197',
    operator: 'SBS Transit',
    corridors: ['bedok', 'marine parade', 'geylang', 'chinatown', 'outram', 'bukit merah', 'commonwealth', 'jurong east'],
    direction: 'Bedok <-> Jurong East via Chinatown',
    typicalHeadwayMins: 8,
  },
  {
    serviceNo: '198',
    operator: 'SBS Transit',
    corridors: ['boon lay', 'jurong west', 'jurong east', 'clementi', 'commonwealth', 'queenstown', 'bukit merah'],
    direction: 'Boon Lay <-> Bukit Merah via Clementi',
    typicalHeadwayMins: 7,
  },
  {
    serviceNo: '851',
    operator: 'SBS Transit',
    corridors: ['yishun', 'khatib', 'ang mo kio', 'thomson', 'little india', 'bugis', 'clarke quay', 'chinatown', 'bukit merah'],
    direction: 'Yishun <-> Bukit Merah via Bugis & Chinatown',
    typicalHeadwayMins: 7,
  },
  {
    serviceNo: '854',
    operator: 'Tower Transit',
    corridors: ['yishun', 'khatib', 'ang mo kio', 'serangoon', 'eunos', 'bedok'],
    direction: 'Yishun <-> Bedok via Ang Mo Kio & Eunos',
    typicalHeadwayMins: 8,
  },
  {
    serviceNo: '960',
    operator: 'SMRT Buses',
    corridors: ['woodlands', 'marsiling', 'bukit panjang', 'newton', 'little india', 'bugis', 'marina bay', 'city hall'],
    direction: 'Woodlands <-> Marina Centre via Bugis & Little India',
    typicalHeadwayMins: 7,
  },
  {
    serviceNo: '961',
    operator: 'SMRT Buses',
    corridors: ['woodlands', 'marsiling', 'bukit timah', 'farrer', 'bukit merah', 'chinatown', 'clarke quay', 'bugis', 'marina bay'],
    direction: 'Woodlands <-> Marina Centre via Bukit Timah & Chinatown',
    typicalHeadwayMins: 10,
  },
  {
    serviceNo: '972',
    operator: 'SMRT Buses',
    corridors: ['bukit panjang', 'stevens', 'orchard', 'somerset', 'dhoby ghaut'],
    direction: 'Bukit Panjang <-> Dhoby Ghaut via Orchard',
    typicalHeadwayMins: 6,
  },
  {
    serviceNo: '980',
    operator: 'Tower Transit',
    corridors: ['sembawang', 'yishun', 'springleaf', 'thomson', 'novena', 'bugis', 'city hall', 'geylang'],
    direction: 'Sembawang <-> Geylang Lor 1 via Bugis',
    typicalHeadwayMins: 9,
  },
];

/**
 * Normalizes an area name or road into transit corridor keywords
 */
export function extractCorridorKeywords(name: string, road: string = '', postal: string = ''): string[] {
  const cleanPostal = String(postal || '').replace(/\D/g, '').padStart(6, '0').slice(0, 6);
  const postalSector = cleanPostal.slice(0, 2);
  const text = `${name} ${road}`.toLowerCase();
  const found = new Set<string>();

  const corridorMap: Record<string, string[]> = {
    tampines: ['tampines', '52', 'simei'],
    bedok: ['bedok', 'chai chee', '46', '47', '48', '84'],
    'marine parade': ['marine parade', 'amber', 'katong', 'joo chiat', '42', '43', '44'],
    changi: ['changi', 'loyang', 'flora', '49', '50'],
    'changi airport': ['airport', 'ptb', '81'],
    'pasir ris': ['pasir ris', '51'],
    geylang: ['geylang', 'aljunied', 'guillemard', '38', '39'],
    eunos: ['eunos', 'paya lebar', '40', '41'],
    bugis: ['bugis', 'rochor', 'victoria', 'beach rd', '18', '19'],
    'little india': ['little india', 'farrer park', 'serangoon rd', '20', '21'],
    'city hall': ['city hall', 'high st', 'north bridge', '17'],
    raffles: ['raffles', 'battery', 'collyer', '04', '01'],
    shenton: ['shenton', 'cecil', 'robinson', 'uic', '06', '02'],
    'marina bay': ['marina', 'bayfront', 'suntec', '03'],
    'clarke quay': ['clarke quay', 'eu tong sen', 'river valley', 'central mall'],
    chinatown: ['chinatown', 'hong lim', 'south bridge', 'new bridge', 'cross st', '05', '08'],
    'tanjong pagar': ['tanjong pagar', 'anson', 'cantonment', '07'],
    orchard: ['orchard', 'lucky plaza', 'tangs', 'paterson', '22'],
    somerset: ['somerset', '313', 'killiney', 'penang rd', 'exeter', '23'],
    'dhoby ghaut': ['dhoby ghaut', 'plaza singapura', 'handy rd'],
    novena: ['novena', 'newton', 'moulmein', 'balestier', '29', '30'],
    'toa payoh': ['toa payoh', '31', '32'],
    serangoon: ['serangoon', 'nex', '55'],
    hougang: ['hougang', 'kovan', '53'],
    sengkang: ['sengkang', 'buangkok', '54'],
    punggol: ['punggol', '82'],
    'ang mo kio': ['ang mo kio', 'amk', '56', '57'],
    bishan: ['bishan', 'marymount'],
    yishun: ['yishun', 'khatib', '75'],
    sembawang: ['sembawang', 'canberra', '76'],
    woodlands: ['woodlands', 'marsiling', 'admiralty', '72', '73'],
    'bukit panjang': ['bukit panjang', 'petir', 'jelebu', '67'],
    'choa chu kang': ['choa chu kang', 'cck', '68'],
    'bukit batok': ['bukit batok', '65'],
    'jurong east': ['jurong east', 'gateway', 'westgate', 'jem', '60'],
    'jurong west': ['jurong west', 'boon lay', 'pioneer', '61', '64'],
    clementi: ['clementi', 'west coast', '12'],
    'buona vista': ['buona vista', 'one-north', 'star vista', '13'],
    queenstown: ['queenstown', 'commonwealth', '14'],
    'bukit merah': ['bukit merah', 'tiong bahru', 'alexandra', 'redhill', '10', '15', '16'],
    harbourfront: ['harbourfront', 'vivocity', 'telok blangah', 'sentosa', '09'],
    'pasir panjang': ['pasir panjang', 'kent ridge', '11'],
  };

  for (const [corridor, aliases] of Object.entries(corridorMap)) {
    const matched = aliases.some((a) => {
      if (/^\d{2}$/.test(a)) {
        return postalSector === a;
      }
      return text.includes(a);
    });
    if (matched) {
      found.add(corridor);
    }
  }

  return Array.from(found);
}


/**
 * Finds genuine direct Singapore bus routes connecting origin and destination corridors
 */
export function findAuthenticBuses(originCorridors: string[], destCorridors: string[]): SingaporeBusRoute[] {
  if (!originCorridors.length || !destCorridors.length) {
    return [];
  }

  const matchingRoutes: SingaporeBusRoute[] = [];
  const seenService = new Set<string>();

  for (const route of REAL_SINGAPORE_BUS_ROUTES) {
    const hasOrigin = originCorridors.some((oc) => route.corridors.includes(oc));
    const hasDest = destCorridors.some((dc) => route.corridors.includes(dc));

    if (hasOrigin && hasDest && !seenService.has(route.serviceNo)) {
      seenService.add(route.serviceNo);
      matchingRoutes.push(route);
    }
  }

  return matchingRoutes;
}
