import {combineReducers} from 'redux'
import flashMessages from './flash/flashMessages'
import campaignGetData from './campaign/campaignGetData'
import adsData from './ads/adsData'
import accountData from './account/accountData'
import adminInfo from './superAdmin/adminInfo'

export default combineReducers({
  flashMessages,
  campaignGetData,
  adsData,
  accountData,
  adminInfo
})
