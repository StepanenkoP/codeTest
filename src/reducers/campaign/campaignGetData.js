import {LOAD_COUNTRIES, LOAD_DAYS, LOAD_TIMES, LOAD_AGES, LOAD_WEBSITES, LOAD_CAMPAIGNS, LOAD_CAMPAIGN} from '../../types'

const initialState = {
  countriesList: [],
  daysList: [],
  timesList: [],
  agesList: [],
  websitesList: [],
  campaignList: [],
  campaign: {}
}

export default (state = initialState, action) => {
  switch(action.type) {
    case LOAD_COUNTRIES:
      return {
        ...state,
        countriesList: action.payload
      }
    case LOAD_DAYS:
      return {
        ...state,
        daysList: action.payload
      }
    case LOAD_TIMES:
      return {
        ...state,
        timesList: action.payload
      }
    case LOAD_AGES:
      return {
        ...state,
        agesList: action.payload
      }
    case LOAD_WEBSITES:
      return {
        ...state,
        websitesList: action.payload
      }
    case LOAD_CAMPAIGNS:
      return {
        ...state,
        campaignList: action.payload
      }
    case LOAD_CAMPAIGN:
      return {
        ...state,
        campaign: action.payload
      }
    default:
    return state
  }
}
