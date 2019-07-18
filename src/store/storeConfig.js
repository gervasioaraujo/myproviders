import { createStore, combineReducers } from 'redux';
import providersReducer from './reducers/providers';
import productsReducer from './reducers/products';

const reducers = combineReducers({
    providersReducer,
    productsReducer
})

const storeConfig = () => {
    return createStore(reducers);
}

export default storeConfig;