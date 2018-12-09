
const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`)
    error.status = response.statusText
    error.response = response
    throw error
  }
}

export const getHttp = (path) => {
  const accessToken = sessionStorage.getItem('accessToken')
  return fetch(`${path}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  }).then(response => checkStatus(response))
    .then(response => response.json())
}

export const postHttp = (path, data) => {
  const accessToken = sessionStorage.getItem('accessToken')
  return fetch(`${path}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(data)
  }).then(response => checkStatus(response))
    .then(response => response.json())
}

export const putHttp = (path, data) => {
  const accessToken = sessionStorage.getItem('accessToken')

  return fetch(`${path}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(data)
  }).then(response => checkStatus(response))
    .then(response => response.json())
}