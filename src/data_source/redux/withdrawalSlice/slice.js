import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  withdrawals: [], 
};

const withdrawalsSlice = createSlice({
  name: 'withdrawals',
  initialState,
  reducers: {
    setWithdrawals: (state, action) => {
      state.withdrawals = action.payload;
    },
  },
});

export const { setWithdrawals } = withdrawalsSlice.actions;
export const withdrawalsReducer = withdrawalsSlice.reducer;
