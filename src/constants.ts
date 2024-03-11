import iconMap from '../generated/icon-map.json' assert { type: 'json' };
import type { MaterialIcon } from './types';

export const MATERIAL_ICONS = Object.keys(iconMap.iconDefinitions) as [
  MaterialIcon,
  MaterialIcon,
  ...MaterialIcon[]
];
