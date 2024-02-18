import { defineConfig } from 'tsup';

export default defineConfig({
  platform: 'neutral',
  dts: true,
  entry: ['src/lib/index.ts'],
  format: ['cjs', 'esm'],
});
