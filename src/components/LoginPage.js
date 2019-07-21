import React, { useState } from 'react';
import AuthConsumer from '../services/Auth/AuthConsumer';
import { Redirect } from 'react-router-dom';

const LoginPage = ({ location }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleChange(event) {
    switch (event.target.id) {
      case 'username':
        setUsername(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
      default:
        break;
    }
  }

  function handleSubmit(login) {
    return event => {
      event.preventDefault();
      login(username, password);
    };
  }

  let { from } = location.state || {
    from: { pathname: '/' }
  }

  return (
    <div className="Login">
      <AuthConsumer>
        {({ userInfo, login, error }) => {
          if (userInfo && !error) {
            return <Redirect to={from} />;
          }
          return (
            <form onSubmit={handleSubmit(login)}>
              <div>
                <label>Username</label>
                <input
                  id="username"
                  type="username"
                  value={username}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
              <div>
                <label>Password</label>
                <input
                  id="password"
                  value={password}
                  onChange={handleChange}
                  type="password"
                />
              </div>
              <button disabled={!validateForm()} type="submit">
                Login
              </button>
            </form>
          );
        }}
      </AuthConsumer>
    </div>
  );
};

export default LoginPage;
