import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import { Link } from 'react-router-dom';
import { routesPaths } from 'routerSettings/routesPaths';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import selectors from 'redux/selectors';
import { logoutUser } from 'redux/operations/operations-user';
import { toast } from 'react-toastify';

const ResponsiveAppBar = () => {
  const isAuth = useSelector(selectors.getIsAuth);
  const userName = useSelector(selectors.getUserName);
  const userEmail = useSelector(selectors.getUserEmail);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [navigation, setNavigation] = React.useState([]);
  const [userMenu, setUserMenu] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (isAuth) {
      setNavigation(['Home', 'Contacts']);
      setUserMenu(['Your contacts', 'Logout']);
    } else {
      setNavigation(['Home', 'Register', 'Login']);
      setUserMenu(['Login']);
    }
  }, [isAuth]);

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickNavButton = event => {
    const page = event.target.innerText;
    switch (page) {
      case 'HOME':
        navigate(routesPaths.homePage, { replace: true });
        break;
      case 'REGISTER':
        navigate(routesPaths.registerPage, { replace: true });
        break;
      case 'LOGIN':
        navigate(routesPaths.loginPage, { replace: true });
        break;
      case 'CONTACTS':
        navigate(routesPaths.contactsPage, { replace: true });

        break;

      default:
        return;
    }
  };

  const handleClickNavMenu = event => {
    const page = event.target.innerText;
    setAnchorElNav(null);
    switch (page) {
      case 'Home':
        navigate(routesPaths.homePage, { replace: true });
        break;
      case 'Register':
        navigate(routesPaths.registerPage, { replace: true });
        break;
      case 'Login':
        navigate(routesPaths.loginPage, { replace: true });
        break;
      case 'Contacts':
        navigate(routesPaths.contactsPage, { replace: true });
        break;

      default:
        return;
    }
  };

  const handleClickUserMenu = event => {
    const page = event.target.innerText;
    setAnchorElUser(null);
    switch (page) {
      case 'Login':
        navigate(routesPaths.loginPage, { replace: true });
        break;
      case 'Logout':
        dispatch(logoutUser())
          .unwrap()
          .then(() => {
            navigate(routesPaths.loginPage, { replace: true });
          })
          .catch(() => {
            toast.error(`Error, try again`);
          });

        break;
      case 'Your contacts':
        navigate(routesPaths.contactsPage, { replace: true });
        break;

      default:
        return;
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, mr: 2 }}>
            <Link to={routesPaths.homePage} style={{ color: 'white' }}>
              <ContactPhoneIcon fontSize="large" />
            </Link>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', sm: 'none' },
              }}
            >
              {navigation.map(page => (
                <MenuItem key={page} onClick={handleClickNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', sm: 'none' },
              mr: 1,
            }}
          >
            <Link to={routesPaths.homePage} style={{ color: 'white' }}>
              <ContactPhoneIcon fontSize="large" />
            </Link>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
            {navigation.map(page => (
              <Button
                key={page}
                onClick={handleClickNavButton}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {isAuth && (
              <Typography
                component="p"
                sx={{
                  display: { xs: 'none', sm: 'inline-block' },
                  fontSize: 16,
                  mr: 1,
                }}
              >
                Hello, {userName}
              </Typography>
            )}
            <Tooltip title="Open user menu">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="avatar picture" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {isAuth && (
                <Typography
                  textAlign="center"
                  component="p"
                  sx={{
                    fontSize: 16,
                    mx: 2,
                  }}
                >
                  {userEmail}
                </Typography>
              )}
              {userMenu.map(setting => (
                <MenuItem key={setting} onClick={handleClickUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
