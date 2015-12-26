import React, { PropTypes } from 'react'
import { Router, Route, Link } from 'react-router'
import Actions from '../actions/Actions'
import validator from '../lib/validator'
import { post, get } from '../lib/service'
import Store from '../stores/Store'
import Immutable from 'immutable'
import classNames from 'classnames'
import DetailMemberItem from './DetailMemberItem.react'

const DetailMembers = React.createClass({
  propTypes: {
    members: PropTypes.object.isRequired,
    userAccount: PropTypes.string.isRequired,
    organizationAccount: PropTypes.string.isRequired
  },
  render() {
    var members = this.props.members;
    var detailMembers = members.map( v => <DetailMemberItem 
    									member={v}
                      userAccount={this.props.userAccount}
                      organizationAccount={this.props.organizationAccount}
    									key={v.get('_id')} />);
    return (
      <div className="detail-members">
        <ul className="detail-members-list">
          {detailMembers}
        </ul>
      </div>
    )
  },
})
export default DetailMembers;

