import {LOAD_ADS, LOAD_AD, DELETE_AD, GET_AD_STATS} from '../../types'

const initialState = {
  adsList: {
    advertisement_array: [],
    advertisement_count: null
  },
  adStats: {},
  ad: {}
}

export default (state = initialState, action) => {
    switch(action.type) {
      case LOAD_ADS:
        return {
          ...state,
          adsList: action.payload
        }
      case LOAD_AD:
        return {
          ...state,
          ad: action.payload
        }
      case DELETE_AD:
        return {
          ...state,
          adsList: action.payload
        }
      case GET_AD_STATS:
        return {
          ...state,
          adStats: action.payload
        }
      default:
      return state
    }
}
