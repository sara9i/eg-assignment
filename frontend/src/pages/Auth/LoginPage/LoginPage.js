import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../../components/Authentication/LoginForm';
import { Card } from 'antd';
import Image from '../../../components/Image';
import { sideImageData } from '../constants';
import SplitScreen from '../../../components/Layout/SplitScreen';

const LeftSide = () => (
  <div className="fixed left-0 flex items-center justify-center hidden w-full h-full transform -translate-y-1/2 bg-gray-100 lg:block top-1/2">
    <Image {...sideImageData} className="object-cover w-full h-full" />
  </div>
);

const RightSide = () => (
  <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
    <Card
      title="Login"
      bordered={false}
      className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg md:max-w-md lg:max-w-lg"
    >
      <LoginForm />
      <div className="mt-6 text-sm text-center text-gray-500 font-poppins">
        <span>Not a member? </span>
        <Link to="/sign-up" className="text-blue-500 underline">
          Signup
        </Link>
      </div>
    </Card>
  </div>
);

const LoginPage = () => {
  return (
    <div className="relative">
      <SplitScreen leftWidth={3} rightWidth={7}>
        <LeftSide />
        <RightSide />
      </SplitScreen>
    </div>
  );
};

export default LoginPage;