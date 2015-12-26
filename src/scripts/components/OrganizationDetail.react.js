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
      default:      Child = <DetailMembers userAccount={this.props.userAccount} organizationAccount={data.get('account')} members={data.get('members')} />;
    }
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
          <div className="choices">
            {/*need img later*/}
            <RadioGroup
              name="members-votes-homeworks-notices"
              selectedValue={this.state.route}
              onChange={this.radioChangeHandler }>
              {Radio => (
                <div>
                  <label>
                    <Radio value="members" />Members
                  </label>
                  <label>
                    <Radio value="notices" />Notices
                  </label>
                  <label>
                    <Radio value="votes" />Votes
                  </label>
                  <label>
                    <Radio value="homeworks" />Homeworks
                  </label>
                </div>
              )}
            </RadioGroup>
          </div>
          <div>
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
  }
})
export default OrganizationDetail;
