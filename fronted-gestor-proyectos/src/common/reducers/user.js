import singInAction from '../actions/user';

// Estado inicial
const initialState = {
    isLoading: false,
    user: {},
    error: false
}

const singInReducer = (state = initialState, action) => {
    switch(action.type) {
      case String(singInAction.pending):
        return {
          ...state,
          isLoading: true,
          error: false
        };
      case String(singInAction.fulfilled):
        return {
          ...state,
          isLoading: false,
          user: action.payload,
          error: false
        }
      case String(singInAction.rejected):
        return {
          ...state,
          isLoading: false,
          error: true
        }
      default:
        return state;
    }
}

export default singInReducer;