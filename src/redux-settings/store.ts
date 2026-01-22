import { configureStore } from '@reduxjs/toolkit';

import themeMiddleware from './middlewares/themeMiddleware';
import appReducer from './slices/app-slice';
import filterDropdownReducer from './slices/filter-dropdown-slice';
import searchReducer from './slices/search-slice';

export const store = configureStore({
  reducer: {
    filterDropdown: filterDropdownReducer,
    search: searchReducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(themeMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof configureStore>;
