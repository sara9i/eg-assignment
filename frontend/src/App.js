import React, { Suspense, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import ErrorPage from './components/Common/ErrorPage/ErrorPage';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import HomeContainer from './pages/HomeContainer';
import store from './stores/configureStore';
import Auth from './modules/auth';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if the user is authenticated on initial load
    if (!Auth.isAuthenticated() && location.pathname !== '/sign-up') {
      // Maintain existing search parameters when redirecting to login
      const loginPath = {
        pathname: '/login',
        search: location.search, // Preserve query params
      };
      navigate(loginPath);
    }
  }, [navigate, location]);
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
            <Route path="/logout" element={<Navigate to="/login" />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </Provider>
    </div>
  );
}

export default App;
