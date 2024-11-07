import React, { useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../../actions/auth';
import NavBar from '../../components/Navbar';
import WelcomeNote from '../../components/WelcomeNote/WelcomeNote';
import Auth from '../../modules/auth';

const HomeContainer = ({ dispatch }) => {
  const user = Auth.getUserData();
  const navigate = useNavigate();
  const location = useLocation();
  
  const parsedParamsObj = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const parsedParams = {};
    params.forEach((value, key) => {
      parsedParams[key] = value;
    });
    return parsedParams;
  }, [location.search]);

  useEffect(() => {
    // Use parsedParamsObj or perform any side effects with it
    console.log(parsedParamsObj);
  }, [parsedParamsObj]);

  const logOut = () => {
    dispatch(startLogout(navigate));
  };
  
  if (user) {
    return (
      <div className="overflow-hidden">
        <div className="flex flex-row bg-[#fbf8ef]">
          <div className="flex flex-col flex-grow min-h-screen">
            <NavBar logoutClick={logOut} />
            <div className="flex items-center justify-center flex-grow">
              <div className="h-full max-w-[1550px] bg-white shadow-lg p-8 w-full md:w-[calc(100%-28rem)] md:px-20">
                <WelcomeNote userName={user?.name}></WelcomeNote>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default connect()(HomeContainer);