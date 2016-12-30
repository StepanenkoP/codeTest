import axios from 'axios'

import {LOAD_ALLSTATS, GET_USER_INFO, GET_ALL_USERS, BLOCK_USER, GET_ALL_ADVERTS, APPROVE_AD, REJECT_AD, GET_FILTERED_ADVERTS, GET_FILTERED_USERS} from '../types'

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

export function getAllUsers(data,filter_by) {
  return dispatch => {
    return axios({
      method: "get",
      url: `/api/users${filter_by == undefined ? '?' : `/${filter_by}?`}page=${data}`,
      headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.token
      }
    }).then(
      r => dispatch({
        type: GET_ALL_USERS,
        payload: r.data
      })
    )
  }
}

export function blockUser(data) {
  return dispatch => {
    return axios({
      method: "post",
      url: `/api/users/${data}/block`,
      headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.token
      }
    }).then(
      r => dispatch({
        type: BLOCK_USER,
        payload: r.data,
        id: data
      })
    )
  }
}

export function getAllAdverts(data, filter_by) {
  return dispatch => {
    return axios({
      method: "get",
      url: `/api/advertisements${filter_by == undefined ? '?' : `/${filter_by}?`}page=${data}`,
      headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.token
      }
    }).then(
      r => dispatch({
        type: GET_ALL_ADVERTS,
        payload: r.data
      })
    )
  }
}

export function getFilteredAdverts(data) {
  return dispatch => {
    return axios({
      method: "get",
      url: `/api/advertisements/${data}`,
      headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.token
      }
    }).then(
      r => dispatch({
        type: GET_FILTERED_ADVERTS,
        payload: r.data
      })
    )
  }
}

export function getFilteredUsers(data) {
  return dispatch => {
    return axios({
      method: "get",
      url: `/api/users/${data}`,
      headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.token
      }
    }).then(
      r => dispatch({
        type: GET_FILTERED_USERS,
        payload: r.data
      })
    )
  }
}


export function setApprove(data) {
  return dispatch => {
    return axios({
      method: "put",
      url: `/api/advertisements/${data}/status`,
      data: {status: 'approved'},
      headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.token
      }
    }).then(
      r => dispatch({
        type: APPROVE_AD,
        payload: r.data,
        id: data
      })
    )
  }
}

export function setReject(data) {
  return dispatch => {
    return axios({
      method: "put",
      url: `/api/advertisements/${data}/status`,
      data: {status: 'rejected'},
      headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.token
      }
    }).then(
      r => dispatch({
        type: REJECT_AD,
        payload: r.data,
        id: data
      })
    )
  }
}
