import {combineReducers} from 'redux'
import flashMessages from './flash/flashMessages'
import campaignGetData from './campaign/campaignGetData'

export default combineReducers({
  flashMessages,
  campaignGetData
})
