import {LOAD_ALLSTATS,LOAD_ALL_MESSAGES, LOAD_MESSAGE, SEND_MESSAGE, LOAD_ALL_PAYMENTS, GET_USER_INFO} from '../../types'

const initialState = {
  accountStats: {},
  allMessages: null,
  messageById: null,
  allPayments: null,
  userInfo: null
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
      console.log(action.currentDate);
      return {
        ...state,
          messageById: {...state.messageById, [action.currentDate]: [...state.messageById[action.currentDate], action.payload]}
      }
    case LOAD_ALL_PAYMENTS:
      return {
        ...state,
          allPayments: action.payload
      }
    case GET_USER_INFO:
      return {
        ...state,
          userInfo: action.payload
      }
    default:
    return state
  }
}
