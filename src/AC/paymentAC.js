import axios from 'axios'
import {LOAD_ALL_PAYMENTS} from '../types'

export function loadAllPayments() {
  return dispatch => {
    return axios({
      method: "get",
      url: `/api/payments`,
      headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.token
      }
    }).then(
      r => dispatch({
        type: LOAD_ALL_PAYMENTS,
        payload: r.data
      })
    )
  }
}

export function sendPayment(data) {
  return dispatch => {
    return axios({
      method: "post",
      url: `/api/stripePayment`,
      data: data,
      headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.token
      }
    })
  }
}
