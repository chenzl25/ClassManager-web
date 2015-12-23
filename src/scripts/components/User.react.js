import React from 'react'
import { Router, Route, Link } from 'react-router'
import Actions from '../actions/Actions'
import validator from '../lib/validator'
import Store from '../stores/Store'

const User = React.createClass({
  getInitialState() {
      // return Store.getAll();
      return null;
  },
  componentDidMount() {
    Store.addChangeListener(this._onChange);
  },
  componentWillUnmount() {
    Store.removeChangeListener(this._onChange);
  },
  render() {
    return (
      <div>
        <h1>{'User'}</h1>
      </div>
    )
  },
  _onChange: function() {
    this.setState(Store.getAll);
  }
})
export default User;
