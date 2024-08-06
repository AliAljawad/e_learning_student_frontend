import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

const fileSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    loadFiles: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { loadFiles } = fileSlice.actions;
export const fileReducer = fileSlice.reducer;
