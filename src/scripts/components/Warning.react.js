import React, { PropTypes } from 'react'
import { Router, Route, Link } from 'react-router'
import Actions from '../actions/Actions'
import validator from '../lib/validator'
import { post, get } from '../lib/service'
import Store from '../stores/Store'
import Immutable from 'immutable'
import classNames from 'classnames'


const Warning = React.createClass({
  getDefaultProps() {
      return {
            message: "",
      };
  },
  propTypes: {
    message: PropTypes.string.isRequired,
    url: PropTypes.string
  },
  render() {
    var LinkComponent;
    if (this.props.url) {
      LinkComponent = <Link to={this.props.url}>Comfirm</Link>
    }
    return (
      <div>
        <p>{this.props.message}</p>
        {LinkComponent}
        <p>{this.props.url}</p>
      </div>
    )
  },
})
export default Warning;
