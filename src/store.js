import { createStore } from "@reduxjs/toolkit";

export const store = createStore(reducer);

function reducer(state = { isLoggedIn: false, token:undefined, user:undefined}, action) {
  if (action.type === "setToken"){
    return{
    ...state,
    token: action.payload,
    isLoggedIn: !state.isLoggedIn,
    }
  }
  if (action.type === "setUser"){
    return{
      ...state,
      user:action.payload,
    }
  }
  return state;
}
