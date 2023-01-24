import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, Button, Grid, GridItem, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import ROUTES from 'config/routes.json';
import GetTotalCartValue from 'hooks/getTotalCartValue';
import PriceFormat from 'hooks/priceFormat';

const CartTotal = () => {
  const { formattedPrice } = PriceFormat();
  const { totalCost } = GetTotalCartValue();
  return (
    <Box className="mt-3 mb-10">
      <Grid templateColumns="repeat(12, 1fr)" gap={4}>
        <GridItem colSpan={7}>
          <Link to={ROUTES.HOMEPAGE}>
            <Button leftIcon={<ArrowBackIcon />} variant="ghost" size="sm">
              Continue Shopping
            </Button>
          </Link>
        </GridItem>
        <GridItem colSpan={3}>
          Total cost: <Text as="b">${formattedPrice(totalCost)}</Text>
        </GridItem>
        <GridItem colSpan={2} className="text-end">
          <Button colorScheme="yellow">Checkout</Button>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default CartTotal;
