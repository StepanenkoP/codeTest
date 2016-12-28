import React from 'react'
import {Route, IndexRoute} from 'react-router'
import {browserHistory} from 'react-router'
import SignupPage from './components/signup/SignupPage'
import LoginPage from './components/login/LoginPage'
import ForgotPage from './components/forgotpassword/ForgotPage'
import SuccessPage from './components/success/SuccessPage'
import SettingsPage from './components/settings/SettingsPage'
import AdversPage from './components/advers/AdversPage'
import CampaignsPage from './components/campaigns/CampaignsPage'
import CreateAd from './components/advers/CreateAd'
import EditAd from './components/advers/EditAd'
import AdStats from './components/advers/AdStats'
import CreateCampaign from './components/campaigns/CreateCampaign'
import EditCampaign from './components/campaigns/EditCampaign'
import NoPage from './components/404/NoPage'
import FeedbackPage from './components/feedback/FeedbackPage'
import MessagesPage from './components/messages/MessagesPage'
import PaymentPage from './components/payment/PaymentPage'
import SendPaymentPage from './components/payment/SendPaymentPage'
import SendCardPage from './components/payment/SendCardPage'
import SendPaypalPage from './components/payment/SendPaypalPage'
import UsersPage from './components/users/UsersPage'
import Message from './components/messages/Message'
import AllAdvertsPage from './components/adminAdverts/AllAdvertsPage'
import App from './components/App'
import {store} from './index'
import axios from 'axios'
import {ADD_FLASH_MESSAGE} from './types'

const needLogout = () => {
  localStorage.clear()
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
  if (window.location.href.indexOf("?token") !== -1) {
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
  if (window.location.href.indexOf("recovery_token") !== -1) {
    let obj = window.location.href.split("=");
    let token = obj[obj.length - 1];
    axios({
      method: "post",
      url: "/api/account_recovery",
      data: {recovery_token: token},
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
  console.log(browserHistory.getCurrentLocation().pathname === '/');
  if (browserHistory.getCurrentLocation().pathname === '/' && localStorage.userType === 'admin') {
    browserHistory.push('/users');
  }
  if (browserHistory.getCurrentLocation().pathname === '/users' && localStorage.userType !== 'admin') {
    browserHistory.push('/');
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
    <Route path='advers_list' component={AdversPage} onEnter={needLogin}>
      <Route path=':id' component={EditAd} />
      <Route path='stats/:id' component={AdStats} />
    </Route>
    <Route path='campaign_list' component={CampaignsPage} onEnter={needLogin}>
      <Route path=':id' component={EditCampaign} />
    </Route>
    <Route path='create_ad' component={CreateAd} onEnter={needLogin}/>
    <Route path='feedback' component={FeedbackPage} onEnter={needLogin}/>
    <Route path='payments' component={PaymentPage} onEnter={needLogin}>
      <Route path='send' component={SendPaymentPage}/>
      <Route path='card' component={SendCardPage} />
      <Route path='paypal' component={SendPaypalPage} />
    </Route>
    <Route path='messages' component={MessagesPage} onEnter={needLogin}>
      <Route path=':id' component={Message} />
    </Route>
    <Route path='create_campaign' component={CreateCampaign} onEnter={needLogin}/>
    <Route path='users' component={UsersPage} onEnter={needLogin}/>
    <Route path='adverts' component={AllAdvertsPage} onEnter={needLogin}/>
    <Route path='*' component={NoPage}/>
  </Route>
)
