import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface ISearchState {
  inputValue: string;
  searchQuery: string;
}

const initialState: ISearchState = {
  inputValue: '',
  searchQuery: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setInputValue(prevState: ISearchState, action: PayloadAction<string>) {
      prevState.inputValue = action.payload;
    },
    setSearchQuery(prevState: ISearchState, action: PayloadAction<string>) {
      prevState.searchQuery = action.payload?.toLowerCase();
    },
  },
});

export const { setInputValue, setSearchQuery } = searchSlice.actions;

export default searchSlice.reducer;
