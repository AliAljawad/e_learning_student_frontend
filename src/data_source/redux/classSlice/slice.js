import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  enrolled: [],
};

const classSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {
    loadClasses: (state, action) => {
      state.list = action.payload;
    },
    enrollClass: (state, action) => {
      state.enrolled.push(action.payload);
    },
  },
});

export const { loadClasses, enrollClass } = classSlice.actions;
export const classReducer = classSlice.reducer;
