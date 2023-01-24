import { Box, Container, Grid, GridItem, Heading, Stack, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from 'components/cart/cartItem';
import CartTotal from 'components/cart/cartTotal';
import EmptyCart from 'components/cart/emptyCart';
import { toggleLoader } from 'redux/slice/loaderSlice';

const ViewCart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const isLoading = useSelector((state) => state.cart.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleLoader(isLoading));
  }, [isLoading]);

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
          <Box>
            {cartItems.map((item, index) => (
              <CartItem key={item.id} index={index} {...item}></CartItem>
            ))}
            {/* Cart total */}
            <hr className="my-2" />
            <CartTotal />
          </Box>
        ) : (
          <EmptyCart />
        )}
      </Stack>
    </div>
  );
};

export default ViewCart;
