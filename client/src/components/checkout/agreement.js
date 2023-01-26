import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import ROUTES from 'config/routes.json';

const Agreement = () => {
  return (
    <Flex>
      <Text fontSize="sm">
        By clicking on &quot;Pay&quot;, you agree to the our
        <Link className="text-blue-600 ml-1" to={ROUTES.TERMS_AND_CONDITIONS}>
          terms and conditions
        </Link>
        .
      </Text>
    </Flex>
  );
};

export default Agreement;
