import { publicRequest, userRequest } from '../requestMethods';
import {
  getOrdersFailure,
  getOrdersStart,
  getOrdersSuccess,
} from './orderRedux';
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  loginFailure,
  loginStart,
  loginSuccess,
  logoutFailure,
  logoutStart,
  logoutSuccess,
  registerFailure,
  registerStart,
  registerSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from './userRedux';

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post('/auth/login', user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post('/auth/register', user);
    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure());
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

export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    // // to delete user from database add the following line and replace deleteUserSuccess(id) with deleteUserSuccess(res.data._id)
    // const res = await userRequest.delete(`/users/${id}`);
    dispatch(deleteUserSuccess());
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

export const getOrders = async (userId, dispatch) => {
  dispatch(getOrdersStart());
  try {
    const res = await userRequest.get(`/orders/${userId}`);
    dispatch(getOrdersSuccess(res.data));
  } catch (err) {
    dispatch(getOrdersFailure());
  }
};
