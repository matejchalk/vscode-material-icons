import { describe, expect, it } from 'vitest';
import { MATERIAL_ICONS } from './constants.js';
import type { MaterialIcon } from './types.js';

describe('MATERIAL_ICONS', () => {
	it.each([
		'eslint',
		'lighthouse',
		'typescript',
		'npm',
		'nx',
		'jest',
		'cypress'
	] satisfies MaterialIcon[])('contains %s icon', (icon) => {
		expect(MATERIAL_ICONS).toContain(icon);
	});
});
