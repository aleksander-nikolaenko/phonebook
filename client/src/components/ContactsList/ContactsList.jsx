import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { toast } from 'react-toastify';
import {
  updateContact,
  fetchContacts,
} from 'redux/operations/operations-contacts';
import selectors from 'redux/selectors';
import { setFilterValue } from 'redux/slice/slice-contacts';
import { ContactsItem } from './ContactsItem';
import LoaderPage from 'components/LoaderPage';
import { ModalEditContact } from 'components/ModalEditContact';

import styles from './ContactsList.module.css';

const { getContactsStatus, getFilterValue, getFilteredContacts, getContacts } =
  selectors;

export const ContactsList = () => {
  const [showModal, setShowModal] = useState(false);
  const [editContactId, setEditContactId] = useState('');
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
  const allContacts = useSelector(getContacts);
  const contacts = useSelector(getFilteredContacts);
  const ContactsStatus = useSelector(getContactsStatus);
  const isLoading = ContactsStatus === 'loading';
  const value = useSelector(getFilterValue);
  const handleFilterValue = event => {
    dispatch(setFilterValue(event.target.value));
  };

  const handleEditContact = id => {
    setShowModal(true);
    setEditContactId(id);
  };
  const handleSubmitModal = newContact => {
    const keys = Object.keys(newContact);
    for (let i = 0; i < keys.length; i += 1) {
      if (allContacts.find(item => newContact[keys[i]] === item[keys[i]])) {
        toast.warn(`${keys[i]} is already in contacts.`);
        return;
      }
    }
    dispatch(updateContact({ id: editContactId, contact: newContact }))
      .unwrap()
      .then(res => {
        console.log(res);
        toast.success(`${res.contact.name} is update in contacts.`);
        dispatch(fetchContacts())
          .unwrap()
          .then(() => {
            toast.success(`Contacts updated`);
          })
          .catch(() => {
            toast.error(`Contacts didn't updated`);
          });
      })
      .catch(error => {
        console.log(error);
        toast.error(`${newContact.name} isn't update in contacts.`);
      });
  };
  return (
    <Container component="div" maxWidth="xs">
      {isLoading && <LoaderPage />}

      <Tooltip title="Find contacts. Please enter a name or email or number for search.">
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
        {contacts.map(({ _id: id, name, email, phone }) => (
          <ContactsItem
            key={id}
            name={name}
            email={email}
            phone={phone}
            id={id}
            onEdit={handleEditContact}
          />
        ))}
      </ul>
      <ModalEditContact
        active={showModal}
        setActive={setShowModal}
        onSubmit={handleSubmitModal}
      />
    </Container>
  );
};
