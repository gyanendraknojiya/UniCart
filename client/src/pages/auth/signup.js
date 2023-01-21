import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import { Button, Icon, Input, InputGroup, InputLeftElement, Stack } from '@chakra-ui/react';
import moment from 'moment';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BsCalendarDateFill, BsGenderAmbiguous } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SubmissionError, reduxForm } from 'redux-form';
import * as yup from 'yup';
import CustomInput from 'components/CustomInput';
import ROUTES from 'config/routes.json';
import AuthLayout from 'layouts/AuthLayout';
import { toggleLoader } from 'redux/slice/loaderSlice';
import { userSignup } from 'redux/slice/userSlice';
import { asyncValidate } from 'utils/asyncValidate';

const SignUp = ({ handleSubmit }) => {
  const [dob, setDob] = useState();
  const [gender, setGender] = useState('male');
  const navigate = useNavigate();
  const signupSuccess = useSelector((state) => state.user.signupSuccess);

  useEffect(() => {
    if (signupSuccess) navigate('/login');
  }, [signupSuccess]);

  const dispatch = useDispatch();

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleUserSubmit = async (values) => {
    const { password, confirmPassword } = values;

    if (!dob)
      throw new SubmissionError({
        confirmPassword: 'Please enter a valid date of birth',
        _error: 'Signup failed!',
      });

    if (password !== confirmPassword) {
      throw new SubmissionError({
        confirmPassword: 'Password and Confirm Password must be the same',
        _error: 'Signup failed!',
      });
    }
    dispatch(toggleLoader(true));
    await dispatch(userSignup({ ...values, dob: moment(dob).format('DD/MM/YYYY'), gender }));
    dispatch(toggleLoader(false));
  };

  return (
    <AuthLayout>
      <div className="max-w-sm w-full">
        <div className="fixed top-5 right-5 text-center text-gray-400">
          Already registered?
          <Button colorScheme="blackAlpha" size="sm" className="ml-3" onClick={() => navigate(ROUTES.LOGIN)}>
            Login
          </Button>
        </div>
        <form onSubmit={handleSubmit(handleUserSubmit)}>
          <Stack spacing={5}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaUserCircle} />
              </InputLeftElement>
              <CustomInput name="firstName" placeholder="First Name" type="text" style={{ paddingLeft: '40px' }} />
            </InputGroup>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaUserCircle} />
              </InputLeftElement>
              <CustomInput name="lastName" placeholder="Last Name" type="text" style={{ paddingLeft: '40px' }} />
            </InputGroup>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <EmailIcon />
              </InputLeftElement>
              <CustomInput name="email" placeholder="Email" type="email" style={{ paddingLeft: '40px' }} />
            </InputGroup>
            <div className="grid grid-cols-2 gap-4">
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <BsCalendarDateFill />
                </InputLeftElement>
                <Input
                  placeholder="Date of Birth"
                  disabled
                  style={{ opacity: 1 }}
                  value={dob && moment(dob).format('DD/MM/YYYY')}
                />
                <div className="absolute left-0 top-0">
                  <DatePicker
                    className="h-10 opacity-0"
                    selected={dob}
                    onChange={(date) => setDob(date)}
                    placeholder="Date of birth"
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    maxDate={Date.now()}
                  />
                </div>
              </InputGroup>
              <InputGroup>
                <div className="flex items-center justify-space border rounded-lg w-full space-x-2">
                  <BsGenderAmbiguous className="mx-2 " />
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      className="default:ring-3 mr-2"
                      value="male"
                      checked={gender === 'male'}
                      onChange={handleGenderChange}
                    />
                    Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      className="mr-2"
                      value="female"
                      checked={gender === 'female'}
                      onChange={handleGenderChange}
                    />
                    Female
                  </label>
                </div>
              </InputGroup>
            </div>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <LockIcon />
              </InputLeftElement>
              <CustomInput name="password" placeholder="Password" type="password" style={{ paddingLeft: '40px' }} />
            </InputGroup>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <LockIcon />
              </InputLeftElement>
              <CustomInput
                name="confirmPassword"
                placeholder="Confirm Password"
                type="password"
                style={{ paddingLeft: '40px' }}
              />
            </InputGroup>
            <div className="flex">
              <Button type="submit" colorScheme="blue" className="ml-auto">
                Sign Up
              </Button>
            </div>
          </Stack>
        </form>
      </div>
    </AuthLayout>
  );
};

const schema = yup.object().shape({
  email: yup.string().required('Required!').email('Please enter a valid email!'),
  password: yup.string().required('Required!').min(8).max(20),
  confirmPassword: yup.string().required('Required!').min(8).max(20),
  firstName: yup.string().required('Required!'),
  lastName: yup.string().required('Required!'),
});

export default reduxForm({
  form: 'signup',
  asyncValidate: (values) => asyncValidate(values, schema),
})(SignUp);
