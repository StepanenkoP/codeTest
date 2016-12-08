import {LOAD_ADS, LOAD_AD} from '../../types'

const initialState = {
  adsList: [],
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
      default:
      return state
    }
}
