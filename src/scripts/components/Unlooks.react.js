import React, { PropTypes } from 'react'
import { Router, Route, Link } from 'react-router'
import Actions from '../actions/Actions'
import validator from '../lib/validator'
import { post, get } from '../lib/service'
import Store from '../stores/Store'
import Immutable from 'immutable'
import classNames from 'classnames'
import UnlookItem from './UnlookItem.react'

const Unlooks = React.createClass({
  propTypes: {
    unlooks: PropTypes.object.isRequired,
    changeToUnvote: PropTypes.bool
  },
  render() {
    var unlooks = this.props.unlooks;
    unlooks = unlooks.map( v => <UnlookItem unlook={v} key={v.get('_id')} />);
    return (
      <div className="unlooks">
      	<div>
      	  <span>Total {this.props.changeToUnvote == true ? 'Unvotes' : 'Unlookers'}: {unlooks.size}</span>
      	</div>
      	<ul className="unlooks-list">
        	{unlooks}
      	</ul>
      </div>
    )
  },
})
export default Unlooks;
