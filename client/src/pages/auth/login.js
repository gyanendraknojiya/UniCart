import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import { Button, InputGroup, InputLeftElement, Stack } from '@chakra-ui/react';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import * as yup from 'yup';
import CustomInput from 'components/customInput';
import ROUTES from 'config/routes.json';
import AuthLayout from 'layouts/authLayout';
import { toggleLoader } from 'redux/slice/loaderSlice';
import { userLogin } from 'redux/slice/userSlice';
import { asyncValidate } from 'utils/asyncValidate';

const Login = ({ handleSubmit }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (values) => {
    dispatch(toggleLoader(true));
    await dispatch(userLogin(values));
    dispatch(toggleLoader(false));
  };

  return (
    <AuthLayout>
      <div className="max-w-sm w-full">
        <div className="fixed top-5 right-5 text-center text-gray-400">
          Not a member?
          <Button colorScheme="blackAlpha" size="sm" className="ml-3" onClick={() => navigate(ROUTES.SIGN_UP)}>
            Sign Up
          </Button>
        </div>
        <form onSubmit={handleSubmit(handleLogin)}>
          <GoogleLogin
            clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
            buttonText="Login"
            disabled
            className="w-full"
            cookiePolicy={'single_host_origin'}
          />
          <div className="text-center my-2">or</div>
          <Stack spacing={5}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <EmailIcon />
              </InputLeftElement>
              <CustomInput name="email" placeholder="Email" type="email" style={{ paddingLeft: '40px' }} />
            </InputGroup>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <LockIcon />
              </InputLeftElement>
              <CustomInput name="password" placeholder="Password" type="password" style={{ paddingLeft: '40px' }} />
            </InputGroup>
            <div className="flex">
              <Button type="submit" colorScheme="blue" className="ml-auto">
                Login
              </Button>
            </div>
          </Stack>
        </form>
        <div className="fixed bottom-10 left-0 right-0 text-center ">
          <Button variant="link" size="sm">
            Forgot your password?
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
};

const schema = yup.object().shape({
  email: yup.string().required('Required!').email('Please enter a valid email!'),
  password: yup.string().required('Required!').min(8).max(20),
});

export default reduxForm({
  form: 'login',
  asyncValidate: (values) => asyncValidate(values, schema),
})(Login);
