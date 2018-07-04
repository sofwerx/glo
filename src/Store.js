import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';


export const configureStore = (initialState) => {
    const middleware = [];

    const appliedMiddleware = applyMiddleware(...middleware);
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    let store = createStore(rootReducer, initialState, composeEnhancers(appliedMiddleware));
    return store;
};