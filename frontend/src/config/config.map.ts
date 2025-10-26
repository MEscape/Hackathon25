export const MAP_CONFIG = {
  // Tile system
  TILE_SIZE: 256,
  OSM_SUBDOMAINS: ['a', 'b', 'c'] as const,
  
  // Zoom levels
  ZOOM: {
    INITIAL: 13,
    MIN: 3,
    MAX: 18,
  },
  
  // Default location (Berlin)
  DEFAULT_CENTER: {
    lat: 52.52,
    lon: 13.405,
  },
  
  // Rendering optimization
  BUFFER_TILES: 6, // Extra tiles for smooth panning
  VISIBLE_TILES: 3, // Tiles shown in viewport
  
  // Help centers visibility by zoom level
  HELP_CENTERS_ZOOM_CONFIG: {
    ALL: 16, // Show all types
    ESSENTIAL: 14, // Hospital, Police, Fire
    CRITICAL: 12, // Hospital, Police only
    MINIMAL: 0, // Hospitals only
  },
  
  // Base radius for help center search (adjusted by zoom)
  BASE_SEARCH_RADIUS: 5000, // 5km
} as const;

export const TILE_HEADERS = {
  'User-Agent': 'SafeNet/1.0 (hackathon demo; contact: dev@example.com)',
  Referer: 'https://safenet.local',
} as const;

export const HELP_CENTER_CONFIG = {
  hospital: { 
    icon: 'medical', 
    color: '#EF4444',
    label: 'Krankenhaus' 
  },
  police: { 
    icon: 'shield', 
    color: '#3B82F6',
    label: 'Polizei' 
  },
  fire_station: { 
    icon: 'flame', 
    color: '#F59E0B',
    label: 'Feuerwehr' 
  },
  pharmacy: { 
    icon: 'medkit', 
    color: '#10B981',
    label: 'Apotheke' 
  },
  shelter: { 
    icon: 'home', 
    color: '#8B5CF6',
    label: 'Schutzraum' 
  },
} as const;