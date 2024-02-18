import iconMap from '../../generated/icon-map.json';
import type {
  FileExtensionsKey,
  FileNamesKey,
  FolderNamesKey,
  IconDefinitionsKey,
} from './types';

export function filenameFromPath(path: string): string {
  const segments = path.split('/');
  return segments[segments.length - 1] ?? path;
}

export function getIconNameForFileName(fileName: string): IconDefinitionsKey {
  return (iconMap.fileNames[fileName as FileNamesKey] ??
    iconMap.fileNames[fileName.toLowerCase() as FileNamesKey] ??
    iconMap.fileExtensions[getFileSuffix(fileName)] ??
    iconMap.fileExtensions[getFileExtension(fileName) as FileExtensionsKey] ??
    (fileName.endsWith('.html') ? 'html' : null) ??
    (fileName.endsWith('.ts') ? 'typescript' : null) ??
    (fileName.endsWith('.js') ? 'javascript' : null) ??
    'file') as IconDefinitionsKey;
}

export function getIconNameForDirectoryName(
  dirName: string
): IconDefinitionsKey {
  return (iconMap.folderNames[dirName as FolderNamesKey] ??
    iconMap.folderNames[dirName.toLowerCase() as FolderNamesKey] ??
    'folder') as IconDefinitionsKey;
}

function getFileExtension(fileName: string): string {
  return fileName.substring(fileName.lastIndexOf('.') + 1);
}

function getFileSuffix(fileName: string): FileExtensionsKey {
  return fileName.slice(fileName.indexOf('.') + 1) as FileExtensionsKey;
}
