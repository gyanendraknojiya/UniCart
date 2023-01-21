import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import App from 'App';
import { store } from 'redux/store';
import reportWebVitals from 'reportWebVitals';
import theme from 'theme';
import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/dm-sans';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <ToastContainer position="top-center" autoClose={3000} closeOnClick pauseOnHover theme="colored" />
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
