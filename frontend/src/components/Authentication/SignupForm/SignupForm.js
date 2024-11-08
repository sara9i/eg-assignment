/* eslint-disable no-unused-vars */
import { Button, Form, Input, Row, Alert } from 'antd';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { startSignUp } from '../../../actions/auth';

function SignupForm({ dispatch }) {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [errors, setErrors] = useState();

  const signUp = (values) => {
    dispatch(
      startSignUp(
        values?.name,
        values?.email,
        values?.password,
        values?.cpassword,
        values?.token,
        setErrors,
        navigate
      )
    );
  };

  return (
    <Form
      form={form}
      name="Signup"
      initialValues={{ remember: true }}
      onFinish={signUp}
      layout="vertical"
      className="max-w-md p-8 mx-auto space-y-4 bg-white rounded-lg shadow-lg"
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input
          placeholder="Name"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </Form.Item>

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

      <Form.Item
        label="Confirm Password"
        name="cpassword"
        rules={[
          { required: true, message: 'Please confirm your password!' },
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
          placeholder="Confirm Password"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </Form.Item>

      <Row justify="center">
        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
              className="w-full p-3 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
            >
              Sign Up
            </Button>
          )}
        </Form.Item>
      </Row>
      {errors && (
        <Alert
          message="Error"
          description={errors}
          type="error"
          showIcon
          closable
          className="mb-4"
        />
      )}
    </Form>
  );
}

export default connect()(SignupForm);