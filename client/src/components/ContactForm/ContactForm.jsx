import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import { toast } from 'react-toastify';
import selectors from 'redux/selectors';
import {
  addContact,
  fetchContacts,
} from 'redux/operations/operations-contacts';
import { useDispatch, useSelector } from 'react-redux';
import { LoaderButton } from 'components/LoaderButton';

const { getContacts, getContactsStatus } = selectors;

const NAME_REGEX = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const NUMBER_REGEX = /^\+?[0-9]?[0-9]?([0-9]{10})$/;

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const isCreating = useSelector(getContactsStatus) === 'creating';
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const reset = () => {
    setValues({
      name: '',
      email: '',
      phone: '',
    });
  };
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
        if (name === 'name') {
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
      }
    }
  };

  const handleChange = event => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'name':
        validationField(name, value, NAME_REGEX);
        break;
      case 'email':
        validationField(name, value, EMAIL_REGEX);
        break;
      case 'phone':
        validationField(name, value, NUMBER_REGEX);
        break;

      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const hasName = contacts.find(contact => contact.name === values.name);
    const hasEmail = contacts.find(contact => contact.email === values.email);
    const hasNumber = contacts.find(contact => contact.phone === values.phone);
    if (hasName) {
      toast.warn(`Name is already in contacts.`);
      return;
    }
    if (hasEmail) {
      toast.warn(`Email is already in contacts.`);
      return;
    }
    if (hasNumber) {
      toast.warn(`Number is already in contacts.`);
      return;
    }
    if (
      validationField('name', values.name, NAME_REGEX) &&
      validationField('email', values.email, EMAIL_REGEX) &&
      validationField('phone', values.phone, NUMBER_REGEX)
    ) {
      const contact = {
        name: values.name,
      };
      if (values.email) contact.email = values.email;
      if (values.phone) contact.phone = values.phone;
      dispatch(addContact(contact))
        .unwrap()
        .then(res => {
          toast.success(`${res.name} is add in contacts.`);
          dispatch(fetchContacts())
            .unwrap()
            .then(() => {
              toast.success(`Contacts updated`);
            })
            .catch(() => {
              toast.error(`Contacts didn't updated`);
            });
          reset();
        })
        .catch(() => {
          toast.error(`${values.name} isn't add in contacts.`);
        });
    }
  };
  return (
    <Container component="div" maxWidth="xs">
      <Box
        sx={{
          marginTop: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <ImportContactsIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Contacts
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Tooltip title="Name may contain only letters, apostrophe, dash and spaces">
            <TextField
              margin="normal"
              error={!!errors.name}
              helperText={errors.name}
              required
              fullWidth
              id="name"
              name="name"
              value={values.name}
              label="Name"
              autoComplete="name"
              onChange={handleChange}
            />
          </Tooltip>
          <Tooltip title="Email must contain only letters and special symbol ">
            <TextField
              margin="normal"
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              id="email"
              name="email"
              value={values.email}
              type="email"
              label="Email"
              autoComplete="email"
              onChange={handleChange}
            />
          </Tooltip>
          <Tooltip title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +">
            <TextField
              margin="normal"
              error={!!errors.phone}
              helperText={errors.phone}
              fullWidth
              id="phone"
              name="phone"
              value={values.phone}
              type="tel"
              label="Phone number"
              autoComplete="phone"
              onChange={handleChange}
            />
          </Tooltip>
          <Button type="submit" fullWidth variant="contained" sx={{ my: 3 }}>
            {isCreating ? <LoaderButton /> : 'Add Contact'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
