import { Box, Button, Grid, GridItem, HStack, Heading } from '@chakra-ui/react';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { formValueSelector, reduxForm } from 'redux-form';
import * as yup from 'yup';
import Agreement from 'components/checkout/agreement';
import CustomInput from 'components/customInput';
import GetTotalCartValue from 'hooks/getTotalCartValue';
import PriceFormat from 'hooks/priceFormat';
import { checkoutCart } from 'redux/slice/cartSlice';
import { toggleLoader } from 'redux/slice/loaderSlice';
import { asyncValidate } from 'utils/asyncValidate';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_CLIENT);

const CheckoutForm = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const { formattedPrice } = PriceFormat();
  const { totalCost } = GetTotalCartValue();
  const stripe = useStripe();
  const elements = useElements();
  const country = useSelector((state) => formValueSelector('paymentDetails')(state, 'country'));

  const formFields = [
    {
      placeholder: 'First Name',
      name: 'firstName',
      type: 'text',
    },
    {
      placeholder: 'Last Name',
      name: 'lastName',
      type: 'text',
    },
    {
      placeholder: 'Address',
      name: 'address',
      type: 'text',
    },
    {
      placeholder: 'Zip',
      name: 'zip',
      type: 'number',
    },
    {
      placeholder: 'Country',
      name: 'country',
      field: CountryDropdown,
      className: 'w-full border p-2 rounded-lg',
    },
    {
      placeholder: 'State',
      name: 'state',
      field: RegionDropdown,
      className: 'w-full border p-2 rounded-lg',
      country,
    },
  ];

  const onSubmit = async (shippingDetails) => {
    if (elements == null) {
      return;
    }

    dispatch(toggleLoader(true));

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      toast.error(error.message, 3000);
      dispatch(toggleLoader(false));
      return;
    }
    dispatch(toggleLoader(false));
    dispatch(checkoutCart({ shippingDetails, paymentMethod: paymentMethod.id }));
  };
  return (
    <Box>
      <Heading fontSize="md">Shipping Address</Heading>

      <form className="my-5" onSubmit={handleSubmit(onSubmit)}>
        <Grid templateColumns="repeat(2, 1fr)" gap={2}>
          {formFields.map((field) => (
            <GridItem colSpan={1} key={field.name}>
              <CustomInput {...field} />
            </GridItem>
          ))}
        </Grid>

        <Box my="8">
          <Heading fontSize="md" my="5">
            Card Details
          </Heading>
          <Box className="border p-3 rounded-md">
            <CardElement />
          </Box>
        </Box>

        <HStack my="6" gap="6">
          <Button type="submit" colorScheme="purple" size="lg">
            Pay ${formattedPrice(totalCost)}
          </Button>
          <Agreement />
        </HStack>
      </form>
    </Box>
  );
};

const schema = yup.object().shape({
  firstName: yup.string().required('Required!'),
  lastName: yup.string().required('Required!'),
  address: yup.string().required('Required!'),
  zip: yup.string().required('Required!').min(5).max(10),
  country: yup.string().required('Required!'),
  state: yup.string().required('Required!'),
});

const CheckoutElement = reduxForm({
  form: 'paymentDetails',
  asyncValidate: (values) => asyncValidate(values, schema),
})(CheckoutForm);

const PaymentDetails = () => (
  <Elements stripe={stripePromise}>
    <CheckoutElement />
  </Elements>
);

export default PaymentDetails;
