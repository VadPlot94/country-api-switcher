import path from 'path';

export const rsBuildAliases = {
  '@': './src',
  '@components': './src/components',
  '@i18n-next': './src/i18n-next',
  '@redux-settings': './src/redux-settings',
  '@services': './src/services',
  '@utils': './src/utils',
  '@tests': './src/tests',
  '@assets': './public/assets',
  '@custom-hooks': './src/custom-hooks',
};

export const viteAliases = Object.fromEntries(
  Object.entries(rsBuildAliases).map(([key, value]) => [
    key,
    path.resolve(__dirname, value),
  ]),
);
