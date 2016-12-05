import axios from 'axios'
import {LOAD_COUNTRIES, LOAD_DAYS, LOAD_TIMES, LOAD_AGES, LOAD_WEBSITES} from '../types'

export function getCountries() {
  return dispatch => {
    return axios({
      method: "get",
      url: "/api/getCountries",
      headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.token
      }
    }).then(
      r => dispatch({
        type: LOAD_COUNTRIES,
        payload: r.data
      })
    )
  }
}

export function getDays() {
  return dispatch => {
    return axios({
      method: "get",
      url: "/api/getDays",
      headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.token
      }
    }).then(
      r => dispatch({
        type: LOAD_DAYS,
        payload: r.data
      })
    )
  }
}

export function getTimes() {
  return dispatch => {
    return axios({
      method: "get",
      url: "/api/getTimes",
      headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.token
      }
    }).then(
      r => dispatch({
        type: LOAD_TIMES,
        payload: r.data
      })
    )
  }
}

export function getAges() {
  return dispatch => {
    return axios({
      method: "get",
      url: "/api/getAges",
      headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.token
      }
    }).then(
      r => dispatch({
        type: LOAD_AGES,
        payload: r.data
      })
    )
  }
}

export function getWebsites() {
  return dispatch => {
    return axios({
      method: "get",
      url: "/api/getWebsites",
      headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.token
      }
    }).then(
      r => dispatch({
        type: LOAD_WEBSITES,
        payload: r.data
      })
    )
  }
}

export function createCampaign(data) {
  return dispatch => {
    return axios({
      method: "post",
      url: "/api/campaign",
      data: data,
       headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.token
      }
    })
  }
}
