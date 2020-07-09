import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { createPromise } from 'redux-promise-middleware';
import SingInReducer from "./common/reducers/user";
import findProjectReducer from "./userWorkspace/reducers/project";
import getIssuesReducer from "./userWorkspace/reducers/issue";

const reducers = combineReducers({
    userData: SingInReducer,
    project: findProjectReducer,
    issue: getIssuesReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(createPromise())));

export default store;