import { createAsyncThunk } from '@reduxjs/toolkit';
import * as contactsApi from 'services/contacts-api';

export const registerUser = createAsyncThunk(
  'user/register',
  async userData => {
    const { data } = await contactsApi.registerUser(userData);
    const { token, user } = data;

    return { token, user };
  }
);

export const loginUser = createAsyncThunk('user/login', async userData => {
  const { data } = await contactsApi.loginUser(userData);
  const { token, user } = data;

  return { user, token };
});

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, thunkAPI) => {
    const persistedToken = thunkAPI.getState().auth.token;
    await contactsApi.logoutUser(persistedToken);
  }
);

export const currentUser = createAsyncThunk(
  'user/current',
  async (_, thunkAPI) => {
    const persistedToken = thunkAPI.getState().auth.token;
    if (!persistedToken) return thunkAPI.rejectWithValue();
    const { data } = await contactsApi.currentUser(persistedToken);
    return data;
  }
);
