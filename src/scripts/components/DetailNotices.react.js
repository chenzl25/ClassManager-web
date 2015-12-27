import React, { PropTypes } from 'react'
import { Router, Route, Link } from 'react-router'
import Actions from '../actions/Actions'
import validator from '../lib/validator'
import { post, get } from '../lib/service'
import Store from '../stores/Store'
import Immutable from 'immutable'
import classNames from 'classnames'
import DetailNoticeItem from './DetailNoticeItem.react'

const DetailNotices = React.createClass({
  propTypes: {
    notices: PropTypes.object.isRequired,
    userAccount: PropTypes.string.isRequired,
    organizationAccount: PropTypes.string.isRequired
  },
  render() {
    var notices = this.props.notices;
    var detailNotices = notices.map( v => <DetailNoticeItem 
    									notice={v}
                      userAccount={this.props.userAccount}
                      organizationAccount={this.props.organizationAccount}
    									key={v.get('_id')} />);
    return (
      <div className="detail-notices-container">
        <ul className="detail-notices-list">
          {detailNotices}
        </ul>
      </div>
    )
  },
})
export default DetailNotices;

