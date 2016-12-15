import axios from 'axios'

import {CREATE_AD, LOAD_ADS, LOAD_AD, DELETE_AD, GET_AD_STATS} from '../types'

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

export function getAdStats(id) {
  return dispatch => {
    return axios({
      method: "get",
      url: `/api/advertisement/${id}/stats`,
      headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.token
      }
    }).then(
      r => dispatch({
        type: GET_AD_STATS,
        payload: r.data
      })
    )
  }
}

export function editAd(data) {
  return dispatch => {
    return axios({
      method: "put",
      url: `/api/advertisement/${data.id}`,
      data: data.dataForm,
      headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.token
      }
    })
  }
}

export function deleteAd(id) {
  return dispatch => {
    return axios({
      method: "delete",
      url: `/api/advertisement/${id}`,
      headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.token
      }
    }).then(
      r => dispatch({
        type: DELETE_AD,
        payload: r.data
      })
    )
  }
}
