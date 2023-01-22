import { Box, Container, Grid, GridItem, Heading, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import EmptyCart from 'components/cart//emptyCart';
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
      {/* Render cart items */}
      <Stack spacing="4" className="mt-10">
        {cartItems?.length ? (
          cartItems.map((item, index) => <CartItem key={item.id} index={index} {...item}></CartItem>)
        ) : (
          <EmptyCart />
        )}
      </Stack>
      {/* Cart total */}
    </div>
  );
};

export default ViewCart;
