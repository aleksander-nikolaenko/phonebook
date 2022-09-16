import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  deleteContact,
  fetchContacts,
} from 'redux/operations/operations-contacts';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { toast } from 'react-toastify';
import selectors from 'redux/selectors';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';

import styles from './ContactsItem.module.css';

const { getContactsStatus } = selectors;

export const ContactsItem = props => {
  const { id, name, number } = props;
  const dispatch = useDispatch();
  const deleting = useSelector(getContactsStatus) === 'deleting';
  const [isDeleting, setDeleting] = useState(deleting);

  const handleDeleteContact = async id => {
    setDeleting(true);
    dispatch(deleteContact(id))
      .unwrap()
      .then(res => {
        toast.success(`Contact "${name}" is deleting`);
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
        setDeleting(false);
        console.log(error.message);
        toast.error(`Contact "${name}" is not deleting`);
      });
  };
  return (
    <li className={styles.item}>
      <div className={styles.wrapper}>
        <p className={styles.text}>
          <PersonIcon color="primary" sx={{ mr: '8px' }} />
          {name}
        </p>
        <p className={styles.number}>
          <Link
            href={`tel:${number}`}
            color="black"
            underline="hover"
            sx={{ display: 'flex' }}
          >
            <LocalPhoneIcon color="secondary" sx={{ mr: '8px' }} />
            {number}
          </Link>
        </p>
      </div>
      <IconButton
        aria-label="delete"
        size="large"
        color="error"
        onClick={() => handleDeleteContact(id)}
      >
        {isDeleting ? (
          <CircularProgress size={24} color="error" />
        ) : (
          <DeleteIcon fontSize="inherit" />
        )}
      </IconButton>
    </li>
  );
};

ContactsItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
