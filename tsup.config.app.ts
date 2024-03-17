import { cp } from 'node:fs/promises';
import { defineConfig } from 'tsup';

export default defineConfig({
  platform: 'node',
  entry: ['src/app/main.ts'],
  format: 'esm',
  outDir: 'dist-app',
  skipNodeModulesBundle: true,
  onSuccess: async () => {
    await Promise.all([
      cp('src/app/styles', 'dist-app/styles', { recursive: true }),
      cp('src/app/views', 'dist-app/views', { recursive: true }),
    ]);
  },
});
