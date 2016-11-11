import React, { Component } from 'react';
import logo from '../../img/signup/logo.png'

class ForgotPage extends Component {
  render() {
    return (
      <div className="auth_wrapper">
        <div className="auth_wrapper__logo"><img src={logo} alt="alt"/></div>
        Forgot password
      </div>
    );
  }
}

export default ForgotPage;
