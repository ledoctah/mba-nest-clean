import scw from 'unplugin-swc';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts'],
    globals: true,
    root: './',
    setupFiles: ['./test/setup-e2e.ts'],
  },
  plugins: [
    tsConfigPaths(),
    scw.vite({
      module: { type: 'es6' },
    }),
  ],
});
