import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { routesPaths } from 'routerSettings/routesPaths';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { loginUser } from 'redux/operations/operations-user';
import selectors from 'redux/selectors';
import { LoaderButton } from 'components/LoaderButton';
import { ModalVerifyEmail } from 'components/ModalVerifyEmail';
import { ModalForgotPassword } from 'components/ModalForgotPassword';

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectors.getIsLoading);
  const [showLink, setShowLink] = React.useState({
    isVisibleForgot: false,
    isVisibleVerify: false,
  });
  const [showModalVerify, setShowModalVerify] = React.useState(false);
  const [showModalForgot, setShowModalForgot] = React.useState(false);
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
      setErrors(prevState => ({
        ...prevState,
        [name]: `${name} is required`,
      }));
      return false;
    }
    setErrors(prevState => ({
      ...prevState,
      [name]: ``,
    }));
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
        if (error.message === 'Request failed with status code 400') {
          toast.error(`Wrong email or password`);
          setShowLink({
            isVisibleForgot: true,
            isVisibleVerify: false,
          });
        } else if (error.message === 'Request failed with status code 403') {
          toast.error(`Email not verified`);
          setShowLink({
            isVisibleForgot: false,
            isVisibleVerify: true,
          });
        } else {
          toast.error(`Error. Try again.`);
        }
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ my: 3 }}>
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
          <Grid container justifyContent="center">
            {showLink.isVisibleForgot && (
              <Grid item>
                <Link
                  onClick={e => {
                    e.preventDefault();
                    setShowModalForgot(true);
                  }}
                >
                  Forgot your password
                </Link>
              </Grid>
            )}
            {showLink.isVisibleVerify && (
              <Grid item>
                <Link
                  onClick={e => {
                    e.preventDefault();
                    setShowModalVerify(true);
                  }}
                >
                  Re-send verify email
                </Link>
              </Grid>
            )}
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
      <ModalVerifyEmail
        active={showModalVerify}
        setActive={setShowModalVerify}
      />
      <ModalForgotPassword
        active={showModalForgot}
        setActive={setShowModalForgot}
      />
    </Container>
  );
}
