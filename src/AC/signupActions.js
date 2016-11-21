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

export function userForgotPasswordRequest(email) {
  console.log(email);
  return dispatch => {
    return axios({
      method: "post",
      url: "/forgotPassword",
      data: email,
      headers: {
          'Content-Type': 'application/json'
      }
    })
  }
}

export function userActivateRequest() {
  return dispatch => {
    return axios({
      method: "post",
      url: "/activation",
      data: {activation_token: "b384f34edf7f7bfaba4b6a5f24eff6ee"},
      headers: {
          'Content-Type': 'application/json'
      }
    })
  }
}
