import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
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
import { loginUser } from 'redux/operations/operations-user';
import selectors from 'redux/selectors';
import { LoaderButton } from 'components/LoaderButton';

const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectors.getIsLoading);
  const [values, setValues] = React.useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = React.useState({
    email: '',
    password: '',
  });

  const validationField = (name, value) => {
    if (!value) {
      setErrors({
        ...errors,
        [name]: `${name} is required`,
      });
      return false;
    }
    setErrors({
      ...errors,
      [name]: ``,
    });
    return true;
  };
  const handleChange = event => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get('email'),
      password: data.get('password'),
    };

    if (
      validationField('email', userData.email) &&
      validationField('password', userData.password)
    ) {
      try {
        await dispatch(loginUser(userData)).unwrap();
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ my: 3 }}
          >
            <TextField
              margin="normal"
              error={!!errors.email}
              helperText={errors.email}
              required
              fullWidth
              id="email"
              name="email"
              value={values.email}
              label="Email Address"
              autoComplete="email"
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              error={!!errors.password}
              helperText={errors.password}
              required
              fullWidth
              id="password"
              name="password"
              value={values.password}
              type="password"
              label="Password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <Button
              component="a"
              href={`${process.env.REACT_APP_BASE_API_URL}/auth/google`}
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
              {isLoading ? <LoaderButton /> : 'Sign In'}
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link to={routesPaths.registerPage}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
