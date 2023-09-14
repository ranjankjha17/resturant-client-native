import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    userID: null,
    error: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userID = action.payload;
      state.error = null;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userID = null;
      state.error = null;
    },
    loginFailure: (state, action) => {   
      state.error = action.payload;
    },
  },
});

export const { login, logout,loginFailure } = authSlice.actions;
export default authSlice.reducer;
