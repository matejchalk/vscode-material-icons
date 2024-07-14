import type iconMap from './generated/icon-map.json';

export type IconDefinitionsKey = keyof (typeof iconMap)['iconDefinitions'];
export type FileNamesKey = keyof (typeof iconMap)['fileNames'];
export type FolderNamesKey = keyof (typeof iconMap)['folderNames'];
export type FileExtensionsKey = keyof (typeof iconMap)['fileExtensions'];

export type MaterialIcon = IconDefinitionsKey;

export type MaterialIconInfo = {
	name: MaterialIcon;
	fileExtensions?: string[];
	fileNames?: string[];
	folderNames?: string[];
	folderNamesExpanded?: string[];
};
