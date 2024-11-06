import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../../components/Navbar';
import WelcomeNote from '../../components/WelcomeNote/WelcomeNote';

const HomeContainer = () => {
  const logOut = () => {
    //logout logic
  };
  if (true) { //modify to display only for loggedin users
    return (
      <div className="overflow-hidden">
        <div className="flex flex-row bg-[#fbf8ef]">
          <div className="flex flex-col flex-grow min-h-screen">
            <NavBar logoutClick={logOut} />
            <div className="flex items-center justify-center flex-grow">
              <div className="h-full max-w-[1550px] bg-white shadow-lg p-8 w-full md:w-[calc(100%-28rem)] md:px-20">
                <WelcomeNote userName={'User'}></WelcomeNote>
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