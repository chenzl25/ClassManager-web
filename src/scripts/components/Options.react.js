import React, { PropTypes } from 'react'
import { Router, Route, Link } from 'react-router'
import Actions from '../actions/Actions'
import validator from '../lib/validator'
import { post, get } from '../lib/service'
import Store from '../stores/Store'
import Immutable from 'immutable'
import classNames from 'classnames'
import OptionItem from './OptionItem.react'

const Options = React.createClass({
  propTypes: {
    options: PropTypes.object.isRequired,
    userAccount: PropTypes.string.isRequired,
    organizationAccount: PropTypes.string.isRequired,
    voteId: PropTypes.string.isRequired,
    userHasVoted: PropTypes.bool.isRequired
  },
  render() {
  var options = this.props.options;
    options = options.map( v => <OptionItem option={v} userHasVoted={this.props.userHasVoted} userAccount={this.props.userAccount} organizationAccount={this.props.organizationAccount} voteId={this.props.voteId}  key={v.get('_id')} />);
    return (
      <div className="options-container">
        <div>
          <span>Total Options: </span>
          <span className="option-number">{options.size}</span>
        </div>
        <ul className="options-list">
          {options}
        </ul>
      </div>
    )
  },
})
export default Options;


