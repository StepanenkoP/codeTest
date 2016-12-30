import {GET_ALL_USERS, BLOCK_USER, GET_ALL_ADVERTS, APPROVE_AD, REJECT_AD, GET_FILTERED_ADVERTS, GET_FILTERED_USERS} from '../../types'
import update from 'react-addons-update'

const initialState = {
  allUsers: null,
  allAdverts: null
}

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload
      }
    case GET_FILTERED_USERS:
      return {
        ...state,
        allUsers: action.payload
      }
    case BLOCK_USER:
      const user = state.allUsers.data.filter(item => item.id == action.id)
      const userIndex = state.allUsers.data.indexOf(user[0])
      let newUser
      if (action.payload.action == 'activated') {
        newUser = update(state, {allUsers: {data: {[userIndex] : {blocked: {$set: 0}}}}})
      }
      if (action.payload.action == 'blocked') {
        newUser = update(state, {allUsers: {data: {[userIndex] : {blocked: {$set: 1}}}}})
      }
      return {
        ...state,
        allUsers: newUser.allUsers
      }
    case GET_ALL_ADVERTS:
      return {
        ...state,
        allAdverts: action.payload
      }
    case GET_FILTERED_ADVERTS:
      return {
        ...state,
        allAdverts: action.payload
      }
    case APPROVE_AD:
      const ad = state.allAdverts.data.filter(item => item.id == action.id)
      const adIndex = state.allAdverts.data.indexOf(ad[0])
      const newAd = update(state, {allAdverts: {data: {[adIndex] : {status: {$set: 'approved'}}}}})
      return {
        ...state,
        allAdverts: newAd.allAdverts
      }
    case REJECT_AD:
      const adRejected = state.allAdverts.data.filter(item => item.id == action.id)
      const adRejectedIndex = state.allAdverts.data.indexOf(adRejected[0])
      const newAdRejected = update(state, {allAdverts: {data: {[adRejectedIndex] : {status: {$set: 'rejected'}}}}})
      return {
        ...state,
        allAdverts: newAdRejected.allAdverts
      }
    default:
    return state
  }
}
