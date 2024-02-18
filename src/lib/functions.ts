import iconMap from '../../generated/icon-map.json';
import type { MaterialIcon, MaterialIconInfo } from './types';
import {
  filenameFromPath,
  findKeysByValue,
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

export function getIconInfo(name: MaterialIcon): MaterialIconInfo {
  const fileExtensions = findKeysByValue(name, iconMap.fileExtensions);
  const fileNames = findKeysByValue(name, iconMap.fileNames);
  const folderNames = findKeysByValue(name, iconMap.folderNames);
  const folderNamesExpanded = findKeysByValue(
    name,
    iconMap.folderNamesExpanded
  );

  return {
    name,
    ...(fileExtensions.length > 0 && { fileExtensions }),
    ...(fileNames.length > 0 && { fileNames }),
    ...(folderNames.length > 0 && { folderNames }),
    ...(folderNamesExpanded.length > 0 && { folderNamesExpanded }),
  };
}
