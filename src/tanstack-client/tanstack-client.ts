import { QueryClient } from '@tanstack/query-core';
import countryApiProvider, {
  countryFileProvider,
} from '@services/providers/country.api.provider';
import type { CountryFields } from '@services/providers/types';
import i18n from '@i18n-next/i18n';
import constants from '@services/constants.service';

// For TanStack Query devtools
declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import('@tanstack/query-core').QueryClient;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 2, // millisec*sec*min*hours
      retry: 1,
    },
  },
});

// For TanStack Query devtools
window.__TANSTACK_QUERY_CLIENT__ = queryClient;

queryClient.setQueryDefaults(['countriesList'], {
  queryFn: () => {
    const fields: CountryFields[] = [
      'name',
      'capital',
      'population',
      'region',
      'flags',
      'cca3',
    ];
    if (i18n.language !== constants.DefaultLanguage) {
      fields.push('translations');
    }
    return countryApiProvider
      .getAllCountries(fields)
      .catch(() => countryFileProvider.getAllCountries(fields));
  },
});

export default queryClient;
