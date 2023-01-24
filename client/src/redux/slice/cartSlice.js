import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import urls from 'config/urls.json';
import { del, get, patch, post } from 'utils/axios';

const initialState = {
  isLoading: false,
  cartItems: null,
};

export const getCartItems = createAsyncThunk('GET_CART_ITEMS', async (data, thunkAPI) => {
  const response = await get(urls.CART.GET_CART_ITEMS, thunkAPI);
  return response.data;
});

export const addToCart = createAsyncThunk('ADD_TO_CART', async (productId, thunkAPI) => {
  const response = await patch(urls.CART.ADD_TO_CART + productId, {}, thunkAPI);
  return response.data;
});

export const removeFromCart = createAsyncThunk('REMOVE_FROM_CART', async (productId, thunkAPI) => {
  const response = await del(urls.CART.REMOVE_FROM_CART + productId, {}, thunkAPI);
  return response.data;
});

export const removeProductFromCart = createAsyncThunk('REMOVE_PRODUCT_FROM_CART', async (productId, thunkAPI) => {
  const response = await del(urls.CART.REMOVE_PRODUCT_FROM_CART + productId, {}, thunkAPI);
  return response.data;
});

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      const { success, cartItems } = action.payload;
      if (success && cartItems?.length) {
        state.cartItems = cartItems;
      }
      state.isLoading = false;
    },
    [getCartItems.rejected]: (state, action) => {
      toast.error(action.payload?.message || 'Something went wrong', 3000);
      state.isLoading = false;
      state.cartItems = initialState.cartItems;
    },

    [addToCart.pending]: (state) => {
      state.isLoading = true;
    },
    [addToCart.fulfilled]: (state, action) => {
      const { success, cartItems } = action.payload;
      if (success && cartItems?.length) {
        state.cartItems = cartItems;
      } else {
        toast.error('Something went wrong!', 3000);
      }
      state.isLoading = false;
    },
    [addToCart.rejected]: (state, action) => {
      toast.error(action.payload?.message || 'Something went wrong', 3000);
      state.isLoading = false;
    },

    [removeFromCart.pending]: (state) => {
      state.isLoading = true;
    },
    [removeFromCart.fulfilled]: (state, action) => {
      const { success, cartItems } = action.payload;
      if (success && cartItems?.length) {
        state.cartItems = cartItems;
      } else {
        state.cartItems = [];
      }
      state.isLoading = false;
    },
    [removeFromCart.rejected]: (state, action) => {
      toast.error(action.payload?.message || 'Something went wrong', 3000);
      state.isLoading = false;
    },

    [removeProductFromCart.pending]: (state) => {
      state.isLoading = true;
    },
    [removeProductFromCart.fulfilled]: (state, action) => {
      const { success, cartItems } = action.payload;
      if (success && cartItems?.length) {
        state.cartItems = cartItems;
      } else {
        state.cartItems = [];
      }
      state.isLoading = false;
    },
    [removeProductFromCart.rejected]: (state, action) => {
      toast.error(action.payload?.message || 'Something went wrong', 3000);
      state.isLoading = false;
    },
  },
});

export default cartSlice.reducer;
