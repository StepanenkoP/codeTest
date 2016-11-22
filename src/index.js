import React from 'react';
import {render} from 'react-dom';
import { Router, browserHistory} from 'react-router'
import './main.sass';
import './media.sass';
import routes from './routes'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from './reducers/rootReducer'

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

window.store = store.getState();

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>,
  document.getElementById('root')
);
