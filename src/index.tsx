import './index.scss';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './components/app/app';
import CountryPageLayout from './components/app/app-layouts/country-page-layout';
import MainPageLayout from './components/app/app-layouts/main-page-layout';
import NotFoundPage from './components/not-found-page/not-found-page';
import { store } from './redux-settings/store';
import fileClient from './services/request-clients/file-client';
import queryClient from './tanstack-client/tanstack-client';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route element={<App />}>
                <Route
                  path="/:lang?"
                  element={<MainPageLayout />}
                />
                <Route
                  path=":lang?/country/:cca3"
                  element={<CountryPageLayout />}
                />
                <Route
                  path="*"
                  element={<NotFoundPage />}
                />
              </Route>
            </Routes>
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
