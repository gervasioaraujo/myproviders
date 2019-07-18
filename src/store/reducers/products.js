import {
  CREATED_PRODUCT,
  GET_PROVIDER_PRODUCTS,
  UPDATED_PRODUCT,
  CLEAN_PRODUCT_STATE
} from '../actions/actionTypes';

const initialState = {
  products: [],
  error: false,
  message: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATED_PRODUCT:
      return {
        ...state,
        error: false,
        message: action.successMsg
      }
    case UPDATED_PRODUCT:
      return {
        ...state,
        error: false,
        message: action.successMsg
      }
    case GET_PROVIDER_PRODUCTS:
      return {
        ...state,
        products: action.products
      }
    case CLEAN_PRODUCT_STATE:
      return {
        ...state,
        error: false,
        message: ''
      }
    default:
      return state
  }
}

export default reducer;
