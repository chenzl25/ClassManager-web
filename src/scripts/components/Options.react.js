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
  },
  render() {
  var options = this.props.options;
    options = options.map( v => <OptionItem option={v} key={v.get('_id')} />);
    return (
      <div className="options">
        <div>
          <span>Total Options: {options.size}</span>
        </div>
        <ul className="options-list">
          {options}
        </ul>
      </div>
    )
  },
})
export default Options;


