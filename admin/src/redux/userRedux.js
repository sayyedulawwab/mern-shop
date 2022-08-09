import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    pending: false,
    error: false,
    users: [],
  },
  reducers: {
    loginStart: state => {
      state.pending = true;
    },
    loginSuccess: (state, action) => {
      state.pending = false;
      state.currentUser = action.payload;
    },
    loginFailure: state => {
      state.pending = false;
      state.error = true;
    },
    logoutStart: state => {
      state.pending = true;
    },
    logoutSuccess: state => {
      state.pending = false;
      state.currentUser = null;
    },
    logoutFailure: state => {
      state.pending = false;
      state.error = true;
    },
    //GET ALL
    getUsersStart: state => {
      state.pending = true;
      state.error = false;
    },
    getUsersSuccess: (state, action) => {
      state.pending = false;
      state.users = action.payload;
    },
    getUsersFailure: state => {
      state.pending = false;
      state.error = true;
    },
    //DELETE
    deleteUserStart: state => {
      state.pending = true;
      state.error = false;
    },
    deleteUserSuccess: (state, action) => {
      state.pending = false;
      state.users.splice(
        state.users.findIndex(item => item._id === action.payload),
        1
      );
    },
    deleteUserFailure: state => {
      state.pending = false;
      state.error = true;
    },
    //UPDATE
    updateUserStart: state => {
      state.pending = true;
      state.error = false;
    },
    updateUserSuccess: (state, action) => {
      state.pending = false;
      state.users[
        state.users.findIndex(user => user._id === action.payload.id)
      ] = action.payload;
    },
    updateUserFailure: state => {
      state.pending = false;
      state.error = true;
    },
    //CREATE
    addUserStart: state => {
      state.pending = true;
      state.error = false;
    },
    addUserSuccess: (state, action) => {
      state.pending = false;
      state.users.push(action.payload);
    },
    addUserFailure: state => {
      state.pending = false;
      state.error = true;
    },
  },
});

export const {
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
  logoutStart,
  logoutSuccess,
  logoutFailure,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;
