import iconMap from './generated/icon-map.json';
import type { MaterialIcon } from './types.js';

export const MATERIAL_ICONS = Object.keys(iconMap.iconDefinitions) as [
  MaterialIcon,
  MaterialIcon,
  ...MaterialIcon[],
];
