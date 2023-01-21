import { Container } from '@chakra-ui/react';
import React from 'react';
import Header from 'components/Header';

const LayoutWrapper = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main>
        <Container maxW="6xl" className="mt-3">
          {children}
        </Container>
      </main>
    </div>
  );
};

export default LayoutWrapper;
