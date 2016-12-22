import {LOAD_ALLSTATS,LOAD_ALL_MESSAGES, LOAD_MESSAGE, SEND_MESSAGE} from '../../types'

const initialState = {
  accountStats: {},
  allMessages: null,
  messageById: null
}

export default (state = initialState, action) => {

  switch(action.type) {
    case LOAD_ALLSTATS:
      return {
        ...state,
          accountStats: action.payload
      }
    case LOAD_ALL_MESSAGES:
      return {
        ...state,
          allMessages: action.payload
      }
    case LOAD_MESSAGE:
      return {
        ...state,
          messageById: action.payload
      }
    case SEND_MESSAGE:
      return {
        ...state,
          messageById: {...state.messageById, '2016-12-22': [...state.messageById['2016-12-22'], action.payload]}
      }
    default:
    return state
  }
}
