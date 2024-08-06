import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from './userSlice/slice';
import { classReducer } from './classSlice/slice';
import { fileReducer } from './fileSlice/slice';
import { withdrawalsReducer } from './withdrawalSlice/slice';

const store = configureStore({
  reducer: {
    user: usersReducer,
    classes: classReducer,
    files: fileReducer,
    withdrawals: withdrawalsReducer,
  },
});

export default store;
