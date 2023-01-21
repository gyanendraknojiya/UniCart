import { Box, Button, Image, Stack, Text } from '@chakra-ui/react';
import { FaCartPlus } from 'react-icons/fa';
import { TbHandClick } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ROUTES from 'config/routes.json';
import { addToCart } from 'redux/slice/cartSlice';
import { discountPercent } from 'utils/discountCalculator';

const ProductCard = ({ id, title, featureImage, category, mrp, sellPrice }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);

  const isAddedToCart = () => cartItems?.length && cartItems.find((item) => item.id === id);

  const addToCartHandler = () => {
    if (isAddedToCart()) return navigate(ROUTES.CART);
    dispatch(addToCart(id));
  };
  return (
    <Box className="bg-gray-100 rounded-lg p-3">
      <Image
        src={featureImage}
        alt={title}
        className="w-full aspect-square object-contain bg-gray-200 rounded-sm my-3"
      />
      <Stack spacing={2}>
        <Text fontSize="xs">{category}</Text>
        <Text fontSize="md" noOfLines={2}>
          {title}
        </Text>
        <Box>
          <Text fontSize="xs">Price:</Text>
          <Text>
            <strong>${mrp}</strong> <small className="line-through text-gray-500 ">${sellPrice}</small>
            <span className="text-green-500 ml-2">{discountPercent(mrp, sellPrice)}% off</span>
          </Text>
        </Box>
        <Stack spacing={4} direction="row" align="left">
          <Button className="text-white" variant="outline" colorScheme="blue" leftIcon={<TbHandClick />} size="xs">
            <span className="mt-1">VIEW</span>
          </Button>
          <Button colorScheme="green" rightIcon={<FaCartPlus />} size="xs" onClick={addToCartHandler}>
            <span className="mt-1">{isAddedToCart() ? 'GO TO CART ' : 'ADD TO CART'}</span>
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ProductCard;