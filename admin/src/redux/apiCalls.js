import { publicRequest, userRequest } from '../requestMethods';
import {
  addProductFailure,
  addProductStart,
  addProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  getProductFailure,
  getProductStart,
  getProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
} from './productRedux';
import {
  addUserFailure,
  addUserStart,
  addUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  getUsersFailure,
  getUsersStart,
  getUsersSuccess,
  loginFailure,
  loginStart,
  loginSuccess,
  logoutFailure,
  logoutStart,
  logoutSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from './userRedux';

import {
  deleteOrderFailure,
  deleteOrderStart,
  deleteOrderSuccess,
  getOrdersFailure,
  getOrdersStart,
  getOrdersSuccess,
  updateOrderFailure,
  updateOrderStart,
  updateOrderSuccess,
} from './orderRedux';

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post('/auth/login', user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logout = async dispatch => {
  dispatch(logoutStart());
  try {
    dispatch(logoutSuccess());
  } catch (err) {
    dispatch(logoutFailure());
  }
};

export const getProducts = async dispatch => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get('/products');
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    // // to delete product from database add the following line and replace deleteProductSuccess(id) with deleteProductSuccess(res.data._id)
    // const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest.put(`/products/${id}`, product);
    dispatch(updateProductSuccess(res.data));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};

export const getUsers = async dispatch => {
  dispatch(getUsersStart());
  try {
    const res = await userRequest.get('/users');
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailure());
  }
};

export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    // // to delete user from database add the following line and replace deleteUserSuccess(id) with deleteUserSuccess(res.data._id)
    // const res = await userRequest.delete(`/users/${id}`);
    dispatch(deleteUserSuccess(id));
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};

export const updateUser = async (id, user, dispatch) => {
  dispatch(updateUserStart());
  try {
    const res = await userRequest.put(`/users/${id}`, user);
    dispatch(updateUserSuccess(res.data));
  } catch (err) {
    dispatch(updateUserFailure());
  }
};
export const addUser = async (user, dispatch) => {
  dispatch(addUserStart());
  try {
    const res = await userRequest.post(`/users`, user);
    dispatch(addUserSuccess(res.data));
  } catch (err) {
    dispatch(addUserFailure());
  }
};

export const getOrders = async dispatch => {
  dispatch(getOrdersStart());
  try {
    const res = await userRequest.get('/orders');
    dispatch(getOrdersSuccess(res.data));
  } catch (err) {
    dispatch(getOrdersFailure());
  }
};

export const deleteOrder = async (id, dispatch) => {
  dispatch(deleteOrderStart());
  try {
    // // to delete order from database add the following line and replace deleteOrderSuccess(id) with deleteOrderSuccess(res.data._id)
    // const res = await orderRequest.delete(`/orders/${id}`);
    dispatch(deleteOrderSuccess(id));
  } catch (err) {
    dispatch(deleteOrderFailure());
  }
};

export const updateOrder = async (id, order, dispatch) => {
  dispatch(updateOrderStart());
  try {
    const res = await userRequest.put(`/orders/${id}`, order);
    dispatch(updateOrderSuccess(res.data));
  } catch (err) {
    dispatch(updateOrderFailure());
  }
};
