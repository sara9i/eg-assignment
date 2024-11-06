/* eslint-disable no-unused-vars */
import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loginFormSchema } from '../../../pages/Auth/constants';
import { validate } from '../../../utilities/validationHelper';

const LoginForm = () => {
  const [form] = Form.useForm();
  const [errors, setErrors] = useState({});

  const login = async (values) => {
    const formData = { email: values?.email, password: values?.password };
    const isValid = await validate({
      schema: loginFormSchema,
      formData,
      setErrors,
    });

    if (!isValid) {
      return;
    }

    const email = formData.email;
    const password = formData.password;
    console.log("email: ", email);
    console.log("password: ", password);
    console.log("login form errors: ", errors);
    
    //login request logic
  };

  return (
    <Form
      form={form}
      name="Login"
      initialValues={{ remember: true }}
      onFinish={login}
      layout="vertical"
      className="max-w-md p-8 mx-auto space-y-4 bg-white rounded-lg shadow-lg"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Please input your email!' },
          { type: 'email', message: 'Please enter a valid email' },
        ]}
      >
        <Input
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: 'Please input your password!' },
          {
            type: 'string',
            pattern:
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            message:
              'Password should be at least 8 characters with at least one letter, one number, and one special character',
          },
        ]}
      >
        <Input.Password
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="w-full p-3 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default connect()(LoginForm);