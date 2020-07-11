import { getIssues, getIssuesStatus }  from '../actions/issue';
import { combineReducers } from "redux";

// Estado inicial
const initialState = {
    isLoading: false,
    issues: [],
    error: false
}

const getIssuesReducer = (state = initialState, action) => {
    switch(action.type) {
      case String(getIssues.pending):
        return {
          ...state,
          isLoading: true,
          error: false
        };
      case String(getIssues.fulfilled):
        return {
          ...state,
          isLoading: false,
          issues: action.payload,
          error: false
        }
      case String(getIssues.rejected):
        return {
          ...state,
          isLoading: false,
          error: true
        }
      default:
        return state;
    }
}

const initialState2 = {
  isLoading: false,
  status: [],
  error: false
}

const getStatusReducer = (state = initialState2, action) => {
  switch(action.type) {
    case String(getIssuesStatus.pending):
      return {
        ...state,
        isLoading: true,
        error: false
      };
    case String(getIssuesStatus.fulfilled):
      return {
        ...state,
        isLoading: false,
        status: action.payload,
        error: false
      }
    case String(getIssuesStatus.rejected):
      return {
        ...state,
        isLoading: false,
        error: true
      }
    default:
      return state;
  }
}

export default combineReducers({
  issues: getIssuesReducer,
  status: getStatusReducer
}
);