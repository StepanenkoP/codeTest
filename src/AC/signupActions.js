import axios from 'axios'

export function userSignupRequest(userData) {
  return dispatch => {
    return axios({
      method: "post",
      url: "/registration",
      data: userData,
       headers: {
          'Content-Type': 'application/json'
      }
    })
  }
}

export function userLoginRequest(userData) {
  return dispatch => {
    return axios({
      method: "post",
      url: "/authenticate",
      data: userData,
      headers: {
          'Content-Type': 'application/json'
      }
    })
  }
}

export function userActivateRequest(userData) {
  return dispatch => {
    return axios({
      method: "get",
      url: "/activation",
      data: "87b0efac8f74ea0179360c7a56845573",
      headers: {
          'Content-Type': 'application/json'
      }
    })
  }
}
