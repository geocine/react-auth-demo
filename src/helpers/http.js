import history from './history'
import { AlertRef } from './alert';

const checkStatus = async(response) => {
  if (response.status >= 200 && response.status < 300) {
    return response.json()
  } else  {
    if(response.status === 401) {
      localStorage.removeItem('userInfo')
      localStorage.removeItem('accessToken')
      history.push({
        pathname: '/login',
        state: { error: true }
      })
    }
    const error = new Error(`HTTP Error ${response.statusText}`)
    error.status = response.statusText
    error.response = await response.json()
    throw error
  }
}


const getHeaders = () => {
  const accessToken = localStorage.getItem('accessToken')
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  }

}

export const getHttp = (path) => {
  return fetch(`${path}`, {
    headers: getHeaders()
  }).then(response => checkStatus(response))
  .catch(error => AlertRef.getInstance().current.show(error.message))
}

export const postHttp = (path, data) => {
  return fetch(`${path}`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data)
  }).then(response => checkStatus(response))
}

export const putHttp = (path, data) => {
  return fetch(`${path}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data)
  }).then(response => checkStatus(response))
}