import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from './userSlice/slice';
import { classReducer } from './classSlice/slice';
import { fileReducer } from './fileSlice/slice';

const store = configureStore({
  reducer: {
    user: usersReducer,
    classes: classReducer,
    files: fileReducer,
  },
});

export default store;
