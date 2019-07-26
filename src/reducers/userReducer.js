import { handleActions, combineActions } from 'redux-actions';
import {
  loginAppRequest,
  loginAppResponse,
  logoutAppRequest,
  logoutAppResponse,
} from '../actions';

const defaultState = {
  isLoading: false,
  userInfo: null,
  error: null,
  accessToken: null
};

const reducer = handleActions(
  {
    [combineActions(loginAppRequest, logoutAppRequest)]: () => ({
      ...defaultState,
      isLoading: true
    }),
    [loginAppResponse]: (state, { payload }) => {
      const { accessToken, userInfo, error } = payload;
      if (error) {
        return { ...defaultState, error };
      }
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      localStorage.setItem('accessToken', accessToken);
      return { ...state, isLoading: false, accessToken, userInfo };
    },
    [logoutAppResponse]: (_state, { payload }) => {
      const { error } = payload;
      localStorage.removeItem('userInfo');
      localStorage.removeItem('accessToken');
      return { ...defaultState, error };
    }
  },
  defaultState
);

export default reducer;
