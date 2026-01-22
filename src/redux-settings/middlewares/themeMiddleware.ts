import type { Middleware } from '@reduxjs/toolkit';
import { toggleAppTheme } from '../slices/app-slice';
import type { Theme } from '@services/constants.service';
import helperService from '@services/helper.service';
import type { RootState } from '../store';

const themeMiddleware: Middleware = store => next => action => {
  const result = next(action);
  if (toggleAppTheme.match(action)) {
    const theme: Theme = (store.getState() as RootState).app.theme;
    helperService.setAppThemeToLocalStorage(theme);
  }
  return result;
};

export default themeMiddleware;
