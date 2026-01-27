import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';

import { rsBuildAliases } from './alias-config';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [pluginReact(), pluginSass()],
  resolve: { alias: rsBuildAliases },
  output: {
    // Github deploy at folder country-api-switcher (name of the repo)
    // Gitlab deploy at '/', also localhost('development') need '/'
    // then need to change base url to it
    assetPrefix:
      process?.env?.GITHUB_ACTIONS && process?.env?.NODE_ENV !== 'development'
        ? '/country-api-switcher/'
        : '/',
  },
  source: {
    define: {
      'process.env.IS_GITHUB_PAGES': JSON.stringify(
        !!process.env.GITHUB_ACTIONS,
      ),
    },
  },
  html: {
    meta: {
      viewport:
        'width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0, user-scalable=no',
    },
    title: 'Countries List App',
    tags: [
      // Will be inserted in head
      {
        tag: 'script',
        attrs: {
          type: 'text/javascript',
        },
        children: `
          document.fonts.ready.then(() => {
            document.body.classList.add("fonts-loaded");
          });

          // Show after 3 sec even if font still not loaded
          setTimeout(() => {
            if (!document.body.classList.contains("fonts-loaded")) {
              document.body.classList.add("fonts-loaded");
            }
          }, 3000);
        `,
      },
    ],
  },
});
