import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Checkout from 'components/checkout';
import Loading from 'components/loader';
import Loader from 'components/loader/loader';
import ROUTES from 'config/routes.json';
import AuthValidator from 'hooks/authValidator';
import Login from 'pages/auth/login';
import SignUp from 'pages/auth/signup';
import Cart from 'pages/cart';
import Homepage from 'pages/homepage';
import { getCartItems } from 'redux/slice/cartSlice';

const App = () => {
  const [loading, userAuth] = AuthValidator();
  const dispatch = useDispatch();
  const AuthRoute = ({ children }) => {
    if (!userAuth) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  useEffect(() => {
    if (userAuth) {
      dispatch(getCartItems());
    }
  }, [userAuth]);

  return (
    <BrowserRouter>
      <Loader />
      <Checkout />
      {loading ? (
        <Loading />
      ) : (
        <Routes>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
          <Route
            path={ROUTES.CART}
            element={
              <AuthRoute>
                <Cart />
              </AuthRoute>
            }
          />
          <Route
            path={ROUTES.HOMEPAGE}
            element={
              <AuthRoute>
                <Homepage />
              </AuthRoute>
            }
          />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;
