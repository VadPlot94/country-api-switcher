import { vi } from 'vitest';

export default function mock18n() {
  vi.mock('react-i18next', () => {
    return {
      useTranslation: () => ({
        t: (key: string) => key,
        i18n: {
          changeLanguage: vi.fn(),
          language: 'en',
          dir: () => 'ltr',
          exists: vi.fn(),
          getFixedT: vi.fn(),
          init: vi.fn(),
          loadLanguages: vi.fn(),
          loadNamespaces: vi.fn(),
          loadResources: vi.fn(),
          off: vi.fn(),
          on: vi.fn(),
          options: {},
          setDefaultNamespace: vi.fn(),
        },
        ready: true,
      }),
      Trans: ({ children }: { children: React.ReactNode }) => children,
      Translation: ({ children }: { children: unknown }) => children,
      I18nextProvider: ({ children }: { children: React.ReactNode }) =>
        children,
      initReactI18next: {
        type: '3rdParty',
        init: vi.fn(),
      },
    };
  });
}
