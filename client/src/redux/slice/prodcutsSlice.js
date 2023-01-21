import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import urls from 'config/urls.json';
import { get, post } from 'utils/axios';

export const getProductsList = createAsyncThunk('GET_PRODUCTS_LIST', async (data, thunkAPI) => {
  const response = await get(urls.GET_PRODUCTS_LIST, thunkAPI);
  return response.data;
});

const initialState = {
  isLoading: false,
  list: null,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: {
    [getProductsList.pending]: (state) => {
      state.isLoading = true;
    },
    [getProductsList.fulfilled]: (state, action) => {
      const { success, products } = action.payload;
      if (success && products?.length) {
        state.list = products;
      } else {
        toast.error('Something went wrong!', 3000);
      }
      state.isLoading = false;
    },
    [getProductsList.rejected]: (state, action) => {
      toast.error(action.payload?.message, 3000);
      state.isLoading = false;
    },
  },
});

export default productsSlice.reducer;
