import { Box, Button, Card, CardBody, Grid, GridItem, HStack, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { BsFillCartCheckFill } from 'react-icons/bs';
import { FaCartPlus } from 'react-icons/fa';
import { TbHandClick } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ROUTES from 'config/routes.json';
import PriceFormat from 'hooks/priceFormat';
import { addToCart } from 'redux/slice/cartSlice';
import { discountPercent } from 'utils/discountCalculator';

const ProductCard = ({ id, title, featureImage, category, mrp, sellPrice }) => {
  const { formattedPrice } = PriceFormat();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);

  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const isAddedToCart = cartItems?.length && cartItems.find((item) => item.id === id);

  const addToCartHandler = async () => {
    if (isAddedToCart) return navigate(ROUTES.CART);
    setIsButtonLoading(true);
    await dispatch(addToCart(id));
    setIsButtonLoading(false);
  };

  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          src={featureImage}
          alt={title}
          className="w-full aspect-square object-contain bg-gray-100 p-1"
          borderRadius="lg"
        />
        <Stack spacing="3" mt="6">
          <Text fontSize="xs">{category}</Text>
          <Heading fontSize="md" noOfLines={2}>
            {title}
          </Heading>
          <Box>
            <Text fontSize="xs">Price:</Text>
            <Text fontSize="lg" as="b">
              ${formattedPrice(sellPrice)}
            </Text>

            <HStack>
              <Text as="s" fontSize="xs" color="gray.500">
                ${formattedPrice(mrp)}
              </Text>
              <Text fontSize="xs" color="green" className="ml-2">
                {discountPercent(mrp, sellPrice)}% off
              </Text>
            </HStack>
          </Box>
          <Grid templateColumns="repeat(3, 1fr)" gap="3">
            <GridItem colSpan={1}>
              <Button
                w="full"
                className="text-white"
                size="sm"
                variant="outline"
                colorScheme="blue"
                leftIcon={<TbHandClick />}
              >
                <Text fontSize="xs">VIEW</Text>
              </Button>
            </GridItem>
            <GridItem colSpan={2}>
              <Button
                size="sm"
                isLoading={isButtonLoading}
                colorScheme={isAddedToCart ? 'teal' : 'blue'}
                rightIcon={isAddedToCart ? <BsFillCartCheckFill /> : <FaCartPlus />}
                onClick={addToCartHandler}
                w="full"
              >
                <Text fontSize="xs">{isAddedToCart ? 'GO TO CART ' : 'ADD TO CART'}</Text>
              </Button>
            </GridItem>
          </Grid>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
