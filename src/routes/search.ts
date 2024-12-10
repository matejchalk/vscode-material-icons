import {
  getIconInfo,
  MATERIAL_ICONS,
  type MaterialIcon,
  type MaterialIconInfo,
} from '$lib/index.js';
import { matchSorter, type ValueGetterKey } from 'match-sorter';

export function searchIcons(
  term: string | null,
  excludeFolders: boolean = false,
): MaterialIcon[] {
  const preFilteredData = excludeFolders
    ? MATERIAL_ICONS.filter((iconName) => !/^folder-/.test(iconName))
    : MATERIAL_ICONS;

  if (!term) {
    return preFilteredData;
  }

  if (term.startsWith('.') || term.startsWith('*.')) {
    const extension = term.slice(term.indexOf('.') + 1);
    return matchSorter(preFilteredData, extension, {
      keys: [
        {
          key: createKey('fileExtensions'),
          threshold: matchSorter.rankings.ACRONYM,
        },
      ],
    });
  }
  return matchSorter(preFilteredData, term, {
    keys: [
      {
        key: createKey('name'),
        threshold: matchSorter.rankings.CONTAINS,
      },
      {
        key: createKey('fileExtensions'),
        threshold: matchSorter.rankings.EQUAL,
      },
      {
        key: createKey('fileNames'),
        threshold: matchSorter.rankings.STARTS_WITH,
      },
      ...(excludeFolders
        ? []
        : [
            {
              key: createKey('folderNames'),
              threshold: matchSorter.rankings.STARTS_WITH,
            },
          ]),
    ],
  });
}

function createKey(
  prop: Exclude<keyof MaterialIconInfo, 'folderNamesExpanded'>,
): ValueGetterKey<MaterialIcon> {
  switch (prop) {
    case 'name':
      return (icon) => withTerms(icon, '-', '_');
    case 'fileNames':
      return (icon) => arrayWithTerms(getIconInfo(icon).fileNames, '.');
    case 'fileExtensions':
      return (icon) => arrayWithTerms(getIconInfo(icon).fileExtensions, '.');
    case 'folderNames':
      return (icon) => getIconInfo(icon).folderNames ?? [];
  }
}

function withTerms(
  value: string,
  ...separators: [string, ...string[]]
): string[] {
  return [value, ...separators.flatMap((sep) => value.split(sep))];
}

function arrayWithTerms(
  array: string[] | undefined,
  ...separators: [string, ...string[]]
): string[] {
  return array?.flatMap((value) => withTerms(value, ...separators)) ?? [];
}
