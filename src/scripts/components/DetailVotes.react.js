import React, { PropTypes } from 'react'
import { Router, Route, Link } from 'react-router'
import Actions from '../actions/Actions'
import validator from '../lib/validator'
import { post, get } from '../lib/service'
import Store from '../stores/Store'
import Immutable from 'immutable'
import classNames from 'classnames'
import DetailVoteItem from './DetailVoteItem.react'

const DetailVotes = React.createClass({
  propTypes: {
    votes: PropTypes.object.isRequired,
    userAccount: PropTypes.string.isRequired,
    organizationAccount: PropTypes.string.isRequired
  },
  render() {
    var votes = this.props.votes;
    var detailVotes = votes.map( v => <DetailVoteItem 
    									vote={v}
                      userAccount={this.props.userAccount}
                      organizationAccount={this.props.organizationAccount}
    									key={v.get('_id')} />);
    return (
      <div className="detail-votes-container">
        <ul className="detail-votes-list">
          {detailVotes}
        </ul>
      </div>
    )
  },
})
export default DetailVotes;

