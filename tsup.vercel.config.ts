import { cp } from 'node:fs/promises';
import { defineConfig } from 'tsup';

export default defineConfig({
  platform: 'node',
  entry: ['src/app/index.ts'],
  outDir: 'api',
  format: 'esm',
  skipNodeModulesBundle: true,
  onSuccess: async () => {
    await Promise.all([
      cp('src/app/styles', 'api/styles', { recursive: true }),
      cp('src/app/views', 'api/views', { recursive: true }),
    ]);
  },
});
