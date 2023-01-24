import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
};

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
    toggleLoader: (state, action) => {
      state.isLoading = Boolean(action.payload);
    },
  },
});

export const { startLoading, stopLoading, toggleLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
