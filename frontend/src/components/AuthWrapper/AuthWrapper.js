import queryString from 'query-string';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { startLoginCheck } from '../../actions/auth';
import Auth from '../../modules/auth';

const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const setTokens = async (uriToken, uriRefreshToken) => {
    Auth.setUriTokens(uriToken, uriRefreshToken);
  };

  useEffect(() => {
    const loginWithToken = async () => {
      const parsedParamsObj = queryString.parse(window.location.search);
      const uriToken = parsedParamsObj?.token;
      const uriRefreshToken = parsedParamsObj?.refreshToken;
      const pathnameWithParams = `${location.pathname}${location.search}`;

      if (uriToken) {
        Auth.deauthenticateUser();
        await setTokens(uriToken, uriRefreshToken);
        dispatch(
          startLoginCheck(uriToken, pathnameWithParams, '', navigate)
        );
      } else {
        Auth.deleteUriTokens();
        const email = parsedParamsObj?.email;
        const token = Auth.getUserToken();
        const refreshToken = Auth.getRefreshToken();
        dispatch(
          startLoginCheck(token, pathnameWithParams, email, navigate)
        );
      }
    };

    loginWithToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  return <div className="c-AuthWrapper">{children}</div>;
};

export default AuthWrapper;