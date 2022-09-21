import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import GoogleIcon from '@mui/icons-material/Google';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { routesPaths } from 'routerSettings/routesPaths';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from 'redux/operations/operations-user';
import selectors from 'redux/selectors';
import { LoaderButton } from 'components/LoaderButton';

const theme = createTheme();

const NAME_REGEX = /^[A-z][A-z0-9-_-\s?]{1,23}$/;
const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

export default function SignUp() {
  const isLoading = useSelector(selectors.getIsLoading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = React.useState({
    name: '',
    email: '',
    password: '',
    showPassword: false,
  });
  const [errors, setErrors] = React.useState({
    name: '',
    email: '',
    password: '',
  });

  const validationField = (name, value, regex) => {
    if (value.match(regex)) {
      setValues({
        ...values,
        [name]: value,
      });
      setErrors({
        ...errors,
        [name]: '',
      });
      return true;
    } else {
      if (value) {
        setValues({
          ...values,
          [name]: value,
        });
        setErrors({
          ...errors,
          [name]: `wrong ${name}`,
        });
        return false;
      } else {
        setValues({
          ...values,
          [name]: value,
        });
        setErrors({
          ...errors,
          [name]: `${name} is required`,
        });
        return false;
      }
    }
  };
  const handleChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        validationField(name, value, NAME_REGEX);
        break;
      case 'email':
        validationField(name, value, EMAIL_REGEX);
        break;
      case 'password':
        validationField(name, value, PWD_REGEX);
        break;
      default:
        return;
    }
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
    };

    if (
      validationField('name', userData.name, NAME_REGEX) &&
      validationField('email', userData.email, EMAIL_REGEX) &&
      validationField('password', userData.password, PWD_REGEX)
    ) {
      try {
        await dispatch(registerUser(userData)).unwrap();
        navigate(routesPaths.contactsPage);
      } catch (error) {
        console.warn(error);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ my: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={!!errors.name}
                  helperText={errors.name}
                  required
                  fullWidth
                  id="name"
                  name="name"
                  value={values.name}
                  type="text"
                  label="Your name"
                  autoComplete="name"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={!!errors.email}
                  helperText={errors.email}
                  required
                  fullWidth
                  id="email"
                  name="email"
                  value={values.email}
                  type="email"
                  label="Email Address"
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sx={{ position: 'relative' }}>
                <TextField
                  error={!!errors.password}
                  helperText={
                    errors.password
                      ? 'Must be greater then 6 characters and contains letter and number'
                      : errors.password
                  }
                  required
                  fullWidth
                  id="password"
                  name="password"
                  value={values.password}
                  type={values.showPassword ? 'text' : 'password'}
                  label="Password"
                  autoComplete="password"
                  onChange={handleChange}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    right: '20px',
                    top: '23px',
                  }}
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </Grid>
            </Grid>

            <Button
              component="a"
              href={`${process.env.REACT_APP_BASE_API_URL}/users/google`}
              fullWidth
              color="error"
              variant="contained"
              startIcon={<GoogleIcon />}
              sx={{ pt: 1, pb: 1, mt: 3, mb: 2 }}
            >
              Sign In with Google
            </Button>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ pt: 1, pb: 1, mb: 2 }}
            >
              {isLoading ? <LoaderButton /> : 'Sign Up'}
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link to={routesPaths.loginPage}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
