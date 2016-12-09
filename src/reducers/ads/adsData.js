import {LOAD_ADS, LOAD_AD, DELETE_AD} from '../../types'

const initialState = {
  adsList: {
    advertisement_array: [],
    advertisement_count: null
  },
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
      default:
      return state
    }
}
