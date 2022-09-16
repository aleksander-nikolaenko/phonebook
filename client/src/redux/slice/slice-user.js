import { createSlice } from '@reduxjs/toolkit';
import * as extraReducersUser from 'redux/reducers/reducers-user';
const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  status: 'idle',
  error: null,
  isAuth: false,
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }) {
      return { ...state, ...payload };
    },
    deleteUser() {
      return { ...initialState };
    },
  },
  extraReducers: {
    ...extraReducersUser.registerUser,
    ...extraReducersUser.loginUser,
    ...extraReducersUser.currentUser,
    ...extraReducersUser.logoutUser,
  },
});

export default userSlice.reducer;
export const { setUser, deleteUser } = userSlice.actions;
