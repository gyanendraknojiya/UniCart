import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Loading from './components/loader/Index';
import AuthValidator from './hooks/AuthValidator';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/Signup';
import Cart from './pages/cart/Index';
import Homepage from './pages/homepage/Index';
import { getCartItems } from './redux/slice/cartSlice';
import ROUTES from 'config/routes.json';

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
