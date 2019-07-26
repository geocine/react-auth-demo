import { createActions } from 'redux-actions';
import { loginUserService } from '../services/Auth/AuthService';

export const {
  loginAppRequest,
  loginAppResponse,
  logoutAppRequest,
  logoutAppResponse,
  loadUserInfo
} = createActions(
  'LOGIN_APP_REQUEST',
  'LOGIN_APP_RESPONSE',
  'LOGOUT_APP_REQUEST',
  'LOGOUT_APP_RESPONSE'
);

export const loginApp = (username, password) => async dispatch => {
  dispatch(loginAppRequest());
  try {
    const userInfo = await loginUserService({ username, password });
    dispatch(
      loginAppResponse({
        userInfo,
        accessToken: userInfo.accessToken,
        error: null
      })
    );
  } catch (err) {
    dispatch(
      loginAppResponse({
        error: err
      })
    );
  }
};

export const logoutApp = () => async dispatch => {
  dispatch(logoutAppRequest());
  try {
    dispatch(logoutAppResponse({ error: null }));
  } catch (err) {
    dispatch(
      logoutAppResponse({
        error: err
      })
    );
  }
};
