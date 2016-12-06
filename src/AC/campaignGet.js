import axios from 'axios'
import {LOAD_CAMPAIGNS, LOAD_CAMPAIGN, EDIT_CAMPAIGN} from '../types'

export function getCampaignList() {
  return dispatch => {
    return axios({
      method: "get",
      url: "/api/campaign",
      headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.token
      }
    }).then(
      r => dispatch({
        type: LOAD_CAMPAIGNS,
        payload: r.data
      })
    )
  }
}

export function getCampaign(id, data) {
  return dispatch => {
    return axios({
      method: "get",
      url: `/api/campaign/${id}`,
      data: data,
      headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.token
      }
    }).then(
      r => dispatch({
        type: LOAD_CAMPAIGN,
        payload: r.data
      })
    )
  }
}

export function editCampaign(id) {
  return dispatch => {
    return axios({
      method: "put",
      url: `/api/campaign/${id}`,
      headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.token
      }
    }).then(
      r => dispatch({
        type: EDIT_CAMPAIGN,
        payload: r.data
      })
    )
  }
}
