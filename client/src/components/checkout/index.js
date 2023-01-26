import {
  Card,
  CardBody,
  CardHeader,
  Grid,
  GridItem,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import PaymentDetails from 'components/checkout/paymentDetails';
import { toggleCheckoutModal } from 'redux/slice/cartSlice';

const Checkout = () => {
  const dispatch = useDispatch();

  const showCheckoutModal = useSelector((state) => state.cart.showCheckoutModal);

  const onClose = () => {
    dispatch(toggleCheckoutModal(false));
  };

  return (
    <Modal isOpen={showCheckoutModal} closeOnOverlayClick={false} onClose={onClose} size="5xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <Grid templateColumns="repeat(5, 1fr)">
          <GridItem colSpan={3} className="rounded-l-md">
            <Card>
              <CardHeader>
                <Text fontSize="lg" as="b">
                  Checkout
                </Text>
              </CardHeader>
              <CardBody>
                <PaymentDetails />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem colSpan={2} bg="gray.100" className="rounded-r-md " />
        </Grid>
      </ModalContent>
    </Modal>
  );
};

export default Checkout;
