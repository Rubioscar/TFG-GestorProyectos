import { getIssues, getIssuesStatus, getIssuesTypes, getIssue }  from '../actions/issue';
import { combineReducers } from "redux";

// Estado inicial
const initialState = {
    isLoading: false,
    issues: [],
    issue:{},
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
      case String(getIssue.pending):
        return {
          ...state,
          isLoading: true,
          error: false
        };
      case String(getIssue.fulfilled):
        return {
          ...state,
          isLoading: false,
          issue: action.payload,
          error: false
        }
      case String(getIssue.rejected):
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

const initialState3 = {
  isLoading: false,
  types: [],
  error: false
}

const getTypesReducer = (state = initialState3, action) => {
  switch(action.type) {
    case String(getIssuesTypes.pending):
      return {
        ...state,
        isLoading: true,
        error: false
      };
    case String(getIssuesTypes.fulfilled):
      return {
        ...state,
        isLoading: false,
        types: action.payload,
        error: false
      }
    case String(getIssuesTypes.rejected):
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
  status: getStatusReducer,
  types: getTypesReducer
}
);