import React, { Component } from 'react';
import logo from '../../img/signup/logo.png'
import SuccessForm from './SuccessForm'

class SuccessPage extends Component {
  render() {
    return (
      <div className="auth_wrapper">
        <div className="auth_wrapper__logo"><img src={logo} alt="alt"/></div>
        <SuccessForm />
      </div>
    );
  }
}

export default SuccessPage;
