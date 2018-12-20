import React from 'react'
import { getHttp } from '../helpers/http'

const AdminPage = () => {

  getHttp('/users').then(()=> {
    console.log('oops')
  })
  .catch((err) => {
    console.log(err.status)
  })

  return (
    <div>
      <h2> Admin </h2>
      <p>
        Welcome to the Admin Page.
      </p>
    </div>
  )
}

export default AdminPage