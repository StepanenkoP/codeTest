import {LOAD_ALLSTATS} from '../../types'

const initialState = {
  accountStats: {}
}

export default (state = initialState, action) => {
  switch(action.type) {
    case LOAD_ALLSTATS:
      return {
        ...state,
          accountStats: action.payload
      }
      return state
    default:
    return state
  }
}
