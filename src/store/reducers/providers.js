import {
  CREATED_PROVIDER,
  GET_PROVIDER_VIEW,
  GET_PROVIDERS,
  UPDATED_PROVIDER,
  DELETED_PROVIDER,
  CLEAN_PROVIDER_STATE,
  SEARCHED_PROVIDER
} from '../actions/actionTypes';

const initialState = {
  providers: [],
  selectedProvider: null,
  error: false,
  message: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROVIDERS:
      return {
        ...state,
        providers: action.providers
      }
    case GET_PROVIDER_VIEW: {
      const { provider } = action;
      return {
        ...state,
        selectedProvider: provider
      }
    }
    case CREATED_PROVIDER: {
      const { createdProvider } = action;
      return {
        ...state,
        // providers: state.providers.concat(createdProvider)
        providers: [...state.providers, createdProvider]
      }
    }
    case UPDATED_PROVIDER: {
      const { updatedProvider } = action;
      return {
        ...state,
        selectedProvider: updatedProvider,
        providers: state.providers.map(provider => {
          const { id } = provider;
          if (id === updatedProvider.id)
            return updatedProvider;
          else return provider;
        })
      }
    }
    case DELETED_PROVIDER: {
      const { deletedProviderId } = action;
      return {
        ...state,
        error: false,
        // message: action.successMsg,
        providers: state.providers.filter((provider) => provider.id !== deletedProviderId)
      }
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
