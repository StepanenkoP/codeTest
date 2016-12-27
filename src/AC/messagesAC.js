import axios from 'axios'
import {LOAD_ALL_MESSAGES, LOAD_MESSAGE, SEND_MESSAGE} from '../types'

export function loadAllMessages(data) {
  return dispatch => {
    return axios({
      method: "get",
      url: `/api/messages?page=${data}`,
      headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.token
      }
    }).then(
      r => dispatch({
        type: LOAD_ALL_MESSAGES,
        payload: r.data
      })
    )
  }
}

export function loadMessageById(id) {
  return dispatch => {
    return axios({
      method: "get",
      url: `/api/messages/${id}`,
      headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.token
      }
    }).then(
      r => dispatch({
        type: LOAD_MESSAGE,
        payload: r.data
      })
    )
  }
}

export function sendMessage(data, newobj, currentDate) {
  return dispatch => {
    return axios({
      method: "post",
      url: `/api/messages`,
      data: data,
      headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.token
      }
    }).then(
      r => dispatch({
        type: SEND_MESSAGE,
        payload: newobj,
        currentDate
      })
    )
  }
}
