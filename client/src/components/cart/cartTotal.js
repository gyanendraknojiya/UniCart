import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, Button, Grid, GridItem, Icon, Text } from '@chakra-ui/react';
import { MdPayment } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ROUTES from 'config/routes.json';
import GetTotalCartValue from 'hooks/getTotalCartValue';
import PriceFormat from 'hooks/priceFormat';
import { toggleCheckoutModal } from 'redux/slice/cartSlice';

const CartTotal = () => {
  const dispatch = useDispatch();
  const { formattedPrice } = PriceFormat();
  const { totalCost } = GetTotalCartValue();

  const handleShowCheckoutButtonClick = () => {
    dispatch(toggleCheckoutModal(true));
  };

  return (
    <Box className="pb-6 fixed bottom-0 w-full bg-white" maxW="6xl">
      <hr className="mb-6" />
      <Grid templateColumns="repeat(12, 1fr)" gap={4}>
        <GridItem colSpan={7}>
          <Link to={ROUTES.HOMEPAGE}>
            <Button leftIcon={<ArrowBackIcon />} variant="ghost" size="sm">
              Continue Shopping
            </Button>
          </Link>
        </GridItem>
        <GridItem colSpan={3} className="flex items-center">
          <Box>
            <Text>
              Total cost:
              <Text as="b" className="ml-2">
                ${formattedPrice(totalCost)}
              </Text>
            </Text>
            <Text className="text-end" fontSize="xs" color="gray.400">
              Inclusive all taxes
            </Text>
          </Box>
        </GridItem>
        <GridItem colSpan={2} className="text-end">
          <Button
            colorScheme="yellow"
            rightIcon={<Icon as={MdPayment} w={6} h={6} />}
            onClick={handleShowCheckoutButtonClick}
          >
            Checkout
          </Button>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default CartTotal;
