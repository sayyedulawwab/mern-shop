import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: state => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: state => {
      state.isFetching = false;
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
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
} = userSlice.actions;

export default userSlice.reducer;
