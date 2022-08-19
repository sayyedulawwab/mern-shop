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
    //DELETE
    deleteOrderStart: state => {
      state.pending = true;
      state.error = false;
    },
    deleteOrderSuccess: (state, action) => {
      state.pending = false;
      state.orders.splice(
        state.orders.findIndex(order => order._id === action.payload),
        1
      );
    },
    deleteOrderFailure: state => {
      state.pending = false;
      state.error = true;
    },
    //UPDATE
    updateOrderStart: state => {
      state.pending = true;
      state.error = false;
    },
    updateOrderSuccess: (state, action) => {
      state.pending = false;
      state.orders[
        state.orders.findIndex(item => item._id === action.payload.id)
      ] = action.payload;
    },
    updateOrderFailure: state => {
      state.pending = false;
      state.error = true;
    },
  },
});

export const {
  getOrdersStart,
  getOrdersSuccess,
  getOrdersFailure,
  deleteOrderStart,
  deleteOrderSuccess,
  deleteOrderFailure,
  updateOrderStart,
  updateOrderSuccess,
  updateOrderFailure,
} = orderSlice.actions;

export default orderSlice.reducer;
