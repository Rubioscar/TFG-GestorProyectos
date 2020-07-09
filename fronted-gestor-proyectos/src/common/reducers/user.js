import { singInAction, changePass }  from '../actions/user';

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
      case String(changePass.pending):
        return {
          ...state,
          isLoading: true,
          error: false
        };
      case String(changePass.fulfilled):
        return {
          ...state,
          isLoading: false,
          user: action.payload,
          error: false
        }
      case String(changePass.rejected):
        return {
          ...state,
          isLoading: false,
          error: true
        }
      case "SET_USER":
        return {
          ...state,
          isLoading: false,
          user: action.payload,
          error: false
        }
      default:
        return state;
    }
}

export default singInReducer;