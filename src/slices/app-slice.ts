import { createSlice } from '@reduxjs/toolkit';
import { Theme } from '../services/constants.service';
import helperService from '../services/helper.service';

export interface IAppState {
  theme: Theme;
}

const initialState: IAppState = {
  theme: helperService.getAppThemeFromLocalStorage() || Theme.DarkMode,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleAppTheme(prevState: IAppState) {
      prevState.theme =
        prevState.theme === Theme.DarkMode ? Theme.LightMode : Theme.DarkMode;
    },
  },
});

export const { toggleAppTheme } = appSlice.actions;

export default appSlice.reducer;
