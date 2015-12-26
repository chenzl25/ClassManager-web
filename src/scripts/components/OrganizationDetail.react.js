import React, { PropTypes } from 'react'
import Actions from '../actions/Actions'
import validator from '../lib/validator'
import Store from '../stores/Store'
import Immutable from 'immutable'
import classNames from 'classnames'
import path from 'path'
import RouteCSSTransitionGroup from './RouteCSSTransitionGroup.react'
import { Router, Route, Link, Redirect,IndexRoute } from 'react-router'
import Homeworks from './Homeworks.react'
import Organizations from './Organizations.react.js'

const OrganizationDetail = React.createClass({
  setImmState(fn) {
    return this.setState(({data}) => ({
      data: fn(data)
    }));
  },
  shouldComponentUpdate(nextProps, nextState) {
    return !nextState.data.equals(this.state.data);
  },
  getInitialState() {
    return {data:  Immutable.fromJS(Store.getOrganizationDetail())};
  },
  // componentWillMount() {
  // },
  componentDidMount() {
    Store.addChangeListener(this.onChange);
  },
  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  },
  render() {
    console.log(this.state.data.toJS());
    var data = this.state.data;
    return (
      <div className="organization-detail-wrap">
        <div className="organization-detail">
          <div className="organization-detail-top">
            <div className="image">
              <img src={'/api/'+data.get('image')}/>
            </div>
            <div className="account-name">
              <span className="account">Account: {data.get('account')}</span>
              <span className="name">Name: {data.get('name')}</span>
            </div>
          </div>
        </div>
      </div>
    )
  },
  onChange: function() {
    this.setState({data: Immutable.fromJS(Store.getOrganizationDetail())});
  }
})
export default OrganizationDetail;
