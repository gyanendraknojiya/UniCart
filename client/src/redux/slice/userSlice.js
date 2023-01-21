import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import urls from 'config/urls.json';
import { get, post } from 'utils/axios';

export const userSignup = createAsyncThunk('USER_SIGNUP', async (data, thunkAPI) => {
  const response = await post(urls.USER_SIGNUP, data, thunkAPI);
  return response.data;
});

export const userLogin = createAsyncThunk('USER_LOGIN', async (data, thunkAPI) => {
  const response = await post(urls.USER_LOGIN, data, thunkAPI);
  return response.data;
});

export const getUserProfile = createAsyncThunk('GET_USER_PROFILE', async (data, thunkAPI) => {
  const response = await get(urls.GET_USER_PROFILE, thunkAPI);
  return response.data;
});

const initialState = {
  isLoading: false,
  signupSuccess: false,
  userDetails: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoading = true;
      localStorage.removeItem('token');
      toast.success('Logout successful!', 3000);
      window.location.href = '/login';
    },
  },
  extraReducers: {
    [userSignup.pending]: (state) => {
      state.isLoading = true;
      state.signupSuccess = false;
    },
    [userSignup.fulfilled]: (state, action) => {
      const { success, message } = action.payload;
      if (success) {
        toast.success(message, 3000);
        state.signupSuccess = true;
      } else {
        toast.error('Something went wrong!', 3000);
      }
      state.isLoading = false;
    },
    [userSignup.rejected]: (state, action) => {
      toast.error(action.payload.message, 3000);
      state.isLoading = false;
      state.signupSuccess = false;
    },
    [userLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [userLogin.fulfilled]: (state, action) => {
      const { token, message, data } = action.payload;
      if (token && data) {
        state.userDetails = data;
        localStorage.setItem('token', token);
        toast.success(message, 3000);
      } else {
        toast.error('Something went wrong!', 3000);
      }
      state.isLoading = false;
    },
    [userLogin.rejected]: (state, action) => {
      toast.error(action.payload.message, 3000);
      state.isLoading = false;
    },

    [getUserProfile.pending]: (state) => {
      state.isLoading = true;
    },
    [getUserProfile.fulfilled]: (state, action) => {
      const { success, data } = action.payload;
      if (success && data) {
        state.userDetails = data;
      } else {
        toast.error('Something went wrong!', 3000);
      }
    },
    [getUserProfile.rejected]: (state, action) => {
      localStorage.removeItem('token');
      toast.error(action.payload?.message, 3000);
      state.isLoading = false;
    },
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
