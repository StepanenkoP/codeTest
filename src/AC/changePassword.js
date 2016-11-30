import axios from 'axios'

export function userChangePassword(userData) {
  return dispatch => {
    return axios({
      method: "post",
      url: "/api/changePassword",
      data: userData,
       headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.token
      }
    })
  }
}
