import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { connect, useSelector } from 'react-redux';
import { formValueSelector, reduxForm } from 'redux-form';
import * as yup from 'yup';
import CustomInput from 'components/customInput';
import { asyncValidate } from 'utils/asyncValidate';

const Details = ({ title, formName }) => {
  const country = useSelector((state) => formValueSelector(formName)(state, 'country'));
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

  return (
    <Box>
      <Text as="b">{title}</Text>
      <form className="my-5">
        <Grid templateColumns="repeat(2, 1fr)" gap={2}>
          {formFields.map((field) => (
            <GridItem colSpan={1} key={field.name}>
              <CustomInput {...field} />
            </GridItem>
          ))}
        </Grid>
      </form>
    </Box>
  );
};

const schema = yup.object().shape({
  email: yup.string().required('Required!').email('Please enter a valid email!'),
  password: yup.string().required('Required!').min(8).max(20),
});

// to set form name dynamic
const mapStateToProps = (_, { formName }) => ({
  form: formName,
});

const reduxFormComponent = reduxForm({
  asyncValidate: (values) => asyncValidate(values, schema),
});

export default connect(mapStateToProps)(reduxFormComponent(Details));
