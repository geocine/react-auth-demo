import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import history from '../helpers/history'
import withAuthContext from '../services/Auth/AuthContext';

class TopBar extends Component {
  logoff = (logout) => {
    return (event) => {
      event.preventDefault()
      logout().then(() => {
        history.push('/login')
      })
    } 
  }
  componentWillUpdate(props) {
    if(history.location.state && history.location.state.error) {
      this.props.logout().then(() => {
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
            {(this.props.userInfo) ? 
            <a href='/logout' onClick={this.logoff(this.props.logout)}>
              Logout
            </a> : null}
        </div>
      </nav>
    </div>)
  }
}

export default withAuthContext(TopBar)