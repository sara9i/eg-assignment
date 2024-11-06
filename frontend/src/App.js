import React, { Suspense, lazy, useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import ErrorPage from './components/Common/ErrorPage/ErrorPage';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import HomeContainer from './pages/HomeContainer';
import store from './stores/configureStore';


function App() {

  return (
    <div>
      <Provider store={store}>
        <Suspense fallback={<div style={{ background: '#2c2d2e', height: '100%' }} />}>
          <Routes>
            <Route path="/" element={<HomeContainer />} />
            <Route
              path="/login"
              element={
                  <LoginPage />
              }
            />
            <Route path="/sign-up" element={<SignupPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </Provider>
    </div>
  );
}

export default App;
