import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, Redirect,IndexRoute } from 'react-router'
import { createHistory, useBasename } from 'history'
import App from './components/App.react'
import Register from './components/Register.react'
import Login from './components/Login.react'
import User from './components/User.react'

// const history = createHistory();
render((
  <Router>
    <Route path="/" component={App}>
      <Route path="register" component={Register}/>
      <Route path="login" component={Login}/>
      <Route path="user/:account" component={User}/>
      <Redirect from="*" to="/" />
    </Route>
  </Router>
),document.getElementById('app'));


