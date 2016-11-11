import React, { Component } from 'react';
import logo from '../../img/signup/logo.png'
import ForgotForm from './ForgotForm'

class ForgotPage extends Component {
  render() {
    return (
      <div className="auth_wrapper">
        <div className="auth_wrapper__logo"><img src={logo} alt="alt"/></div>
        <ForgotForm />
      </div>
    );
  }
}

export default ForgotPage;
