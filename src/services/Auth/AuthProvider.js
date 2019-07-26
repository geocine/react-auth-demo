import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Provider } from './context';

import { loginApp, logoutApp } from '../../actions';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector(({ userReducer }) => userReducer.userInfo);
  const error = useSelector(({ userReducer }) => userReducer.error);

  function login(username, password) {
    return dispatch(loginApp(username, password));
  }

  function logout() {
    return dispatch(logoutApp());
  }

  return <Provider value={{ userInfo, logout, login, error }}>{children}</Provider>;
};

export default AuthProvider;
