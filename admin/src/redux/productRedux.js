import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    pending: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getProductStart: state => {
      state.pending = true;
      state.error = false;
    },
    getProductSuccess: (state, action) => {
      state.pending = false;
      state.products = action.payload;
    },
    getProductFailure: state => {
      state.pending = false;
      state.error = true;
    },
    //DELETE
    deleteProductStart: state => {
      state.pending = true;
      state.error = false;
    },
    deleteProductSuccess: (state, action) => {
      state.pending = false;
      state.products.splice(
        state.products.findIndex(item => item._id === action.payload),
        1
      );
    },
    deleteProductFailure: state => {
      state.pending = false;
      state.error = true;
    },
    //UPDATE
    updateProductStart: state => {
      state.pending = true;
      state.error = false;
    },
    updateProductSuccess: (state, action) => {
      state.pending = false;
      state.products[
        state.products.findIndex(item => item._id === action.payload.id)
      ] = action.payload;
    },
    updateProductFailure: state => {
      state.pending = false;
      state.error = true;
    },
    //CREATE
    addProductStart: state => {
      state.pending = true;
      state.error = false;
    },
    addProductSuccess: (state, action) => {
      state.pending = false;
      state.products.push(action.payload);
    },
    addProductFailure: state => {
      state.pending = false;
      state.error = true;
    },
  },
});

export const {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
} = productSlice.actions;

export default productSlice.reducer;
