import constants from '@services/constants.service';
import logger from '@services/logger.service';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: constants.DefaultLanguage,
    supportedLngs: [constants.DefaultLanguage, 'ru'],
    // debug: true -> include 'cimode' in supportedLngs
    debug: import.meta.env.DEV,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: `${constants.BaseUrl}/translations/{{lng}}/{{ns}}.json`,
    },

    detection: {
      order: [
        'path',
        'querystring',
        // 'localStorage', - disable set lang in localStorage
        // 'cookie',
        // 'navigator',
        'htmlTag',
      ],
      lookupQuerystring: 'lng',
      caches: [], // ['localStorage', 'cookie'], - disable set lang in localStorage
      lookupLocalStorage: 'i18nextLng',
      lookupCookie: 'i18nextLng',
    },

    ns: ['translation'],
    defaultNS: 'translation',
    missingKeyHandler: (lng, ns, key) => {
      logger.logWarn(`Missing translation: ${ns}.${key} for language ${lng}`);
    },
  });

export default i18n;
