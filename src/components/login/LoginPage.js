import React, { Component } from 'react';
import logo from '../../img/signup/logo.png'
import LoginForm from './LoginForm'
import FlashList from '../flash/FlashList'

class LoginPage extends Component {
  componentDidMount= () => {
    document.title = "Login - Micro Advertising Portal";
  }
  render() {
    return (
      <div className="auth_wrapper">
        <FlashList />
        <div className="auth_wrapper__logo"><img src={logo} alt="alt"/></div>
        <LoginForm />
      </div>
    );
  }
}

export default LoginPage;
