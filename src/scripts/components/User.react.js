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


const User = React.createClass({
  setImmState(fn) {
    return this.setState(({data}) => ({
      data: fn(data)
    }));
  },
  shouldComponentUpdate(nextProps, nextState) {
    if (!Store.isLogin()) {
      this.props.history.pushState(null, '/login');
    }
    return !nextState.data.equals(this.state.data);
  },
  getInitialState() {
    return {data:  Immutable.fromJS(Store.getUser())};
  },
  // componentWillMount() {
  // },
  componentDidMount() {
    Store.addChangeListener(this._onChange);
  },
  componentWillUnmount() {
    Store.removeChangeListener(this._onChange);
  },
  render() {
    var data = this.state.data;
    if (!data) {
      return (<p>please F5</p>)
    }
    return (
      <div className="user">
        <div className="profile">
          <ul>
            <li>
              <div><img src={'/api/'+data.get('image')} /></div>
            </li>
            <li>
              <span>{data.get('name')}</span>
            </li>
            <li>
              <div className="setting-container">
                <img className="setting" src={ path.join('/','api','images' ,'setting.png') } />
                setting
              </div>
            </li>
            <li>
              <div className="logout-container">
                <img className="logout" src={ path.join('/','api','images' ,'logout.png') } />
                logout
              </div>
            </li>
          </ul>
        </div>
        <div className="choice">
          <ul>
            <li><Link to={path.join('/','user', this.props.params.account, 'homeworks')}><img className= "homeworks" src={ path.join('/','api','images' ,'message.png') } />homeworks</Link></li>
            <li><Link to={path.join('/','user', this.props.params.account, 'organizatons')}><img className= "organizatons" src={ path.join('/','api','images' ,'people.png') } />organizatons</Link></li>
          </ul>
          <RouteCSSTransitionGroup transitionName="hehe" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={300} transitionLeave={false} >
            {this.props.children&&React.cloneElement(this.props.children, {data: this.state.data})}
          </RouteCSSTransitionGroup>
        </div>
      </div>
    )
  },
  _onChange: function() {
    this.setImmState(d => Store.getUser());
  }
})
export default User;
