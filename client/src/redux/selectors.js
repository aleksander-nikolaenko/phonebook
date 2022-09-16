import { createSelector } from '@reduxjs/toolkit';

const getIsAuth = state => state.auth.isAuth;
const getIsLoading = state => state.auth.isLoading;
const getAuthStatus = state => state.auth.status;
const getToken = state => state.auth.token;
const getUserName = state => state.auth.user.name;
const getUserEmail = state => state.auth.user.email;
const getFilterValue = state => state.contacts.filter;
const getContactsStatus = state => state.contacts.status;
const getContacts = state => state.contacts.items;

const getFilteredContacts = createSelector(
  [getContacts, getFilterValue],
  (contacts, filter) => {
    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase().trim()) ||
        contact.number.includes(filter.toLowerCase().trim())
    );
  }
);

const selectors = {
  getFilteredContacts,
  getContacts,
  getContactsStatus,
  getFilterValue,
  getAuthStatus,
  getIsAuth,
  getIsLoading,
  getToken,
  getUserName,
  getUserEmail,
};
export default selectors;
