import React from 'react'
import {Route, IndexRoute} from 'react-router'
import SignupPage from './components/signup/SignupPage'
import LoginPage from './components/login/LoginPage'
import ForgotPage from './components/forgotpassword/ForgotPage'
import SuccessPage from './components/success/SuccessPage'
import NoPage from './components/404/NoPage'
import App from './components/App'

export default (
  <Route path='/'>
    <IndexRoute component={App} />
    <Route path='signup' component={SignupPage}/>
    <Route path='login' component={LoginPage}/>
    <Route path='forgot' component={ForgotPage}/>
    <Route path='success' component={SuccessPage}/>
    <Route path='*' component={NoPage}/>
  </Route>
)
