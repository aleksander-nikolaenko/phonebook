import { http } from './api';

const baseURL = process.env.REACT_APP_BASE_API_URL;

export const registerUser = userData => {
  return http.post(`${baseURL}/users/register`, userData);
};

export const verifyUserEmail = userData => {
  return http.post(`${baseURL}/users/verify`, userData);
};

export const forgotUserPassword = userData => {
  return http.post(`${baseURL}/users/forgot-password`, userData);
};

export const loginUser = data => {
  return http.post(`${baseURL}/users/login`, data);
};

export const currentUser = token => {
  return http.get(`${baseURL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const logoutUser = token => {
  return http.get(`${baseURL}/users/logout`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchContacts = token => {
  return http.get(`${baseURL}/contacts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addContact = (contact, token) => {
  return http.post(`${baseURL}/contacts`, contact, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateContact = (id, contact, token) => {
  return http.put(`${baseURL}/contacts/${id}`, contact, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteContact = (id, token) => {
  return http.delete(`${baseURL}/contacts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
