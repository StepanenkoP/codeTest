import React, { Component } from 'react';
import logo from '../../img/signup/logo.png'

class LoginPage extends Component {
  render() {
    return (
      <div className="auth_wrapper">
        <div className="auth_wrapper__logo"><img src={logo} alt="alt"/></div>
        LOGIN
      </div>
    );
  }
}

export default LoginPage;
