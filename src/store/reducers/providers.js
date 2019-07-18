import {
  CREATED_PROVIDER,
  ERROR_CREATE_PROVIDER,
  GET_PROVIDER,
  GET_PROVIDERS,
  UPDATED_PROVIDER,
  DELETED_PROVIDER,
  CLEAN_PROVIDER_STATE,
  SEARCHED_PROVIDER
} from '../actions/actionTypes';

const initialState = {
  providers: [],
  error: false,
  message: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATED_PROVIDER:
      return {
        ...state,
        error: false,
        message: action.successMsg
      }
    case ERROR_CREATE_PROVIDER:
      return {
        ...state,
        error: true,
        message: action.errorMsg
      }
    case UPDATED_PROVIDER:
      return {
        ...state,
        error: false,
        message: action.successMsg
      }
    case DELETED_PROVIDER:
      return {
        ...state,
        error: false,
        message: action.successMsg
      }
    case GET_PROVIDER:
      return {
        ...state,
      }
    case GET_PROVIDERS:
      return {
        ...state,
        providers: action.providers
      }
    case CLEAN_PROVIDER_STATE:
      return {
        ...state,
        error: false,
        message: ''
      }
    case SEARCHED_PROVIDER:
      return {
        ...state,
        providers: action.providers
      }
    default:
      return state
  }
}

export default reducer;
