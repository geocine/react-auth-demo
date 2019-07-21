import React from 'react';
import AuthConsumer from '../../services/Auth/AuthConsumer';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <AuthConsumer>
        {({ userInfo }) => {
          return userInfo ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
          );
        }}
      </AuthConsumer>
    )}
  />
);

export default PrivateRoute;
