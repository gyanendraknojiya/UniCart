import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from 'redux/slice/userSlice';

const AuthValidator = () => {
  const [loading, setLoading] = useState(true);
  const [userAuth, setUserAuth] = useState(false);

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);
  const userDetails = useSelector((state) => state.user.userDetails);

  const verifyUser = async () => {
    if (!userDetails) await dispatch(getUserProfile());
    setUserAuth(true);
    setLoading(false);
  };

  useEffect(() => {
    if (isLoading) return;
    const token = localStorage.getItem('token');
    if (token) {
      verifyUser();
    } else {
      setUserAuth(false);
      setLoading(false);
    }
  }, [isLoading, userDetails]);

  return [loading, userAuth];
};

export default AuthValidator;
