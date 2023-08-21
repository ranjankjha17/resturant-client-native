// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const addNewLogin = (credentials) => async (dispatch) => {
//   try {
//     dispatch(loginRequest());
//     const response = await axios.post('https://resturant-server-mssql.vercel.app/api/login', credentials);
//     const { token } = response.data;
//     await AsyncStorage.setItem('token', token);
//     dispatch(loginSuccess(token));
//   } catch (error) {
//     dispatch(loginFailure(error.response.data.message));
//     throw new Error(error.response.data.message);
//   }
// };

// export const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     isLoading: false,
//     isLoggedIn: false,
//     error: null,
//     user: null,
//   },
//   reducers: {
//     loginRequest: (state) => {
//       state.isLoading = true;
//       state.error = null;
//     },
//     loginSuccess: (state, action) => {
//       state.isLoading = false;
//       state.isLoggedIn = true;
//       state.user = action.payload;
//     },
//     loginFailure: (state, action) => {
//       state.isLoading = false;
//       state.isLoggedIn = false;
//       state.error = action.payload;
//     },
//     login: (state, action) => {
//       state.isLoggedIn = true;
//       state.email = action.payload.email;
//     },
//     logout: (state) => {
//       state.isLoggedIn = false;
//       state.user = null;
//     },
//   },
// });

// export const { login, loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;
// export default authSlice.reducer;
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
