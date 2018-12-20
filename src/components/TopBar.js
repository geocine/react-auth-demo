import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import AuthConsumer from '../services/Auth/AuthConsumer';
import history from '../helpers/history'

class TopBar extends Component {
  logoff = (logout) => {
    return (event) => {
      event.preventDefault()
      logout().then(() => {
        history.push('/login')
      })
    } 
  }
  render() {
    return(<div>
      <nav>
        <div className='menu'>
          <Link className='pseudo button' to='/'>Home</Link>
          <Link className='pseudo button' to='/about'>About</Link>
          <Link className='pseudo button' to='/login'>Login</Link>
          <Link className='pseudo button' to='/admin'>Admin</Link>
          <AuthConsumer>
              {({ userInfo, logout }) => (userInfo) ? <a href='/logout' onClick={this.logoff(logout)}>Logout</a> : null}
          </AuthConsumer>
        </div>
      </nav>
    </div>)
  }
}

export default TopBar