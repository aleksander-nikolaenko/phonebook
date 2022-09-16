import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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
var CryptoJS = require('crypto-js');

const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectors.getIsLoading);
  const [values, setValues] = React.useState({
    email: '',
    password: '',
    checkedRemember: false,
  });

  const [errors, setErrors] = React.useState({
    email: '',
    password: '',
  });

  React.useEffect(() => {
    if (localStorage.getItem('savedUser')) {
      const receivedData = localStorage.getItem('savedUser');
      const bytes = CryptoJS.AES.decrypt(receivedData, 'savedUser');
      const decryptedData = JSON.parse(
        JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
      );
      const { email, password, checkedRemember } = decryptedData;
      setValues({
        ...values,
        email,
        password,
        checkedRemember,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
  const handleRememberChange = event => {
    setValues({ ...values, checkedRemember: event.target.checked });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get('email'),
      password: data.get('password'),
    };
    const savedData = JSON.stringify({
      ...userData,
      checkedRemember: values.checkedRemember,
    });

    if (
      validationField('email', userData.email) &&
      validationField('password', userData.password)
    ) {
      const text = CryptoJS.AES.encrypt(
        JSON.stringify(savedData),
        'savedUser'
      ).toString();
      values.checkedRemember
        ? localStorage.setItem('savedUser', text)
        : localStorage.removeItem('savedUser');
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
              autoFocus
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
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.checkedRemember}
                  onChange={handleRememberChange}
                  inputProps={{ 'aria-label': 'controlled' }}
                  value="remember"
                  color="primary"
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
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
