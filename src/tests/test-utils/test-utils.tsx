import themeMiddleware from '@redux-settings/middlewares/themeMiddleware';
import appReducer from '@redux-settings/slices/app-slice';
import filterDropdownReducer from '@redux-settings/slices/filter-dropdown-slice';
import searchReducer from '@redux-settings/slices/search-slice';
import { configureStore } from '@reduxjs/toolkit';
import { render as rtlRender } from '@testing-library/react';
import type { ReactElement } from 'react';
import { Provider } from 'react-redux';

export default function render(
  ui: ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        filterDropdown: filterDropdownReducer,
        search: searchReducer,
        app: appReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(themeMiddleware),
      preloadedState,
    }),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}
