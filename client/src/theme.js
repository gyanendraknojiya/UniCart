import { extendTheme } from '@chakra-ui/react';

const components = {
  Button: {
    baseStyle: {
      rounded: 'none',
    },
  },
};

const theme = extendTheme({
  fonts: {
    body: 'DM Sans, sans-serif',
    heading: 'DM Sans, sans-serif',
  },
  components,
});

export default theme;
