import { Icon } from '@chakra-ui/icons';
import { Avatar, AvatarBadge, Box, Button, Container, Image } from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import logo from 'assets/logo.png';
import ROUTES from 'config/routes.json';
import { logout } from 'redux/slice/userSlice';

const Header = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user.userDetails);

  const navigate = useNavigate();

  const handleLogout = () => dispatch(logout());
  const handleGoToCart = () => navigate(ROUTES.CART);

  return (
    <Box className="sticky top-0 z-50 border-b-2" bg="white">
      <Container maxW="6xl">
        <nav className="flex py-2 items-center">
          <Link to={ROUTES.HOMEPAGE}>
            <Image src={logo} alt="logo" className="h-12" />
          </Link>
          <Box className="ml-auto flex items-center">
            <Button className="mr-4" colorScheme="purple" variant="ghost">
              {userDetails.firstName}
              <Avatar className="ml-2" size="sm">
                <AvatarBadge boxSize="1.25em" bg="green.500" />
              </Avatar>
            </Button>
            <Button colorScheme="red" variant="ghost" onClick={handleLogout}>
              <Icon as={FiLogOut} className="mr-2" /> Log out
            </Button>
            <Button onClick={handleGoToCart}>
              <Icon as={FaShoppingCart} className="mr-2" /> CART
            </Button>
          </Box>
        </nav>
      </Container>
    </Box>
  );
};

export default Header;
