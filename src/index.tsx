import './index.scss';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { AppWithRoutes } from './app.routes';
import { store } from './redux-settings/store';
import fileClient from './services/request-clients/file-client';
import urlService from './services/url.service';
import queryClient from './tanstack-client/tanstack-client';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter basename={urlService.getBaseName2()}>
            <AppWithRoutes />
          </BrowserRouter>
          {/* Devtools only in dev */}
          {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
      </Provider>
    </React.StrictMode>,
  );
}

// For work without internet
fileClient.init();
