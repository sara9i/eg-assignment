import { createStore } from 'redux';

let initState = {
  user: null,
  accessToken: '',
  refreshToken: '',
  isUserLoggedIn: false,
};

function AuthReducer(state = initState, action) {
  if (action.type === 'AUTH/LOG_IN') {
    let newState = {
      ...state,
      isUserLoggedIn: true,
      user: action.payload.user,
      accessToken: action.payload.accessToken,
      refreshToken: action.payload.refreshToken,
    };
    window.localStorage.setItem(
      'auth',
      JSON.stringify({
        ...newState,
      })
    );
    return {
      ...newState,
    };
  }
  if (action.type === 'AUTH/LOG_OUT') {
    window.localStorage.clear();
    return {
      ...initState,
    };
  }
}

export const getRefreshToken = (state) =>
  state.isUserLoggedIn ? state.refreshToken : null;

export const getAccessToken = (state) =>
  state.isUserLoggedIn ? state.accessToken : null;

export const getLoggedInUser = (state) =>
  state.isUserLoggedIn ? state.user : null;

export const isUserLoggedIn = (state) => (state ? state.isUserLoggedIn : false);

export default createStore(AuthReducer, initState);
