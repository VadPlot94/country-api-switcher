import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import queryClient from './tanstack-query-client/tanstack-client';
import fileClient from './request-clients/file-client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.scss';
import CountryPageLayout from './components/app/app-layouts/country-page-layout';
import MainPageLayout from './components/app/app-layouts/main-page-layout';
import NotFoundPage from './components/not-found-page/not-found-page';

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
