import { createSlice } from '@reduxjs/toolkit';

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    pending: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getOrdersStart: state => {
      state.pending = true;
      state.error = false;
    },
    getOrdersSuccess: (state, action) => {
      state.pending = false;
      state.orders = action.payload;
    },
    getOrdersFailure: state => {
      state.pending = false;
      state.error = true;
    },
  },
});

export const { getOrdersStart, getOrdersSuccess, getOrdersFailure } =
  orderSlice.actions;

export default orderSlice.reducer;
