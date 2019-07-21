import { createStore, combineReducers } from 'redux';
import providersReducer from './reducers/providers';
import providerFormReducer from './reducers/providerForm';
import productsReducer from './reducers/products';

const reducers = combineReducers({
    providersReducer,
    providerFormReducer,
    productsReducer
})

const storeConfig = () => {
    return createStore(reducers);
}

export default storeConfig;