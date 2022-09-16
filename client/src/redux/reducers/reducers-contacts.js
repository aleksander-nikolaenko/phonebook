import * as operations from '../operations/operations-contacts';

export const fetchContacts = {
  [operations.fetchContacts.fulfilled]: (state, { payload }) => {
    state.status = 'idle';
    const data = payload;
    state.items = data;
  },
  [operations.fetchContacts.rejected]: (state, { error }) => {
    state.error = error;
    state.status = 'idle';
  },
  [operations.fetchContacts.pending]: state => {
    state.status = 'loading';
  },
};

export const addContact = {
  [operations.addContact.fulfilled]: state => {
    state.status = 'idle';
  },
  [operations.addContact.rejected]: (state, { error }) => {
    state.error = error;
    state.status = 'idle';
  },
  [operations.addContact.pending]: state => {
    state.status = 'creating';
  },
};

export const deleteContact = {
  [operations.deleteContact.fulfilled]: state => {
    state.status = 'idle';
  },
  [operations.deleteContact.rejected]: (state, { error }) => {
    state.error = error;
    state.status = 'idle';
  },
  [operations.deleteContact.pending]: state => {
    state.status = 'deleting';
  },
};
