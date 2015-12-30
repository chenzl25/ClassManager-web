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
import DetailMembers from './DetailMembers.react'
import DetailNotices from './DetailNotices.react'
import DetailVotes from './DetailVotes.react'
import DetailHomeworks from './DetailHomeworks.react'
import OrganizationSetting from './OrganizationSetting.react'
import RadioGroup from 'react-radio-group'

const OrganizationDetail = React.createClass({
  propTypes: {
    userAccount: PropTypes.string.isRequired,
  },
  setImmState(fn) {
    return this.setState(({data}) => ({
      data: fn(data)
    }));
  },
  shouldComponentUpdate(nextProps, nextState) {
    return !nextState.data.equals(this.state.data) || nextState.route != this.state.route;
  },
  getInitialState() {
    return {data:  Immutable.fromJS(Store.getOrganizationDetail()),
            route: 'members'};
  },
  // componentWillMount() {
  // },
  componentDidMount() {
    Store.addChangeListener(this.onStoreChange);
  },
  componentWillUnmount() {
    Store.removeChangeListener(this.onStoreChange);
  },
  render() {
    console.log(this.state.data.toJS());
    var data = this.state.data;
    if (data.size ===0) {
      return (<p>nothing in the detail</p>)
    }
    var Child;
    switch (this.state.route) {
      case 'members': Child = <DetailMembers userAccount={this.props.userAccount} organizationAccount={data.get('account')} members={data.get('members')} />; break;
      case 'votes': Child = <DetailVotes userAccount={this.props.userAccount} organizationAccount={data.get('account')} votes={data.get('votes')} />; break;
      case 'notices': Child = <DetailNotices userAccount={this.props.userAccount} organizationAccount={data.get('account')} notices={data.get('notices')} />; break;
      case 'homeworks': Child = <DetailHomeworks userAccount={this.props.userAccount} organizationAccount={data.get('account')} homeworks={data.get('homeworks')} />; break;
      case 'setting': Child = <OrganizationSetting userAccount={this.props.userAccount} organizationData={data} />; break;
      default:      Child = <DetailMembers userAccount={this.props.userAccount} organizationAccount={data.get('account')} members={data.get('members')} />;
    }
    return (
      <div className="organization-detail-container">
        <div className="organization-detail">
          <div className="organization-detail-top">
            <div className="organization-detail-image-container">
              <img className="organization-detail-image" src={'/api/'+data.get('image')}/>
            </div>
            <div className="organization-detail-account-name">
              <div className="organization-detail-account">Account: {data.get('account')}</div>
              <div className="organization-detail-name">Name: {data.get('name')}</div>
            </div>
            <div className="organization-detail-setting-container">
              <img className="organization-detail-setting-image" src={ path.join('/','api','images' ,'setting.png') } onClick={this.settingClickHandler} />
            </div>
          </div>
          <div className="organization-detail-choices-container">
            {/*need img later*/}
            <RadioGroup
              name="members-votes-homeworks-notices"
              selectedValue={this.state.route}
              onChange={this.radioChangeHandler }>
              {Radio => (
                <div className="organization-detail-choices">
                  <label>
                    <Radio value="members" /><span className="radio-name">Members</span>{/*need img later*/}
                  </label>
                  <label>
                    <Radio value="notices" /><span className="radio-name">Notices</span>{/*need img later*/}
                  </label>
                  <label>
                    <Radio value="votes" /><span className="radio-name">Votes</span>{/*need img later*/}
                  </label>
                  <label>
                    <Radio value="homeworks" /><span className="radio-name">Homeworks</span>{/*need img later*/}
                  </label>
                </div>
              )}
            </RadioGroup>
          </div>
          <div className="organization-detail-data-container">
            {Child}
          </div>
        </div>
      </div>
    )
  },
  onStoreChange() {
    this.setState({data: Immutable.fromJS(Store.getOrganizationDetail())});
  },
  radioChangeHandler(value) {
    this.setState({route: value});
  },
  settingClickHandler() {
    console.log('organizationSettingClick');
    this.setState({route: 'setting'});
  }
})
export default OrganizationDetail;
