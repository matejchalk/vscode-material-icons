import { MATERIAL_ICONS } from './constants';
import type { MaterialIcon } from './types';

describe('MATERIAL_ICONS', () => {
  it.each([
    'eslint',
    'lighthouse',
    'typescript',
    'npm',
    'nrwl',
    'jest',
    'cypress',
  ] satisfies MaterialIcon[])('contains %p icon', icon => {
    expect(MATERIAL_ICONS).toContain(icon);
  });
});
