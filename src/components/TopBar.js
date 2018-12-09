import React from 'react'
import { Link } from 'react-router-dom'

const TopBar = () => (
  <div>
    <nav>
      <div className='menu'>
        <Link className='pseudo button' to='/'>Home</Link>
        <Link className='pseudo button' to='/about'>About</Link>
        <Link className='pseudo button' to='/login'>Login</Link>
        <Link className='pseudo button' to='/admin'>Admin</Link>
      </div>
    </nav>
  </div>
)

export default TopBar