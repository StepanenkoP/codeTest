import axios from 'axios'

import {LOAD_ALLSTATS} from '../types'

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
