// packages/settings/slices/themeSlice.ts
import { createSlice } from '@reduxjs/toolkit';

// Initial state only applies for fresh installs or if persist data is cleared
const initialState = {
  theme: 'light', // Default to light mode initially
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
