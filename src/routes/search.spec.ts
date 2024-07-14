import type { MaterialIcon } from '$lib/index.js';
import { describe, expect, it } from 'vitest';
import { searchIcons } from './search.js';

describe('search icons', () => {
	it('should find by icon name', () => {
		expect(searchIcons('markdown')).toContain<MaterialIcon>('markdown');
	});

	it('should find by file name', () => {
		expect(searchIcons('docker-compose.yml')).toContain<MaterialIcon>('docker');
	});

	it('should find by file extension', () => {
		expect(searchIcons('scss')).toContain<MaterialIcon>('sass');
	});

	it('should find by folder name', () => {
		expect(searchIcons('src')).toContain<MaterialIcon>('folder-src');
	});

	it('should filter out non-matching', () => {
		expect(searchIcons('python')).not.toContain<MaterialIcon>('java');
	});

	it('should match only file extension if term prefixed by .', () => {
		const results = searchIcons('.cs');
		expect(results).toContain<MaterialIcon>('csharp');
		expect(results).not.toContain<MaterialIcon>('tailwindcss');
	});

	it('should match only file extension if term prefixed by *.', () => {
		const results = searchIcons('*.cs');
		expect(results).toContain<MaterialIcon>('csharp');
		expect(results).not.toContain<MaterialIcon>('tailwindcss');
	});

	it('should match icon name using _ or - as word separator', () => {
		const results = searchIcons('ts');
		expect(results).toContain<MaterialIcon>('react_ts');
		expect(results).toContain<MaterialIcon>('test-ts');
	});

	it('should match file extension using . as word separator', () => {
		expect(searchIcons('.ts')).toContain<MaterialIcon>('angular-component');
	});

	it('should match file name using . as word separator', () => {
		expect(searchIcons('json')).toContain<MaterialIcon>('nodejs');
	});

	it('should prioritize exact match before partial match', () => {
		const results = searchIcons('css');
		expect(results.indexOf('css')).toBeLessThan(results.indexOf('postcss'));
		expect(results[0]).toBe<MaterialIcon>('css');
	});

	it('should prioritize prefix match before contains match', () => {
		const results = searchIcons('ng');
		expect(results.indexOf('nginx')).toBeLessThan(results.indexOf('django'));
	});
});
