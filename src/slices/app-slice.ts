import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Theme } from '../services/constants.service';
import helperService from '../services/helper.service';
import type { ICountry } from '../providers/types';

export interface IAppState {
  theme: Theme;
  selectedCountry: ICountry;
}

const initialState: IAppState = {
  theme: helperService.getAppThemeFromLocalStorage() || Theme.DarkMode,
  selectedCountry: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleAppTheme(prevState: IAppState) {
      prevState.theme =
        prevState.theme === Theme.DarkMode ? Theme.LightMode : Theme.DarkMode;
    },
    setSelectedCountry(prevState: IAppState, action: PayloadAction<ICountry>) {
      prevState.selectedCountry = action.payload;
    },
  },
});

export const { toggleAppTheme, setSelectedCountry } = appSlice.actions;

export default appSlice.reducer;
