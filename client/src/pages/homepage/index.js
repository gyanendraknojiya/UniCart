import React from 'react';
import { useDispatch } from 'react-redux';
import Products from 'components/product';
import LayoutWrapper from 'layouts/layoutWrapper';

const Homepage = () => {
  const dispatch = useDispatch();
  return (
    <LayoutWrapper>
      <Products />
    </LayoutWrapper>
  );
};

export default Homepage;
