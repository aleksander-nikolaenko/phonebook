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
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';

import styles from './ContactsItem.module.css';

const { getContactsStatus } = selectors;

export const ContactsItem = props => {
  const { id, name, email, phone, onEdit } = props;
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
      <div>
        <p className={styles.name}>
          <PersonIcon color="primary" sx={{ mr: '8px' }} />
          {name.length > 32 ? name.substr(0, 32) + '...' : name}
        </p>
        {email && (
          <p className={styles.contacts}>
            <Link
              href={`mailto:${email}`}
              color="black"
              underline="hover"
              sx={{ display: 'flex' }}
            >
              <AlternateEmailIcon color="secondary" sx={{ mr: '8px' }} />
              {email.length > 32 ? email.substr(0, 32) + '...' : email}
            </Link>
          </p>
        )}
        {phone && (
          <p className={styles.contacts}>
            <Link
              href={`tel:${phone}`}
              color="black"
              underline="hover"
              sx={{ display: 'flex' }}
            >
              <LocalPhoneIcon color="secondary" sx={{ mr: '8px' }} />
              {phone}
            </Link>
          </p>
        )}
      </div>
      <div className={styles.btnWrapper}>
        <IconButton
          aria-label="update"
          size="medium"
          color="primary"
          onClick={() => onEdit(id)}
        >
          <EditIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          aria-label="delete"
          size="medium"
          color="error"
          onClick={() => handleDeleteContact(id)}
        >
          {isDeleting ? (
            <CircularProgress size={24} color="error" />
          ) : (
            <DeleteIcon fontSize="inherit" />
          )}
        </IconButton>
      </div>
    </li>
  );
};

ContactsItem.propTypes = {
  onEdit: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string,
  phone: PropTypes.string,
};
