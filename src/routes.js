import React from 'react'
import {Route, IndexRoute} from 'react-router'
import SignupPage from './components/signup/SignupPage'
import App from './components/App'

export default (
  <Route path='/'>
    <IndexRoute component={App} />
    <Route path='signup' component={SignupPage}/>
  </Route>
)
