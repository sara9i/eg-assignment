/* eslint-disable no-unused-vars */
import { Button, Form, Input, Alert, Row } from 'antd';
import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { startLogin } from '../../../actions/auth';
import { loginFormSchema } from '../../../pages/Auth/constants';
import { validate } from '../../../utilities/validationHelper';

const LoginForm = ({ dispatch }) => {
  const [form] = Form.useForm();
  const [errors, setErrors] = useState({});
  const [apiErrors, setApiErrors] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  // Parse email from URL query parameters
  const emailFromUrl = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('email');
  }, [location.search]);

  useEffect(() => {
    // Use emailFromUrl or perform any side effects with it
    console.log(emailFromUrl);
  }, [emailFromUrl]);

  useEffect(() => {
    // Set the initial value for email field if email param is found
    if (emailFromUrl) {
      form.setFieldsValue({ email: emailFromUrl });
    }
  }, [emailFromUrl, form]);

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
    dispatch(startLogin(email, password, setApiErrors, navigate));
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
              Log in
            </Button>
          )}
        </Form.Item>
      </Row>

      {apiErrors && (
        <Alert
          message="Error"
          description={apiErrors}
          type="error"
          showIcon
          closable
          className="mb-4"
        />
      )}
    </Form>
  );
};

export default connect()(LoginForm);