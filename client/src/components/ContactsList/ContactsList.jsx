import { ContactsItem } from './ContactsItem';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from 'redux/operations/operations-contacts';
import { setFilterValue } from 'redux/slice/slice-contacts';
import { toast } from 'react-toastify';
import selectors from 'redux/selectors';
import LoaderPage from 'components/LoaderPage';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';

import styles from './ContactsList.module.css';

const { getContactsStatus, getFilterValue, getFilteredContacts } = selectors;

export const ContactsList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts())
      .unwrap()
      .then(() => {
        toast.success(`Contacts updated`);
      })
      .catch(() => {
        toast.error(`Contacts didn't updated`);
      });
  }, [dispatch]);
  const contacts = useSelector(getFilteredContacts);
  const ContactsStatus = useSelector(getContactsStatus);
  const isLoading = ContactsStatus === 'loading';
  const value = useSelector(getFilterValue);
  const handleFilterValue = event => {
    dispatch(setFilterValue(event.target.value));
  };
  return (
    <Container component="div" maxWidth="xs">
      {isLoading && <LoaderPage />}

      <Tooltip title="Find contacts. Please enter a name or number for search.">
        <TextField
          variant="standard"
          margin="normal"
          fullWidth
          id="name"
          name="name"
          value={value}
          label="Enter a search name or number"
          autoComplete="name"
          onChange={handleFilterValue}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
      </Tooltip>

      <ul className={styles.list}>
        {contacts.map(({ id, name, number }) => (
          <ContactsItem key={id} name={name} number={number} id={id} />
        ))}
      </ul>
    </Container>
  );
};
