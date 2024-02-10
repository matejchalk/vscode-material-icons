import iconMap from '../generated/icon-map.json';
import type { MaterialIcon } from './types';
import {
  filenameFromPath,
  getIconNameForDirectoryName,
  getIconNameForFileName,
} from './utils';

export function isMaterialIconName(value: unknown): value is MaterialIcon {
  return typeof value === 'string' && value in iconMap.iconDefinitions;
}

export function getIconUrlByName(
  iconName: MaterialIcon,
  iconsUrl: string
): string {
  return `${iconsUrl}/${iconName.toString()}.svg`;
}

export function getIconUrlForFilePath(path: string, iconsUrl: string): string {
  const iconName = getIconForFilePath(path);
  return getIconUrlByName(iconName, iconsUrl);
}

export function getIconForFilePath(path: string): MaterialIcon {
  const fileName = filenameFromPath(path);
  return getIconNameForFileName(fileName);
}

export function getIconForDirectoryPath(path: string): MaterialIcon {
  const dirName = filenameFromPath(path);
  return getIconNameForDirectoryName(dirName);
}
