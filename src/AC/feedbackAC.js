import axios from 'axios'


export function postFeedback(data) {
  return dispatch => {
    return axios({
      method: "post",
      data: data,
      url: `/api/feedback`,
      headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.token
      }
    })
  }
}
