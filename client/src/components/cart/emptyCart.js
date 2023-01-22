import { Box, Button, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import EmptyCartImg from 'assets/empty-cartpng.png';
import ROUTES from 'config/routes.json';

const EmptyCart = () => {
  return (
    <Box className="text-center" p={5}>
      <Text as="b" color="gray.600">
        Your cart is empty
      </Text>
      <Image src={EmptyCartImg} alt="empty-cart" height={120} className="mx-auto my-5" />
      <Text fontSize="xs" color="gray.500">
        Add something to make me happy...
      </Text>
      <Link to={ROUTES.HOMEPAGE}>
        <Button className="mt-5">Continue Shopping</Button>
      </Link>
    </Box>
  );
};

export default EmptyCart;
