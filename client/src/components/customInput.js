import { Input } from '@chakra-ui/react';
import React from 'react';
import { Field } from 'redux-form';

const renderField = ({ input, meta: { touched, error }, ...props }) => {
  return (
    <div className="w-full">
      <Input {...input} {...props} isInvalid={touched && error} />
      {touched && error && <div className="text-red-500 text-sm mt-2">{error}</div>}
    </div>
  );
};

const CustomInput = (props) => {
  return <Field {...props} component={renderField} />;
};

export default CustomInput;
