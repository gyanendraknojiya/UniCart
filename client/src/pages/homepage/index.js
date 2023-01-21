import React from 'react';
import { useDispatch } from 'react-redux';
import Products from 'components/product/Index';
import LayoutWrapper from 'layouts/LayoutWrapper';

const Homepage = () => {
  const dispatch = useDispatch();
  return (
    <LayoutWrapper>
      <Products />
    </LayoutWrapper>
  );
};

export default Homepage;
