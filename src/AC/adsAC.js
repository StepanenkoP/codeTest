import axios from 'axios'

import {CREATE_AD, LOAD_ADS, LOAD_AD} from '../types'

export function createAD(data) {
  return dispatch => {
    return axios({
      method: "post",
      url: "/api/advertisement",
      data: data,
      headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.token
      }
    })
  }
}

export function loadAds(data) {
  return dispatch => {
    return axios({
      method: "get",
      url: "/api/advertisement",
      headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.token
      }
    }).then(
      r => dispatch({
        type: LOAD_ADS,
        payload: r.data
      })
    )
  }
}

export function loadAd(id) {
  return dispatch => {
    return axios({
      method: "get",
      url: `/api/advertisement/${id}`,
      headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.token
      }
    }).then(
      r => dispatch({
        type: LOAD_AD,
        payload: r.data
      })
    )
  }
}

export function editAd(id) {
  return dispatch => {
    return axios({
      method: "put",
      url: `/api/advertisement/${id}`,
      headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.token
      }
    })
  }
}
