import scw from 'unplugin-swc';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    globals: true,
    root: './',
  },
  plugins: [
    tsConfigPaths(),
    scw.vite({
      module: { type: 'es6' },
    }),
  ],
});
