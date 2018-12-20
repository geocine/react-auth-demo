import React, { Component } from 'react';
import {
  Router,
  Route,
  Switch
} from 'react-router-dom'
import TopBar from './components/TopBar'
import PrivateRoute from './components/router/PrivateRoute'

import HomePage from './components/HomePage'
import AboutPage from './components/AboutPage'
import LoginPage from './components/LoginPage'
import AdminPage from './components/AdminPage'

import './App.css';
import AuthProvider from './services/Auth/AuthProvider';
import history from './helpers/history'

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <AuthProvider>
          <div>
            <TopBar />
            <div className='mainbody'>
              <Switch>
                <Route path='/' exact component={HomePage} />
                <Route path='/about' component={AboutPage} />
                <Route path='/login' component={LoginPage} />
                <PrivateRoute path='/admin' component={AdminPage} />
              </Switch>
            </div>
          </div>
        </AuthProvider>
      </Router>
    );
  }
}

export default App;
