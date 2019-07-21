import React from 'react';
import { Link } from 'react-router-dom';

import history from '../helpers/history';
import { withAuthContext } from '../services/Auth';

const TopBar = ({ userInfo, logout }) => {
  function logoff(logout) {
    return event => {
      event.preventDefault();
      logout().then(() => {
        history.push('/login');
      });
    };
  }

  return (
    <div>
      <nav>
        <div className="menu">
          <Link className="pseudo button" to="/">
            Home
          </Link>
          <Link className="pseudo button" to="/about">
            About
          </Link>
          <Link className="pseudo button" to="/login">
            Login
          </Link>
          <Link className="pseudo button" to="/admin">
            Admin
          </Link>
          {userInfo ? (
            <a href="/logout" onClick={logoff(logout)}>
              Logout
            </a>
          ) : null}
        </div>
      </nav>
    </div>
  );
};

export default withAuthContext(TopBar);
