import React, { PropTypes } from 'react'
import Actions from '../actions/Actions'
import validator from '../lib/validator'
import Store from '../stores/Store'
import Immutable from 'immutable'
import classNames from 'classnames'
import path from 'path'
import RouteCSSTransitionGroup from './RouteCSSTransitionGroup.react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Router, Route, Link, Redirect,IndexRoute } from 'react-router'
import Homeworks from './Homeworks.react'
import Organizations from './Organizations.react'
import OrganizationDetail from './OrganizationDetail.react'
import RadioGroup from 'react-radio-group'

const Dropdown =  React.createClass({
  PropTypes: {
    userAccount: PropTypes.string.isRequired,
    logoutHandler: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  },
  getInitialState() {
    return null;
  },
  render() {
    return (<div className="dropdown-container">
              <ul className="dropdown-list">
                <li>
                  <Link to={path.join('/','user', this.props.userAccount, 'userSetting')}>
                    <div className="user-setting-container">
                      <img className="user-setting-image" src={ path.join('/','api','images' ,'setting.png') } />
                      <span className="dropdown-attribute-name">Setting</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <div className="user-create-organization-container" onClick={this.createOrganizationHandler }>
                    <img   className="user-create-organization-image" src={ path.join('/','api','images' ,'create-organization.png') } />
                    <span className="dropdown-attribute-name">Create</span>
                  </div>
                </li>
                <li>
                  <div className="user-logout-container" onClick={this.props.logoutHandler }>
                    <img  className="user-logout-image" src={ path.join('/','api','images' ,'logout.png') } />
                    <span className="dropdown-attribute-name">Logout</span>
                  </div>
                </li>
              </ul>
            </div>)
  },
  createOrganizationHandler() {
    console.log('createOrganizationHandler', 'to', path.join('/','user', this.props.userAccount, '/','organizationCreate'));
    this.props.history.pushState(null, path.join('/','user', this.props.userAccount, '/','organizationCreate'));
  }

});

export default Dropdown
// React.render(<Dropdown list={colours} selected={colours[0]} />, document.getElementById("container"));