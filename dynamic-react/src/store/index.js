import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

//switch cases
const switch_frame = "frame/INCREMENT";
const set_error = "error/NEW_ERROR";

//actions
const increment = (frame_index) => ({
  type: switch_frame,
  frame_index,
});

const new_error = (error) => ({
  type: set_error,
  error,
});

//thunks
export const increment_frame = () => async (dispatch) => {
  const response = await fetch(`/api/main/get-index`);

  if (response.ok) {
    const { frame_index } = await response.json();
    dispatch(increment(frame_index));
  } else {
    const error = {
      status_code: response.status,
      error_desc: "increment_frame failed",
    };
    dispatch(new_error(error));
  }
};

//reducer
const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case switch_frame:
      return {
        ...state,
        frame: action.frame_index
      };
    case set_error:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

//apply redux middlewares to make reducer work
const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

const store = createStore(rootReducer, composedEnhancer);

//sends store to react entrypoint
export default store;
