import React, { Component } from 'react';
import logo from '../../img/signup/logo.png'
import ForgotForm from './ForgotForm'
import FlashList from '../flash/FlashList'

class ForgotPage extends Component {
  componentDidMount= () => {
    document.title = "Forgot Password - Micro Advertising Portal";
  }
  render() {
    return (
      <div className="auth_wrapper">
        <FlashList />
        <div className="auth_wrapper__logo"><img src={logo} alt="alt"/></div>
        <ForgotForm />
      </div>
    );
  }
}

export default ForgotPage;
