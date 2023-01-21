import { configureStore } from '@reduxjs/toolkit';
import { reducer as formReducer } from 'redux-form';
import cartSlice from './slice/cartSlice';
import loaderSlice from './slice/loaderSlice';
import productsSlice from './slice/prodcutsSlice';
import userSlice from './slice/userSlice';

export const store = configureStore({
  reducer: { user: userSlice, loader: loaderSlice, products: productsSlice, cart: cartSlice, form: formReducer },
  devTools: process.env.NODE_ENV !== 'production',
});
