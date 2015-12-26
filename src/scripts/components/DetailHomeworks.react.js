import React, { PropTypes } from 'react'
import { Router, Route, Link } from 'react-router'
import Actions from '../actions/Actions'
import validator from '../lib/validator'
import { post, get } from '../lib/service'
import Store from '../stores/Store'
import Immutable from 'immutable'
import classNames from 'classnames'
import DetailHomeworkItem from './DetailHomeworkItem.react'

const DetailHomeworks = React.createClass({
  propTypes: {
    homeworks: PropTypes.object.isRequired,
    userAccount: PropTypes.string.isRequired,
    organizationAccount: PropTypes.string.isRequired
  },
  render() {
    var homeworks = this.props.homeworks;
    var detailMembers = homeworks.map( v => <DetailHomeworkItem 
    									homework={v}
                      userAccount={this.props.userAccount}
                      organizationAccount={this.props.organizationAccount}
    									key={v.get('_id')} />);
    return (
      <div className="detail-homeworks">
        <ul className="detail-homwroks-list">
          {detailMembers}
        </ul>
      </div>
    )
  },
})
export default DetailHomeworks;

