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
// /^(?=.{2,25}$)(?![' -])(?!.*[ '-]{2})[a-zA-Zа-яА-Я' -]+(?<![' -])$/;
const NUMBER_REGEX = /^\+?[0-9]?[0-9]?([0-9]{10})$/;
// /^\+?([0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const isCreating = useSelector(getContactsStatus) === 'creating';
  const [values, setValues] = useState({
    name: '',
    number: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    number: '',
  });

  const reset = () => {
    setValues({
      name: '',
      number: '',
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
        setErrors({
          ...errors,
          [name]: `${name} is required`,
        });
        return false;
      }
    }
  };

  const handleChange = event => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'name':
        validationField(name, value, NAME_REGEX);
        // setName(value);
        break;
      case 'number':
        validationField(name, value, NUMBER_REGEX);
        // setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const hasName = contacts.find(contact => contact.name === values.name);
    const hasNumber = contacts.find(
      contact => contact.number === values.number
    );
    if (hasName) {
      toast.warn(`Name is already in contacts.`);
      return;
    }
    if (hasNumber) {
      toast.warn(`Number is already in contacts.`);
      return;
    }
    if (
      validationField('name', values.name, NAME_REGEX) &&
      validationField('number', values.number, NUMBER_REGEX)
    ) {
      const contact = {
        name: values.name,
        number: values.number,
      };
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
          <Tooltip title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +">
            <TextField
              margin="normal"
              error={!!errors.number}
              helperText={errors.number}
              required
              fullWidth
              id="number"
              name="number"
              value={values.number}
              type="tel"
              label="Number"
              autoComplete="current-password"
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
