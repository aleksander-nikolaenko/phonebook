import { createAsyncThunk } from '@reduxjs/toolkit';
import * as contactsApi from 'services/contacts-api';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, thunkAPI) => {
    const persistedToken = thunkAPI.getState().auth.token;
    const response = await contactsApi.fetchContacts(persistedToken);
    return response.data;
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContacts',
  async (contact, thunkAPI) => {
    const persistedToken = thunkAPI.getState().auth.token;
    await contactsApi.addContact(contact, persistedToken);
    return contact;
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContacts',
  async (id, thunkAPI) => {
    const persistedToken = thunkAPI.getState().auth.token;
    await contactsApi.deleteContact(id, persistedToken);
    return id;
  }
);
