import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import MailLockOutlinedIcon from '@mui/icons-material/MailLockOutlined';
import { toast } from 'react-toastify';
import { Modal } from 'components/Modal';
import { forgotUserPassword } from 'services/contacts-api';

export const ModalForgotPassword = ({ active, setActive }) => {
  const [valueEmail, setValueEmail] = useState('');

  const [errorEmail, setErrorEmail] = useState('');

  const validationEmail = (name, value) => {
    if (!value) {
      setErrorEmail(`${name} is required`);
      return false;
    }
    setErrorEmail('');
    return true;
  };
  const handleChange = event => {
    const { value } = event.target;
    setValueEmail(() => value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get('email'),
    };

    if (validationEmail('email', userData.email)) {
      try {
        await forgotUserPassword(userData);
        toast.success(`Email is sent. Please check your email`);
        setActive(false);
        setValueEmail('');
      } catch (error) {
        if (error.message === 'Request failed with status code 400') {
          toast.error(`Email is wrong, user not found`);
          setValueEmail('');
        } else {
          toast.error(`Error. Try again.`);
        }
      }
    }
  };
  return (
    <Modal active={active} setActive={setActive}>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <MailLockOutlinedIcon />
      </Avatar>
      <Typography component="p" variant="h5">
        Send letter with new password on your email
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ width: '100%', maxWidth: '450px', mt: 1 }}
      >
        <TextField
          margin="normal"
          error={!!errorEmail}
          helperText={errorEmail}
          required
          fullWidth
          id="forgotEmail"
          name="email"
          value={valueEmail}
          label="Email Address"
          autoComplete="email"
          onChange={handleChange}
        />
        {/* <TextField
          margin="normal"
          error={!!errorEmail}
          helperText={errorEmail}
          required
          fullWidth
          id="forgotEmail1"
          name="email"
          value={valueEmail}
          label="Email Address"
          autoComplete="email"
          onChange={handleChange}
        /> */}
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          sx={{ my: 2 }}
        >
          <Grid item>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ px: 3, py: 1 }}
            >
              Ok
            </Button>
          </Grid>
          <Grid item>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ px: 3, py: 1 }}
              onClick={() => {
                setActive(false);
              }}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

ModalForgotPassword.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
};
