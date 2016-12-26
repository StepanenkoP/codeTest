import axios from 'axios'

import {LOAD_ALLSTATS, GET_USER_INFO} from '../types'

export function loadAllStats() {
  return dispatch => {
    return axios({
      method: "get",
      url: `/api/account/summary`,
      headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.token
      }
    }).then(
      r => dispatch({
        type: LOAD_ALLSTATS,
        payload: r.data
      })
    )
  }
}

export function getUserInfo() {
  return dispatch => {
    return axios({
      method: "get",
      url: `/api/getUserInfo`,
      headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.token
      }
    }).then(
      r => dispatch({
        type: GET_USER_INFO,
        payload: r.data
      })
    )
  }
}

export function deleteUser() {
  return dispatch => {
    return axios({
      method: "delete",
      url: `/api/user`,
      headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.token
      }
    })
  }
}

export function reactivationRequest(data) {
  return dispatch => {
    return axios({
      method: "post",
      url: `/api/account_recovery_request`,
      data: data,
      headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.token
      }
    })
  }
}
