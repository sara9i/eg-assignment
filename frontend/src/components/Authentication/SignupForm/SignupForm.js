/* eslint-disable no-unused-vars */
import { Button, Form, Input, Row } from 'antd';
import React from 'react';
import { connect } from 'react-redux';

const className = 'c-AuthForm';

function SignupForm({ dispatch }) {
  const [form] = Form.useForm();

  const signUp = (values) => {
    //signup backend request logic
  };

  return (
    <div className={`${className}__form__wrapper`}>
      <Form
        form={form}
        name="Login"
        initialValues={{ remember: true }}
        onFinish={signUp}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input placeholder="Name" className={`${className}__email__input`} />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input placeholder="Email" className={`${className}__email__input`} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Please input your password!' },
            {
              type: 'string',
              pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              message:
                'Password should be at least 8 characters with at least one letter, one number and one special character',
            },
          ]}
        >
          <Input.Password
            placeholder="Password"
            className={`${className}__password__input`}
          />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="cpassword"
          rules={[
            { required: true, message: 'Please confirm your password!' },
            {
              type: 'string',
              pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              message:
                'Password should be at least 8 characters with at least one letter, one number and one special character',
            },
          ]}
        >
          <Input.Password
            placeholder="Confirm Password"
            className={`${className}__password__input`}
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
              >
                Sign Up
              </Button>
            )}
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
}

export default connect()(SignupForm);