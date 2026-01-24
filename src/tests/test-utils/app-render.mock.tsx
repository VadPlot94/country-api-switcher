import { QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import type { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { AppWithRoutes } from '@/app.routes';
import { store } from '@/redux-settings/store';

import { createTestQueryClient } from './tanstack-query-client.mock';

export function renderWithProviders(
  ui: React.ReactElement,
  initialEntries: string[] = ['/'],
) {
  const queryClient = createTestQueryClient();

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
      </QueryClientProvider>
    </Provider>
  );

  return render(ui, { wrapper: Wrapper, ...{ initialEntries } });
}

export default function renderApp(initialEntries?: string[]) {
  return renderWithProviders(<AppWithRoutes />, initialEntries);
}
