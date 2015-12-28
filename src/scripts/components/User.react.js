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
    console.log(nextState.selectedValue);
    return !nextState.data.equals(this.state.data)
           || nextState.selectedValue !== this.state.selectedValue
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
    console.log(this.state.selectedValue,'!!!');
    if (!data) {
      return (<p>please F5</p>)
    }
    return (
      <div className="user">
        <div className="user-left">
          <div className="user-profile">
            <ul className="user-profile-list">
              <li>
                <div className="user-image-container">
                  <img className="user-image" src={'/api/'+data.get('image')} />
                </div>
              </li>
              <li>
                <span className="user-name">{data.get('name')}</span>
              </li>
              <li>
                <div className="user-setting-container">
                  <Link to={path.join('/','user', this.state.data.get('account'), 'userSetting')}>
                    <img className="user-setting-image" src={ path.join('/','api','images' ,'setting.png') } />
                  </Link>
                </div>
              </li>
              <li>
                <div className="user-logout-container">
                  <img className="user-logout-image" src={ path.join('/','api','images' ,'logout.png') } />
                </div>
              </li>
            </ul>
          </div>
          <div className="user-search-container">
            <label htmlFor="search"></label>
            <input className="user-search-input" type="text" autoFocus="true" name="search" placeholder="search by account" onKeyDown={this.searchKeyDownHandler} onChange={this.searchChangeHandler}/>
            <RadioGroup
              name="user-or-organization"
              selectedValue={this.state.selectedValue}
              onChange={this.searchRadioChangeHandler }>
              {Radio => (
                <div className="user-or-organization">
                  <label>
                    <Radio value="user" /><span className="radio-name">User</span>
                  </label>
                  <label>
                    <Radio value="organization" /><span className="radio-name">Organization</span>
                  </label>
                </div>
              )}
            </RadioGroup>
          </div>
          <div className="user-choices-container">
            <ul>
              <li><Link to={path.join('/','user', this.state.data.get('account'), 'homeworks')}><img className= "homeworks-image" src={ path.join('/','api','images' ,'message.png') } /></Link></li>
              <li><Link to={path.join('/','user', this.state.data.get('account'), 'organizatons')}><img className= "organizatons-image" src={ path.join('/','api','images' ,'people.png') } /></Link></li>
            </ul>
            <div className="user-data-container">
              <RouteCSSTransitionGroup transitionName="hehe" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={300} transitionLeave={false} >
                {this.props.children&&React.cloneElement(this.props.children, {data: this.state.data})}
                {/*this.props.children&&*/}
              </RouteCSSTransitionGroup>
            </div>
          </div>
        </div>
        <div className="user-right">
          <OrganizationDetail userAccount={data.get('account')}/>
        </div>
      </div>
    )
  },
  onChange() {
    this.setState({'data': Immutable.fromJS(Store.getUser())});
    // this.setImmState(d => d.update(v => Store.getUser()))
    // this.setState('searchResult', Immutable.fromJS(Store['getSearch'+capitalizeFirstLetter(this.state.selctedValue)]()));
  },
  searchRadioChangeHandler(value) {
    // Actions.changeSelectedValue(value);
    this.setState({'selectedValue': value});
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
    // if (this.state.searchValue === '') {
    //   return;
    // }
    if (this.state.selectedValue == 'organization') {
      Actions.searchOrganization(this.state.searchValue)
             .then((result)=>this.props.history.pushState(null, path.join('/','user', this.state.data.get('account'), '/','searchResult')))
    } else if (this.state.selectedValue == 'user') {
      Actions.searchUser(this.state.searchValue)
             .then((result)=>this.props.history.pushState(null, path.join('/','user', this.state.data.get('account'), '/','searchResult')))
    }
  },
  settingClickHandler() {

  }
})
export default User;
