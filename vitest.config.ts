// vitest.config.ts
import react from '@vitejs/plugin-react'; // or @rsbuild/plugin-react if needed
import { defineConfig } from 'vitest/config';

import { viteAliases } from './alias-config';

export default defineConfig({
  plugins: [react()],
  test: {
    ui: true,
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setupTests.ts'],
    // css: true, // handle css in js modules
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**'],

    coverage: {
      provider: 'v8', // or 'istanbul'
      reporter: ['text', 'json', 'html'],
      include: ['src/tests/**/*.{ts,tsx}', 'src/tests/**/*.spec.{ts,tsx}'],
      exclude: ['src/**/*.d.ts', '**/node_modules/**', '**/dist/**'],
    },

    deps: {
      optimizer: {
        // Optimizer settings for browser-like environments (jsdom/happy-dom)
        client: {
          // Packages that should be pre-bundled (helps with ESM/CJS issues, speed, etc.)
          include: [
            '@testing-library/react',
            '@testing-library/user-event',
            'react-router-dom', // ← added, often needed for routing tests
            // Add more if you notice slow startup or "require of ES module" errors, e.g.:
            // 'zustand', 'axios', 'lodash', etc.
          ],

          // Optional: packages to exclude from optimization (rarely needed)
          // exclude: ['some-pkg-you-want-to-keep-dynamic'],
        },

        // Usually not needed for pure client React + jsdom tests
        // ssr: { ... }
      },
    },
  },
  resolve: {
    alias: viteAliases,
  },
});
