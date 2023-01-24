import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const GetTotalCartValue = () => {
  const [totalCost, setTotalCost] = useState(0);
  const cartItems = useSelector((state) => state.cart.cartItems);
  useEffect(() => {
    if (cartItems?.length) {
      setTotalCost(cartItems.reduce((total, item) => total + item.productDetails.sellPrice * item.quantity, 0));
    } else {
      setTotalCost(0);
    }
  }, [cartItems]);
  return { totalCost };
};

export default GetTotalCartValue;
