import React from 'react'
import {Route} from 'react-router'
import SignupPage from './components/signup/SignupPage'
import App from './components/App'

export default (
  <Route path='/' component={App}>
    <Route path='signup' component={SignupPage}/>
  </Route>
)
