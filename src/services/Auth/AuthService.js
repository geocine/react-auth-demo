import { postHttp } from '../../helpers/http';

export const loginUserService = async ({ username, password }) => {
  return postHttp('/auth/login', { username, password });
};

export const logoutUserService = async () => {
  return postHttp('/auth/logout');
};