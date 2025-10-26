export const EMERGENCY_KEYWORDS = {
  general: [
    'notfall', 'hilfe', 'sofort', 'dringend', 'unfall', 'verletzt', 'bewusstlos',
    'emergency', 'help', 'immediately', 'urgent', 'accident', 'injured', 'unconscious'
  ],
  fire: [
    'feuer', 'brand', 'flammen', 'rauch', 'explosion', 'brennen', 'hausbrand',
    'fire', 'blaze', 'flames', 'smoke', 'explosion', 'burning', 'house fire'
  ],
  weather: [
    'wetter', 'sturm', 'unwetter', 'regen', 'schnee', 'hagel', 'gewitter', 'orkan', 'flut', 'überschwemmung', 'eis', 'glatteis',
    'weather', 'storm', 'severe weather', 'rain', 'snow', 'hail', 'thunderstorm', 'hurricane', 'flood', 'overflow', 'ice', 'black ice'
  ],
  firstAid: [
    'erste hilfe', 'erstehilfe', 'verband', 'pflaster', 'rettung', 'atemspende', 'wiederbelebung', 'herzdruckmassage', 'notarzt', 'sanitäter',
    'first aid', 'bandage', 'plaster', 'rescue', 'resuscitation', 'breathing aid', 'cardiac massage', 'paramedic', 'emergency doctor'
  ],

  emergency112: [
    '112', 'notruf', 'rettungsdienst', 'einsatz', 'hilfe rufen',
    '112', 'emergency call', 'rescue service', 'operation', 'call for help'
  ],

  police: [
    'polizei', 'wache', 'beamter', 'verbrechen', 'überfall', 'diebstahl', 'einsatzfahrzeug',
    'police', 'station', 'officer', 'crime', 'robbery', 'theft', 'patrol car'
  ],

  poison: [
    'gift', 'vergiftung', 'giftig', 'arznei', 'überdosis', 'chemikalie', 'pilzvergiftung', 'gasvergiftung',
    'poison', 'poisoning', 'toxic', 'medicine', 'overdose', 'chemical', 'mushroom poisoning', 'gas poisoning'
  ]
};

export const detectEmergencyType = (query: string): string | null => {
  const queryLower = query.toLowerCase();

  if (EMERGENCY_KEYWORDS.emergency112.some(kw => queryLower.includes(kw))) return 'emergency112';
  if (EMERGENCY_KEYWORDS.police.some(kw => queryLower.includes(kw))) return 'police';
  if (EMERGENCY_KEYWORDS.poison.some(kw => queryLower.includes(kw))) return 'poison';
  if (EMERGENCY_KEYWORDS.firstAid.some(kw => queryLower.includes(kw))) return 'firstAid';
  if (EMERGENCY_KEYWORDS.fire.some(kw => queryLower.includes(kw))) return 'fire';
  if (EMERGENCY_KEYWORDS.weather.some(kw => queryLower.includes(kw))) return 'weather';
  if (EMERGENCY_KEYWORDS.general.some(kw => queryLower.includes(kw))) return 'emergency';

  return null;
};