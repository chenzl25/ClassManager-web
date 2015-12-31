import React, { PropTypes } from 'react'
import Actions from '../actions/Actions'
import validator from '../lib/validator'
import Store from '../stores/Store'
import Immutable from 'immutable'
import classNames from 'classnames'
import path from 'path'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import RouteCSSTransitionGroup from './RouteCSSTransitionGroup.react'
import { Router, Route, Link, Redirect,IndexRoute } from 'react-router'
import Homeworks from './Homeworks.react'
import Organizations from './Organizations.react'
import OrganizationDetail from './OrganizationDetail.react'
import RadioGroup from 'react-radio-group'
import Dropdown from './Dropdown.react'




const User = React.createClass({
  setImmState(fn) {
    return this.setState(({data}) => ({
      data: fn(data)
    }));
  },
  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextState.selectedValue);
    return !nextState.data.equals(this.state.data)
           || nextState.selectedValue !== this.state.selectedValue
           || nextState.searchValue !== this.state.searchValue
           || nextState.dropdown !== this.state.dropdown;
  },
  getInitialState() {
    return {data:  Immutable.fromJS(Store.getUser()),
            selectedValue: 'organization',
            searchValue: '',
            drowdown: false
          };
  },
  // componentWillMount() {
  // },
  componentDidMount() {
    if (!this.state.data) {
      this.props.history.pushState(null, '/login');
      return;
    }
    Store.addChangeListener(this.onChange);
    window.addEventListener("beforeunload", function (e) {
      var confirmationMessage = 'Sure to leave?';

      (e || window.event).returnValue = confirmationMessage; //Gecko + IE
      return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
    });
  },
  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
    // window.removeEventListener("beforeunload");
  },
  componentWillUpdate() {
    // window.removeEventListener("beforeunload");
  },
  render() {
    var data = this.state.data;
    console.log(this.state.selectedValue,'!!!');
    if (!data) {
      return (<div></div>);
    }
    console.log(this.state.dropdown)
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
              {/*
              <li>
                <div className="user-setting-container">
                  <Link to={path.join('/','user', this.state.data.get('account'), 'userSetting')}>
                    <img className="user-setting-image" src={ path.join('/','api','images' ,'setting.png') } />
                  </Link>
                </div>
              </li>
              */}
              <li>
                <div className="user-dropdown-container" >
                  <img  onClick={this.dropdownHandler } className="user-dropdown-image" src={ path.join('/','api','images' ,'menu.png') } />
                  <ReactCSSTransitionGroup transitionName="dropdown" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={300} transitionEnter={true} transitionLeaveTimeout={300} transitionLeave={true}>
                    {this.state.dropdown?<Dropdown userAccount={this.state.data.get('account')} logoutHandler={this.logoutHandler} history={this.props.history} />:''}
                  </ReactCSSTransitionGroup>
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
                    <Radio value="organization" /><span className="radio-name">Organization</span>
                  </label>
                  <label>
                    <Radio value="user" /><span className="radio-name">User</span>
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
  },
  logoutHandler() {
    console.log('logoutHandler');
    window.removeEventListener('beforeunload');
    window.location.reload(true);
  },
  dropdownHandler() {
    this.setState({dropdown: !this.state.dropdown});
  },
})
export default User;
