import { getIconForFilePath } from './functions';
import type { MaterialIcon } from './types';

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
    { path: 'Startup.cs', icon: 'csharp' },
  ])('should pick $icon icon for path $path', ({ path, icon }) => {
    expect(getIconForFilePath(path)).toBe(icon);
  });
});
