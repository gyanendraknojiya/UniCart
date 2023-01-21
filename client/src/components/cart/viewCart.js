import { Box, Container, Grid, GridItem, Heading, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from 'components/cart/cartItem';

const ViewCart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  return (
    <div className="mt-10">
      <Stack spacing="3">
        <Text fontSize="2xl" as="b">
          Shopping Cart
        </Text>
        <Text>Complete your payment</Text>
      </Stack>
      <Stack spacing="4" className="mt-10">
        {cartItems?.map((item) => (
          <CartItem key={item.id} {...item}></CartItem>
        ))}
      </Stack>
    </div>
  );
};

export default ViewCart;
