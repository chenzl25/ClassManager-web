import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, Redirect,IndexRoute } from 'react-router'
import { createHistory, useBasename } from 'history'
import App from './components/App.react'
import Register from './components/Register.react'
import Login from './components/Login.react'
import User from './components/User.react'
import Homeworks from './components/Homeworks.react'
import Organizations from './components/Organizations.react'
import SearchResult from './components/SearchResult.react'
// const history = createHistory();
render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute  component={Login}/>
      <Route path="/register" component={Register}/>
      <Route path="/login" component={Login}/>
      <Route path="/user/:account" component={User}>
        <IndexRoute component={Organizations} />
      	<Route path="homeworks" component={Homeworks}/>
		    <Route path="organizatons" component={Organizations}/>
		    <Route path="searchResult" component={SearchResult}/>
      </Route>
      <Redirect from="*" to="/" />
    </Route>
  </Router>
),document.getElementById('app'));


