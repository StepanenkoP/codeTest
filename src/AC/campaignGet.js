import axios from 'axios'
import {LOAD_CAMPAIGNS, LOAD_CAMPAIGN, DELETE_CAMPAIGN} from '../types'

export function getCampaignList(data) {
  return dispatch => {
    return axios({
      method: "get",
      url: `/api/campaign?page=${data}`,
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

export function editCampaign(data) {
  return dispatch => {
    return axios({
      method: "put",
      url: `/api/campaign/${data.id}`,
      data: data.formData,
      headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.token
      }
    })
  }
}

export function deleteCampaign(id) {
  return dispatch => {
    return axios({
      method: "delete",
      url: `/api/campaign/${id}`,
      headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.token
      }
    }).then(
      r => dispatch({
        type: DELETE_CAMPAIGN,
        payload: r.data
      })
    )
  }
}
