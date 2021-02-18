import apiUrl from '../apiConfig'
import axios from 'axios'

export const coinIndex = user => {
  return axios({
    url: apiUrl + '/coins',
    method: 'GET'
  })
}

export const coinCreate = (coin, user) => {
  return axios({
    url: apiUrl + '/coins',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`'
    },
    data: { coin: coin }
  })
}

export const coinShow = (id, user) => {
  return axios({
    url: apiUrl + '/coins/' + id,
    method: 'GET'
  })
}
