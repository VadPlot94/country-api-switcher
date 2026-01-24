import { QueryClient } from '@tanstack/react-query';

import type { ICountry } from '@/services/providers/types';

const initialCountriesData = [
  {
    cca3: 'FRA',
    name: { common: 'France' },
    region: 'Europe',
    flags: { png: '' },
  },
  {
    cca3: 'DEU',
    name: { common: 'Germany' },
    region: 'Europe',
    flags: { png: '' },
  },
  {
    cca3: 'ITA',
    name: { common: 'Italy' },
    region: 'Europe',
    flags: { png: '' },
  },
];

export function createTestQueryClient(countriesData?: ICountry[]) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
        gcTime: 0,
        refetchOnWindowFocus: false,
      },
    },
  });

  queryClient.setQueryData(
    ['countriesList'],
    countriesData || initialCountriesData,
  );
  return queryClient;
}

export default function mockQueryClient(countriesData?: ICountry[]) {
  vi.doMock('@tanstack/react-query', async (importOriginal) => {
    const actual =
      await importOriginal<typeof import('@tanstack/react-query')>();

    return {
      ...actual,
      useQuery: vi.fn().mockImplementation((options) => {
        if (options.queryKey?.[0] === 'countriesList') {
          return {
            data: countriesData || initialCountriesData,
            isPending: false,
            isError: false,
            isSuccess: true,
            status: 'success',
            error: null,
            refetch: vi.fn(),
          };
        }

        return actual.useQuery(options);
      }),
    };
  });
}
