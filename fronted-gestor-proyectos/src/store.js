import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { createPromise } from 'redux-promise-middleware';

const reducers = combineReducers({

});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(createPromise())));

export default store;