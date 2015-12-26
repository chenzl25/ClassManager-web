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
import Organizations from './Organizations.react'
import OrganizationDetail from './OrganizationDetail.react'
import RadioGroup from 'react-radio-group'

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
    return !nextState.data.equals(this.state.data)
           || nextState.selctedValue !== this.state.selectedValue
           || nextState.searchValue !== this.state.searchValue;
  },
  getInitialState() {
    return {data:  Immutable.fromJS(Store.getUser()),
            selectedValue: 'organization',
            searchValue: '',
            // searchResult: Immutable.Map()
          };
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
        <div className="search">
          <label htmlFor="search"></label>
          <input type="text" autoFocus="true" name="search" placeholder="search" onKeyDown={this.searchKeyDownHandler} onChange={this.searchChangeHandler}/>
          <RadioGroup
            name="user-or-organization"
            selectedValue={this.state.selectedValue}
            onChange={this.searchRadioChangeHandler }>
            {Radio => (
              <div>
                <label>
                  <Radio value="user" />User
                </label>
                <label>
                  <Radio value="organization" />Organization
                </label>
              </div>
            )}
          </RadioGroup>
        </div>
        <div className="choice">
          <ul>
            <li><Link to={path.join('/','user', this.state.data.get('account'), 'homeworks')}><img className= "homeworks" src={ path.join('/','api','images' ,'message.png') } />homeworks</Link></li>
            <li><Link to={path.join('/','user', this.state.data.get('account'), 'organizatons')}><img className= "organizatons" src={ path.join('/','api','images' ,'people.png') } />organizatons</Link></li>
          </ul>
          <RouteCSSTransitionGroup transitionName="hehe" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={300} transitionLeave={false} >
            {this.props.children&&React.cloneElement(this.props.children, {data: this.state.data, selectedValue: this.state.selectedValue})}
          </RouteCSSTransitionGroup>
        </div>
        <OrganizationDetail />
      </div>
    )
  },
  onChange() {
    this.setState({'data': Immutable.fromJS(Store.getUser())});
    // this.setImmState(d => d.update(v => Store.getUser()))
    // this.setState('searchResult', Immutable.fromJS(Store['getSearch'+capitalizeFirstLetter(this.state.selctedValue)]()));
  },
  searchRadioChangeHandler(value) {
    this.setState({selectedValue: value});
    console.log(this.state.selectedValue, value);
  },
  searchKeyDownHandler(event) {
      if (event.keyCode == 13) {
        console.log("Pressed ENTER.");
        this.search();
      }
      return false;
  },
  searchChangeHandler(event) {
    this.setState({searchValue: event.target.value})
  },
  search() {
    if (this.state.selectedValue == 'organization') {
      Actions.searchOrganization(this.state.searchValue)
             .then((result)=>this.props.history.pushState(null, path.join('/','user', this.state.data.get('account'), '/','searchResult')))
    } else if (this.state.selectedValue == 'user') {
      Actions.searchUser(this.state.searchValue)
             .then((result)=>this.props.history.pushState(null, path.join('/','user', this.state.data.get('account'), '/','searchResult')))
    }
  }
})
export default User;
