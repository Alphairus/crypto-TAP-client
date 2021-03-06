import apiUrl from '../apiConfig'
import axios from 'axios'

export const coinIndex = user => {
  return axios({
    url: apiUrl + '/coins',
    method: 'GET',
    headers: {
      // we need the user, so we have access to their token
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const coinCreate = (coin, user) => {
  return axios({
    url: apiUrl + '/coins',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { coin: coin }
  })
}

export const coinShow = (id, user) => {
  return axios({
    url: apiUrl + '/coins/' + id,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const coinUpdate = (id, coin, user) => {
  return axios({
    url: apiUrl + '/coins/' + id,
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { coin: coin }
  })
}
