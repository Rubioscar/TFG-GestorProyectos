import { getIssues }  from '../actions/issue';

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
          projects: false,
          error: true
        }
      default:
        return state;
    }
}

export default getIssuesReducer;