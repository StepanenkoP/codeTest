import React from 'react'
import {Route, IndexRoute} from 'react-router'
import {browserHistory} from 'react-router'
import SignupPage from './components/signup/SignupPage'
import LoginPage from './components/login/LoginPage'
import ForgotPage from './components/forgotpassword/ForgotPage'
import SuccessPage from './components/success/SuccessPage'
import SettingsPage from './components/settings/SettingsPage'
import AdversPage from './components/advers/AdversPage'
import NoPage from './components/404/NoPage'
import App from './components/App'
import {store} from './index'
import axios from 'axios'
import {ADD_FLASH_MESSAGE} from './types'

const needLogout = () => {
  localStorage.removeItem('address');
  localStorage.removeItem('business_type_id');
  localStorage.removeItem('contact_number');
  if (localStorage.token) {
    store.dispatch({
      type: ADD_FLASH_MESSAGE,
      message : {
        type: 'error',
        text: "To do this you need to logout!"
      }
    })
    browserHistory.push('/');
  }
  if (window.location.href.indexOf("=") !== -1) {
    let obj = window.location.href.split("=");
    let token = obj[obj.length - 1];
    axios({
      method: "post",
      url: "/api/activation",
      data: {activation_token: token},
      headers: {
          'Content-Type': 'application/json'
      }
    }).then((r)=> {
      if (r.data.success === true) {
        browserHistory.push('/success');
      }
    })
  }
}

const needLogin = () => {
  if (!localStorage.token) {
    browserHistory.push('/login');
  }
}


export default (
  <Route path='/'>
    <IndexRoute component={App} onEnter={needLogin}/>
    <Route path='signup' component={SignupPage} onEnter={needLogout}/>
    <Route path='login' component={LoginPage} onEnter={needLogout}/>
    <Route path='forgot' component={ForgotPage} onEnter={needLogout}/>
    <Route path='success' component={SuccessPage} onEnter={needLogout}/>
    <Route path='settings' component={SettingsPage} onEnter={needLogin}/>
    <Route path='advers_list' component={AdversPage} onEnter={needLogin}/>
    <Route path='*' component={NoPage}/>
  </Route>
)
