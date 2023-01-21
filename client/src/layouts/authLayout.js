import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AuthLayout = ({ children }) => {
  const userDetails = useSelector((state) => state.user.userDetails);
  const navigate = useNavigate();

  useEffect(() => {
    if (userDetails) navigate('/');
  }, [userDetails]);

  return (
    <>
      <div
        style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/looking-stars.jpg)` }}
        className="bg-center bg-cover bg-no-repeat  h-screen w-screen text-white"
      >
        <div className="bg-gradient-to-b from-gray-900 to-gray-700 h-full w-full opacity-95 flex items-center justify-center p-2">
          {children}
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
