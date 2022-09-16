import { createSlice } from '@reduxjs/toolkit';
import * as extraReducersContacts from 'redux/reducers/reducers-contacts';

const initialState = {
  items: [],
  filter: '',
  status: 'idle',
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setFilterValue(state, { payload }) {
      state.filter = payload;
    },
  },
  extraReducers: {
    ...extraReducersContacts.fetchContacts,
    ...extraReducersContacts.addContact,
    ...extraReducersContacts.deleteContact,
  },
});

export default contactsSlice.reducer;
export const { setFilterValue } = contactsSlice.actions;
