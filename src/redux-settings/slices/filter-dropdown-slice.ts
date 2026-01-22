import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface IFilterDropdownState {
  isOpen: boolean;
  selectedRegion: string;
}

const initialState: IFilterDropdownState = {
  isOpen: false,
  selectedRegion: null,
};

const filterDropdownSlice = createSlice({
  name: 'filterDropdown',
  initialState,
  reducers: {
    toggleDropdown(prevState: IFilterDropdownState) {
      prevState.isOpen = !prevState.isOpen;
    },
    setSelectedRegion(
      prevState: IFilterDropdownState,
      action: PayloadAction<string>,
    ) {
      prevState.selectedRegion = action.payload;
    },
  },
});

export const { toggleDropdown, setSelectedRegion } =
  filterDropdownSlice.actions;
export default filterDropdownSlice.reducer;
