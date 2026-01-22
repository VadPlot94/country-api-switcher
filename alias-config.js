import path from 'path';

export const aliases = {
  '@': './src',
  '@components': './src/components',
  '@i18n-next': 'src/i18n-next',
  '@redux-settings': './src/redux-settings',
  '@services': './src/services',
  '@utils': './src/utils',
  '@tests': './src/tests',
  '@assets': './public/assets',
  '@custom-hooks': './src/custom-hooks',
};

export const viteAliases = Object.fromEntries(
  Object.entries(aliases).map(([key, value]) => [
    key,
    path.resolve(__dirname, value),
  ]),
);

export const tsconfigPaths = Object.fromEntries(
  Object.entries(aliases).map(([key, value]) => [`${key}/*`, [`${value}/*`]]),
);
