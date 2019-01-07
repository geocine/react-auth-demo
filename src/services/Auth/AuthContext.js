import React from 'react'
import AuthConsumer from './AuthConsumer'

const withAuthContext = (Component) => {
  return (props) => (
      <AuthConsumer>
           {({userInfo, logout}) => {
              return <Component {...props} userInfo={userInfo} logout={logout} />
           }}
      </AuthConsumer>
  )
}

export default withAuthContext