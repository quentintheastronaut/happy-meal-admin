import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import styles from './index.less';
import logo from '@/assets/images/logo.png';
import mapStateToProps from './mapStateToProps';
import { connect } from 'umi';

const LoginPage: React.FC = (props) => {
  const { loadingLogin, login } = props;

  const onFinish = async (values: any) => {
    console.log('Success:', values);
    await login(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.section}`}>
        <div className={`${styles.left}`}>
          <div>
            <img className={`${styles.logo}`} src={logo} alt="Logo" />
          </div>
          <div className={`${styles.title}`}>Happy Meal</div>
          <h3 className={`${styles.slogan}`}>Healthy meal - Happy life</h3>
        </div>
      </div>
      <div className={`${styles.section}`}>
        <div className={`${styles.right}`}>
          <div className={`${styles.loginHeader}`}>
            <div>Welcome to</div>
            <h1>Happy Meal</h1>

            <div>Admin site</div>
          </div>
          <div className={`${styles.loginForm}`}>
            <Form
              layout="vertical"
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="email"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loadingLogin}>
                  Sign in
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  login: (payload: any) => dispatch({ type: 'auth/login', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
