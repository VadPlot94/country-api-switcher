import { Route, Routes } from 'react-router-dom';

import App from './components/app/app';
import CountryPageLayout from './components/app/app-layouts/country-page-layout';
import MainPageLayout from './components/app/app-layouts/main-page-layout';
import NotFoundPage from './components/not-found-page/not-found-page';

export function AppWithRoutes() {
  return (
    <Routes>
      <Route element={<App />}>
        <Route
          path="/"
          element={<MainPageLayout />}
        />
        <Route
          path="/:lang?"
          element={<MainPageLayout />}
        />
        <Route
          path="/country/:cca3"
          element={<CountryPageLayout />}
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
  );
}
