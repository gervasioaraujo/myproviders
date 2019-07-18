import { createStore, combineReducers } from 'redux';
import providersReducer from './reducers/providers';
import productsReducer from './reducers/products';
// import filtersReducer from './reducers/filters';

const reducers = combineReducers({
    providersReducer,
    productsReducer
    // filtersReducer
})

const storeConfig = () => {
    return createStore(reducers);
}

export default storeConfig;