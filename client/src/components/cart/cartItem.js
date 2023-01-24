import { Box, Button, Grid, GridItem, HStack, Image, Input, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import PriceFormat from 'hooks/priceFormat';
import { addToCart, removeFromCart, removeProductFromCart } from 'redux/slice/cartSlice';
import { discountPercent } from 'utils/discountCalculator';

const CartItem = ({ id, productDetails, quantity, index }) => {
  const { title, featureImage, category, mrp, sellPrice } = productDetails;

  const { formattedPrice } = PriceFormat();

  const dispatch = useDispatch();

  const handleIncreaseProductQuantity = () => {
    dispatch(addToCart(id));
  };

  const handleDecreaseProductQuantity = () => {
    if (quantity <= 1) return;
    dispatch(removeFromCart(id));
  };

  const handleRemoveProduct = () => {
    dispatch(removeProductFromCart(id));
  };

  return (
    <Grid templateColumns="repeat(16, 1fr)" gap={6} className="p-2 rounded-md bg-gray-50">
      <GridItem colSpan={2}>
        <Image src={featureImage} alt={title} className="w-full aspect-square object-contain bg-gray-200 rounded-sm" />
      </GridItem>
      <GridItem colSpan={7} className="pt-2">
        <Text fontSize="md" as="b" color="gray.600" noOfLines={2}>
          {title}
        </Text>
        <Text className="text-gray-500">{category}</Text>
      </GridItem>
      <GridItem colSpan={3} className="flex items-center justify-center">
        <HStack maxW="320px">
          <Button onClick={handleIncreaseProductQuantity}>+</Button>
          <Input htmlSize={2} value={quantity} />
          <Button onClick={handleDecreaseProductQuantity}>-</Button>
        </HStack>
      </GridItem>
      <GridItem colSpan={2} className="flex items-center justify-center">
        <Button colorScheme="red" onClick={handleRemoveProduct}>
          Remove
        </Button>
      </GridItem>
      <GridItem colSpan={2} className="flex items-center justify-end">
        <Stack className="text-right">
          <Text as="s" className="text-gray-500" fontSize="xs">
            ${formattedPrice(mrp)}
          </Text>
          <Text as="b" fontSize="lg" color="gray.600">
            ${formattedPrice(sellPrice)}
          </Text>

          <Text color="green">{discountPercent(mrp, sellPrice)}% off</Text>
        </Stack>
      </GridItem>
    </Grid>
  );
};

export default CartItem;
