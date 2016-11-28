import React, { Component } from 'react';
import logo from '../../img/signup/logo.png'
import SignupForm from './SignupForm'
import FlashList from '../flash/FlashList'

class SignupPage extends Component {
  componentDidMount= () => {
    document.title = "Signup - Micro Advertising Portal";
  }
  render() {
    return (
      <div className="auth_wrapper">
        <FlashList />
        <div className="auth_wrapper__logo"><img src={logo} alt="alt"/></div>
        <SignupForm />
      </div>
    );
  }
}

export default SignupPage;
