import {LOAD_COUNTRIES, LOAD_DAYS, LOAD_TIMES, LOAD_AGES, LOAD_WEBSITES} from '../../types'

export default (state = {}, action) => {
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
    default:
    return state
  }
}
