import { findOneProject }  from '../actions/project';

// Estado inicial
const initialState = {
    isLoading: false,
    projects: {},
    error: false
}

const findProjectReducer = (state = initialState, action) => {
    switch(action.type) {
      case String(findOneProject.pending):
        return {
          ...state,
          isLoading: true,
          error: false
        };
      case String(findOneProject.fulfilled):
        return {
          ...state,
          isLoading: false,
          projects: action.payload,
          error: false
        }
      case String(findOneProject.rejected):
        return {
          ...state,
          projects: false,
          error: true
        }
      default:
        return state;
    }
}

export default findProjectReducer;