import React from 'react';
import { useSelector } from 'react-redux';
import Loading from './index';

const Loader = () => {
  const isLoading = useSelector((state) => state.loader.isLoading);
  return isLoading && <Loading />;
};

export default Loader;
