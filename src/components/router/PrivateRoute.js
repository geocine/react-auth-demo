import React from 'react'
import PropTypes from 'prop-types'
import AuthConsumer from '../../services/Auth/AuthConsumer'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }, context) => (
  <Route {...rest} render={props => (
    <AuthConsumer>
      {({userInfo}) => 
        (
          userInfo ? (
            <Component {...props} />
          ) : (
            <Redirect to={{
              pathname: '/login',
              state: { from: props.location }
            }} />
          )
        )
      }
    </AuthConsumer>
  )} />
)

PrivateRoute.contextTypes = {
  auth: PropTypes.object
}

export default PrivateRoute