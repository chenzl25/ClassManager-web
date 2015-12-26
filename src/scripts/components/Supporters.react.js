import React, { PropTypes } from 'react'
import { Router, Route, Link } from 'react-router'
import Actions from '../actions/Actions'
import validator from '../lib/validator'
import { post, get } from '../lib/service'
import Store from '../stores/Store'
import Immutable from 'immutable'
import classNames from 'classnames'
import SupporterItem from './SupporterItem.react'

const Supporters = React.createClass({
  propTypes: {
    supporters: PropTypes.object.isRequired,
  },
  render() {
    var supporters = this.props.supporters;
    supporters = supporters.map( v => <SupporterItem supporter={v} key={v.get('_id')} />);
    return (
      <div className="supporters">
        <div>
          <span>Total Supporters: {supporters.size}</span>
        </div>
        <ul className="supporters-list">
          {supporters}
        </ul>
      </div>
    )
  },
})
export default Supporters;


