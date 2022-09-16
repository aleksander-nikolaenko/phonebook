import { http } from './api';

const baseURL = 'https://connections-api.herokuapp.com';

export const registerUser = userData => {
  return http.post(`${baseURL}/users/signup`, userData);
};

export const loginUser = data => {
  return http.post(`${baseURL}/users/login`, data);
};

export const currentUser = token => {
  return http.get(`${baseURL}/users/current`, {
    headers: {
      Authorization: token,
    },
  });
};

export const logoutUser = token => {
  return http.post(`${baseURL}/users/logout`, null, {
    headers: {
      Authorization: token,
    },
  });
};

export const fetchContacts = token => {
  return http.get(`${baseURL}/contacts`, {
    headers: {
      Authorization: token,
    },
  });
};

export const addContact = (contact, token) => {
  return http.post(`${baseURL}/contacts/`, contact, {
    headers: {
      Authorization: token,
    },
  });
};

export const deleteContact = (id, token) => {
  return http.delete(`${baseURL}/contacts/${id}`, {
    headers: {
      Authorization: token,
    },
  });
};
