import axios from 'axios';
import keys from '../config/keys';
import Auth from '../modules/auth';

import { setLoading, setLoginFailed } from './main';
import { setUser } from './user';

const { baseURL } = keys;

export const login = (id, user) => ({
  type: 'LOGIN',
  id,
  user,
});

export const signup = (user) => ({
  type: 'SIGNUP',
  user,
});

export const logout = () => ({
  type: 'LOGOUT',
});

const _checkFieldNotEmpty = (field) => field && field !== '';

const _passwordIsStrong = (password) => {
  const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})');
  return strongRegex.test(password);
};

export const startSignUp = (
  name,
  email,
  password,
  confirmPassword,
  token,
  navigate
) => {
  return (dispatch) => {
    dispatch(setLoading(true));

    const dt = token ? { name, email, password, token } : { name, email, password };
    if (_checkFieldNotEmpty(password) && _checkFieldNotEmpty(confirmPassword) && password === confirmPassword) {
      if (!_passwordIsStrong(password)) {
        dispatch(setLoading(false));
        dispatch(setLoginFailed('Please choose a stronger password. Password has to contain at least 1 uppercase alphabetical character, 1 lowercase alphabetical character, 1 numeric character and eight characters or longer'));
      } else {
        axios
          .post(`${baseURL}/auth/signup`, dt, { withCredentials: true })
          .then((response) => {
            const { token, refreshToken, user } = response.data;

            // Set user data
            Auth.authenticateUser(user, token);
            Auth.setTokens(token, refreshToken);

            dispatch(setUser(user));
            dispatch(setLoginFailed(false));
            dispatch(login(user._id, user));
            dispatch(setLoading(false));
            navigate('/');
          })
          .catch((err) => {
            console.log(err);
            dispatch(setLoading(false));
          });
      }
    } else {
      dispatch(setLoginFailed('Invalid password'));
      dispatch(setLoading(false));
    }
  };
};

const _authenticationPromise = (callback) => new Promise((resolve) => resolve(callback));

const _postLoginProcess = (userData, token, refreshToken, dispatch) => {
  Auth.authenticateUser(userData, token);
  Auth.setTokens(token, refreshToken);
  dispatch(setUser(userData));
};

export const startLogin = (email, password, currentRoute, navigate) => {
  return (dispatch) => {
    const dt = { email, password };
    dispatch(setLoading(true));

    axios
      .post(`${baseURL}/auth/login`, dt, { withCredentials: true })
      .then((response) => {
        const { token, refreshToken, user } = response.data;

        _authenticationPromise(_postLoginProcess(user, token, refreshToken, dispatch)).then(() => {
          dispatch(setLoginFailed(false));
          dispatch(login(user._id, user));
          dispatch(setLoading(false));

          if (!currentRoute || currentRoute.includes('/login')) {
            navigate('/');
          } else {
            navigate(currentRoute);
          }
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch(setLoading(false));
      });
  };
};

export const startLoginCheck = (token, currentRoute, email = '', navigate) => {
  return (dispatch) => {
    if (token) {
      dispatch(setLoginFailed(false));
      dispatch(setLoading(false));

      if (currentRoute === '/login') {
        navigate('/');
      } else {
        navigate(currentRoute || '/');
      }
    } else {
      dispatch(setLoginFailed(true));
      const emailParam = email ? `?email=${encodeURIComponent(email)}` : '';
      navigate(`/login${emailParam}`);
    }
  };
};

export const startLogout = (navigate) => {
  return (dispatch) => {
    Auth.deauthenticateUser();
    sessionStorage.clear();
    dispatch(setLoginFailed(false));
    dispatch(logout());
    navigate('/login');
  };
};

export const setLoginFailStatus = (message) => (dispatch) => {
  dispatch(setLoginFailed(message));
};