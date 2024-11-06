import React from 'react';
import { Link } from 'react-router-dom';
import SignupForm from '../../../components/Authentication/SignupForm';
import Image from '../../../components/Image';
import { Card } from 'antd';
import { sideImageData } from '../constants';
import SplitScreen from '../../../components/Layout/SplitScreen';

const LeftSide = () => (
  <div className="fixed left-0 hidden transform -translate-y-1/2 lg:block top-1/2 h-[800px] w-full">
    <div className="relative flex flex-col items-center justify-center h-full">
      <Image
        {...sideImageData}
        className="absolute top-0 left-0 object-cover w-full h-full"
      />
    </div>
  </div>
);

const RightSide = () => (
  <Card title="Sigup" bordered={false}>  
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative z-10 w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <SignupForm />
        <div className="mt-6 text-sm text-center text-gray-500 font-poppins">
          <span>Already a member? </span>
          <Link to="/login" className="text-blue-500 underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  </Card>
);

const SignupPage = () => (
  <SplitScreen leftWidth={1} rightWidth={2}>
    <LeftSide />
    <RightSide />
  </SplitScreen>
);

export default SignupPage;