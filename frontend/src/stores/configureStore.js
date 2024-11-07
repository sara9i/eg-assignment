import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import authReducer from '../reducers/auth';
import mainReducer from '../reducers/main';
import userReducer from '../reducers/user';

const store = configureStore({
  reducer: {
    auth: authReducer,
    main: mainReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;