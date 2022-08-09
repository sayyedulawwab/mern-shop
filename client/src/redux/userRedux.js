import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    pending: false,
    error: false,
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
    registerStart: state => {
      state.pending = true;
    },
    registerSuccess: (state, action) => {
      state.pending = false;
      state.user = action.payload;
    },
    registerFailure: state => {
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
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
} = userSlice.actions;

export default userSlice.reducer;
