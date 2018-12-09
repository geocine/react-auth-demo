import React from 'react';

import { Provider, defaultState } from './context';
import { postHttp } from '../../helpers/http'

class AuthProvider extends React.Component  {
  constructor() {
    super();
    this.setInfo = this.setInfo.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.state = { ...defaultState, login: this.login, logout: this.logout };
  }
  componentDidMount () {
    this.setInfo();
  }
  toggleLoading = () => {
    this.setState({ ...this.state, userInfo: null, accessToken: null, isLoading: true, error: null });
  }
  fetchSuccess = (data) => {
    this.setState({ ...this.state, userInfo: data, accessToken: data.accessToken, isLoading: false, error: null });
  }
  fetchFail = (err) => {
    this.setState({ ...this.state, userInfo: null, accessToken: null, isLoading: false, error: err});
  }
  async setInfo() {
    const userInfo = sessionStorage.getItem('userInfo')
    const accessToken = sessionStorage.getItem('accessToken')
    if(userInfo) {
      this.setState({ ...this.state, userInfo, accessToken, isLoading: false, error: null})
    }
  }
  async login(username, password){
    this.toggleLoading();
    try {
      const userInfo = await postHttp('/auth/login',{username, password})
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
      sessionStorage.setItem('accessToken', userInfo.accessToken)
      this.fetchSuccess(userInfo)
    }
    catch(ex) {
      this.fetchFail(ex)
    }
  }
  async logout() {
    const userInfo = await postHttp('/auth/logout')
    sessionStorage.removeItem('userInfo')
    sessionStorage.removeItem('accessToken')
    return userInfo
  }
  render() {
    return (
      <Provider value={this.state}>
        { this.props.children }
      </Provider>
    );
  }
}

export default AuthProvider;