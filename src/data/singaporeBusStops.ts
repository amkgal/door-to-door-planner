export interface BusStopEntity {
  code: string;
  name: string;
  road: string;
  lat: number;
  lng: number;
}

export const SINGAPORE_BUS_STOPS: BusStopEntity[] = [
  // --- Central & CBD ---
  { code: '03059', name: 'One Raffles Quay', road: 'Raffles Quay', lat: 1.2818, lng: 103.8523 },
  { code: '03021', name: 'Prudential Tower', road: 'Cecil St', lat: 1.2829, lng: 103.8499 },
  { code: '03019', name: 'Opp Hong Lim Complex', road: 'South Bridge Rd', lat: 1.2855, lng: 103.8475 },
  { code: '03079', name: 'Fullerton Sq', road: 'Collyer Quay', lat: 1.2863, lng: 103.8530 },
  { code: '03111', name: 'UIC Bldg', road: 'Shenton Way', lat: 1.2785, lng: 103.8495 },
  { code: '03129', name: 'Opp AXA Tower', road: 'Shenton Way', lat: 1.2758, lng: 103.8472 },
  { code: '03391', name: 'The Sail', road: 'Marina Blvd', lat: 1.2804, lng: 103.8550 },
  { code: '03509', name: 'Marina Bay Sands MICE', road: 'Bayfront Ave', lat: 1.2831, lng: 103.8587 },
  { code: '03511', name: 'Marina Bay Sands Theatre', road: 'Bayfront Ave', lat: 1.2845, lng: 103.8596 },
  { code: '02051', name: 'The Esplanade', road: 'Raffles Ave', lat: 1.2895, lng: 103.8590 },
  { code: '02061', name: 'Marina Centre Ter', road: 'Raffles Ave', lat: 1.2900, lng: 103.8564 },
  { code: '02089', name: 'Pan Pacific Hotel', road: 'Raffles Blvd', lat: 1.2915, lng: 103.8592 },

  // --- Chinatown, Outram, Tanjong Pagar & Clarke Quay ---
  { code: '04189', name: 'Clarke Quay Stn Exit E', road: 'Eu Tong Sen St', lat: 1.2882, lng: 103.8465 },
  { code: '04222', name: 'Chinatown Stn Exit C', road: 'New Bridge Rd', lat: 1.2848, lng: 103.8439 },
  { code: '04239', name: 'People\'s Pk Ctr', road: 'Eu Tong Sen St', lat: 1.2863, lng: 103.8447 },
  { code: '05013', name: 'Outram Pk Stn Exit 7', road: 'Outram Rd', lat: 1.2805, lng: 103.8398 },
  { code: '05419', name: 'Tanjong Pagar Plaza', road: 'Tanjong Pagar Rd', lat: 1.2764, lng: 103.8431 },
  { code: '05429', name: 'Opp Tanjong Pagar Plaza', road: 'Tanjong Pagar Rd', lat: 1.2768, lng: 103.8437 },

  // --- Orchard, Somerset, Dhoby Ghaut & Newton ---
  { code: '08138', name: 'Somerset Stn', road: 'Somerset Rd', lat: 1.3005, lng: 103.8378 },
  { code: '09048', name: 'Opp Mandarin Orchard', road: 'Orchard Rd', lat: 1.3018, lng: 103.8361 },
  { code: '08057', name: 'Dhoby Ghaut Stn', road: 'Orchard Rd', lat: 1.2991, lng: 103.8458 },
  { code: '08041', name: 'Concorde Hotel S\'pore', road: 'Orchard Rd', lat: 1.2981, lng: 103.8478 },
  { code: '09022', name: 'Orchard Stn / Tangs', road: 'Orchard Turn', lat: 1.3039, lng: 103.8332 },
  { code: '09023', name: 'Orchard Stn / Lucky Plaza', road: 'Orchard Rd', lat: 1.3044, lng: 103.8341 },
  { code: '09037', name: 'Bef Orchard Stn Exit B', road: 'Orchard Blvd', lat: 1.3032, lng: 103.8315 },
  { code: '40011', name: 'Newton FC', road: 'Bt Timah Rd', lat: 1.3061, lng: 103.8491 },
  { code: '40021', name: 'Newton Stn Exit B', road: 'Scotts Rd', lat: 1.3130, lng: 103.8380 },

  // --- Bugis, City Hall & Bras Basah ---
  { code: '01012', name: 'Hotel Grand Pacific', road: 'Victoria St', lat: 1.2968, lng: 103.8525 },
  { code: '01112', name: 'Bugis Stn Exit A', road: 'Victoria St', lat: 1.3002, lng: 103.8562 },
  { code: '01119', name: 'Bugis Stn Exit D', road: 'Victoria St', lat: 1.2995, lng: 103.8558 },
  { code: '01029', name: 'St. Joseph\'s Church', road: 'Victoria St', lat: 1.2982, lng: 103.8540 },
  { code: '04111', name: 'Opp The Treasury', road: 'North Bridge Rd', lat: 1.2912, lng: 103.8505 },
  { code: '04167', name: 'City Hall Stn Exit B', road: 'North Bridge Rd', lat: 1.2928, lng: 103.8519 },

  // --- East (Tampines, Bedok, Pasir Ris, Simei, Changi) ---
  { code: '75009', name: 'Tampines Stn/Int', road: 'Tampines Ctrl 1', lat: 1.3541, lng: 103.9434 },
  { code: '76191', name: 'Opp Century Sq', road: 'Tampines Ave 4', lat: 1.3532, lng: 103.9428 },
  { code: '76141', name: 'Opp Tampines Stn', road: 'Tampines Ave 4', lat: 1.3528, lng: 103.9452 },
  { code: '76199', name: 'Tampines Stn Exit D', road: 'Tampines Ave 4', lat: 1.3546, lng: 103.9421 },
  { code: '76551', name: 'Our Tampines Hub', road: 'Tampines Ave 4', lat: 1.3530, lng: 103.9405 },
  { code: '84009', name: 'Bedok Int', road: 'Bedok North Dr', lat: 1.3242, lng: 103.9298 },
  { code: '84039', name: 'Bedok Stn Exit A', road: 'New Upper Changi Rd', lat: 1.3235, lng: 103.9304 },
  { code: '84031', name: 'Bedok Stn Exit B', road: 'New Upper Changi Rd', lat: 1.3238, lng: 103.9292 },
  { code: '77009', name: 'Pasir Ris Int', road: 'Pasir Ris Central', lat: 1.3725, lng: 103.9492 },
  { code: '77171', name: 'Pasir Ris Stn', road: 'Pasir Ris Dr 3', lat: 1.3732, lng: 103.9485 },
  { code: '96011', name: 'Simei Stn', road: 'Simei St 3', lat: 1.3435, lng: 103.9535 },
  { code: '95009', name: 'Changi Airport PTB2', road: 'PTB2 Basement', lat: 1.3562, lng: 103.9885 },
  { code: '95129', name: 'Changi Airport PTB1', road: 'PTB1 Basement', lat: 1.3602, lng: 103.9898 },
  { code: '80019', name: 'Kallang Stn', road: 'Sims Ave', lat: 1.3115, lng: 103.8718 },
  { code: '82019', name: 'Eunos Stn', road: 'Sims Ave', lat: 1.3188, lng: 103.9032 },
  { code: '92049', name: 'Marine Parade Stn', road: 'Marine Parade Rd', lat: 1.3025, lng: 103.9055 },

  // --- West (Jurong, Boon Lay, Clementi, Buona Vista, HarbourFront) ---
  { code: '28009', name: 'Jurong East Int', road: 'Jurong Gateway Rd', lat: 1.3335, lng: 103.7422 },
  { code: '28201', name: 'Blk 131', road: 'Jurong Gateway Rd', lat: 1.3345, lng: 103.7435 },
  { code: '28109', name: 'Bef Jurong Town Hall Rd', road: 'Jurong Gateway Rd', lat: 1.3325, lng: 103.7408 },
  { code: '28019', name: 'Opp Westgate', road: 'Jurong Gateway Rd', lat: 1.3340, lng: 103.7428 },
  { code: '22009', name: 'Boon Lay Int', road: 'Jurong West Ctrl 3', lat: 1.3395, lng: 103.7058 },
  { code: '22199', name: 'Opp Boon Lay Stn', road: 'Jurong West St 63', lat: 1.3382, lng: 103.7045 },
  { code: '17179', name: 'Clementi Stn Exit A', road: 'Cmnwlth Ave West', lat: 1.3152, lng: 103.7655 },
  { code: '17171', name: 'Clementi Stn Exit B', road: 'Cmnwlth Ave West', lat: 1.3148, lng: 103.7648 },
  { code: '11361', name: 'Buona Vista Stn Exit C', road: 'North Buona Vista Rd', lat: 1.3068, lng: 103.7905 },
  { code: '11369', name: 'Buona Vista Stn Exit D', road: 'North Buona Vista Rd', lat: 1.3074, lng: 103.7902 },
  { code: '11149', name: 'Queenstown Stn Exit A', road: 'Cmnwlth Ave', lat: 1.2945, lng: 103.8062 },
  { code: '10129', name: 'Redhill Stn', road: 'Jln Tiong', lat: 1.2898, lng: 103.8172 },
  { code: '14119', name: 'HarbourFront Stn/Vivocity', road: 'Telok Blangah Rd', lat: 1.2648, lng: 103.8222 },
  { code: '14121', name: 'Opp Vivocity', road: 'Telok Blangah Rd', lat: 1.2655, lng: 103.8218 },

  // --- North & North-East ---
  { code: '46009', name: 'Woodlands Temp Int', road: 'Woodlands Sq', lat: 1.4368, lng: 103.7865 },
  { code: '46279', name: 'Woodlands Stn', road: 'Woodlands Ave 2', lat: 1.4375, lng: 103.7872 },
  { code: '46509', name: 'Woodlands Civic Ctr', road: 'Woodlands Ave 5', lat: 1.4348, lng: 103.7858 },
  { code: '59009', name: 'Yishun Int', road: 'Yishun Central 1', lat: 1.4298, lng: 103.8345 },
  { code: '59079', name: 'Yishun Stn', road: 'Yishun Ave 2', lat: 1.4305, lng: 103.8352 },
  { code: '54009', name: 'Ang Mo Kio Int', road: 'Ang Mo Kio Ave 8', lat: 1.3695, lng: 103.8495 },
  { code: '54261', name: 'Ang Mo Kio Stn', road: 'Ang Mo Kio Ave 3', lat: 1.3702, lng: 103.8488 },
  { code: '53231', name: 'Bishan Stn', road: 'Bishan Rd', lat: 1.3512, lng: 103.8490 },
  { code: '53239', name: 'Opp Bishan Stn', road: 'Bishan Rd', lat: 1.3518, lng: 103.8482 },
  { code: '52009', name: 'Toa Payoh Int', road: 'Lor 6 Toa Payoh', lat: 1.3328, lng: 103.8475 },
  { code: '52189', name: 'Toa Payoh Stn', road: 'Lor 2 Toa Payoh', lat: 1.3332, lng: 103.8468 },
  { code: '66009', name: 'Serangoon Int', road: 'Serangoon Central', lat: 1.3502, lng: 103.8735 },
  { code: '66181', name: 'Serangoon Stn Exit C', road: 'Upp Serangoon Rd', lat: 1.3495, lng: 103.8742 },
  { code: '67009', name: 'Punggol Temp Int', road: 'Punggol Pl', lat: 1.4038, lng: 103.9025 },
  { code: '67011', name: 'Punggol Stn Exit C', road: 'Punggol Central', lat: 1.4042, lng: 103.9018 },
  { code: '67409', name: 'Sengkang Int', road: 'Sengkang Sq', lat: 1.3918, lng: 103.8955 },
  { code: '64009', name: 'Hougang Central Int', road: 'Hougang Central', lat: 1.3712, lng: 103.8928 },
  { code: '64541', name: 'Hougang Stn Exit B', road: 'Upp Serangoon Rd', lat: 1.3718, lng: 103.8919 },

  // --- Bukit Timah, Bukit Batok, Bukit Panjang, Choa Chu Kang ---
  { code: '42019', name: 'Beauty World Stn Exit B', road: 'Jln Jurong Kechil', lat: 1.3422, lng: 103.7762 },
  { code: '42099', name: 'Opp Beauty World Ctr', road: 'Upp Bt Timah Rd', lat: 1.3435, lng: 103.7770 },
  { code: '43009', name: 'Bt Batok Int', road: 'Bt Batok Ctrl', lat: 1.3498, lng: 103.7495 },
  { code: '44009', name: 'Choa Chu Kang Int', road: 'Choa Chu Kang Loop', lat: 1.3852, lng: 103.7445 },
  { code: '44539', name: 'Bt Panjang Stn Exit A', road: 'Woodlands Rd', lat: 1.3788, lng: 103.7618 },
  { code: '45009', name: 'Bt Panjang Int', road: 'Petir Rd', lat: 1.3775, lng: 103.7632 },
];
