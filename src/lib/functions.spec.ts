import { describe, expect, it } from 'vitest';
import { getIconForFilePath, getIconInfo } from './functions.js';
import type { MaterialIcon, MaterialIconInfo } from './types.js';

describe('getIconForFilePath', () => {
	it.each<{ path: string; icon: MaterialIcon }>([
		{ path: 'foo', icon: 'file' },
		{ path: 'lib/index.js', icon: 'javascript' },
		{ path: 'src/main.ts', icon: 'typescript' },
		{ path: 'public/index.html', icon: 'html' },
		{ path: 'src/styles.css', icon: 'css' },
		{ path: 'src/app/app.component.scss', icon: 'sass' },
		{ path: 'src/components/ui/Button.jsx', icon: 'react' },
		{ path: 'src/components/ui/Button.tsx', icon: 'react_ts' },
		{ path: 'src/app/landing/landing.component.ts', icon: 'angular-component' },
		{ path: 'src/app/landing/landing.module.ts', icon: 'angular' },
		{ path: 'src/app/auth.service.ts', icon: 'angular-service' },
		{ path: 'src/app/pipes/duration.pipe.ts', icon: 'angular-pipe' },
		{ path: 'src/app/auth.guard.ts', icon: 'angular-guard' },
		{ path: 'src/app/app.routes.ts', icon: 'routing' },
		{ path: 'Hello.vue', icon: 'vue' },
		{ path: 'Hello.svelte', icon: 'svelte' },
		{ path: 'hello.py', icon: 'python' },
		{ path: 'hello.go', icon: 'go' },
		{ path: 'Startup.cs', icon: 'csharp' }
	])('should pick $icon icon for path $path', ({ path, icon }) => {
		expect(getIconForFilePath(path)).toBe(icon);
	});
});

describe('getIconInfo', () => {
	it('should find icon file extensions', () => {
		expect(getIconInfo('css')).toEqual<MaterialIconInfo>({
			name: 'css',
			fileExtensions: ['css']
		});
	});

	// FIXME: handle TypeScript, JavaScript and HTML
	it.fails('should find icon file extensions for built-in language', () => {
		expect(getIconInfo('typescript')).toEqual<MaterialIconInfo>({
			name: 'typescript',
			fileExtensions: ['ts']
		});
	});

	it('should find icon file names', () => {
		expect(getIconInfo('nodejs')).toEqual<MaterialIconInfo>({
			name: 'nodejs',
			fileNames: expect.arrayContaining(['package.json', 'package-lock.json', '.nvmrc'])
		});
	});

	it('should find icon file names and extensions', () => {
		expect(getIconInfo('docker')).toEqual<MaterialIconInfo>({
			name: 'docker',
			fileNames: expect.arrayContaining([
				'dockerfile',
				'dockerfile.prod',
				'docker-compose.yml',
				'docker-compose.yaml'
			]),
			fileExtensions: expect.arrayContaining(['dockerignore'])
		});
	});

	it('should find icon folder name', () => {
		expect(getIconInfo('folder-docs')).toEqual<MaterialIconInfo>({
			name: 'folder-docs',
			folderNames: expect.arrayContaining(['docs', 'articles'])
		});
	});

	it('should find icon folder name expanded', () => {
		expect(getIconInfo('folder-images-open')).toEqual<MaterialIconInfo>({
			name: 'folder-images-open',
			folderNamesExpanded: expect.arrayContaining(['images', 'icons', 'photos'])
		});
	});
});
