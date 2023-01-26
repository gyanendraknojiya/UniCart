import { Container, Box } from '@chakra-ui/react';
import React from 'react';
import Header from 'components/header';

const LayoutWrapper = ({ children }) => {
  return (
    <Box className="layout" bg="gray.100">
      <Header />
      <main>
        <Container maxW="6xl" className="mt-3">
          {children}
        </Container>
      </main>
    </Box>
  );
};

export default LayoutWrapper;
