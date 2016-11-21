import React from 'react'
import {Route, IndexRoute} from 'react-router'
import {browserHistory} from 'react-router'
import SignupPage from './components/signup/SignupPage'
import LoginPage from './components/login/LoginPage'
import ForgotPage from './components/forgotpassword/ForgotPage'
import SuccessPage from './components/success/SuccessPage'
import NoPage from './components/404/NoPage'
import App from './components/App'

const resetStorage = () => {
  localStorage.clear()
}

const needLogout = () => {
  if (localStorage.token) {
    alert("To do this you need to logout!");
    browserHistory.push('/');
  }
}

const needLogin = () => {
  if (!localStorage.token) {
    alert("Please log in!");
    browserHistory.push('/login');
  }
}

export default (
  <Route path='/'>
    <IndexRoute component={App} onEnter={needLogin}/>
    <Route path='signup' component={SignupPage} onLeave={resetStorage} onEnter={needLogout}/>
    <Route path='login' component={LoginPage} onEnter={needLogout}/>
    <Route path='forgot' component={ForgotPage} onEnter={needLogout}/>
    <Route path='success' component={SuccessPage} onEnter={needLogout}/>
    <Route path='*' component={NoPage} onEnter={needLogout}/>
  </Route>
)
