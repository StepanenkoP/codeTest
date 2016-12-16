import {combineReducers} from 'redux'
import flashMessages from './flash/flashMessages'
import campaignGetData from './campaign/campaignGetData'
import adsData from './ads/adsData'
import accountData from './account/accountData'

export default combineReducers({
  flashMessages,
  campaignGetData,
  adsData,
  accountData
})
