import React from 'react';

const defaultState = {
  isLoading: false,
  userInfo: null,
  error: null,
  accessToken: null,
  login: () => {},
  logout: () => {},
  setInfo: () => {}
};

const { Provider, Consumer } = React.createContext(defaultState);

export { Provider, Consumer, defaultState };