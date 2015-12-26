import React, { PropTypes } from 'react'
import { Router, Route, Link } from 'react-router'
import Actions from '../actions/Actions'
import validator from '../lib/validator'
import { post, get } from '../lib/service'
import Store from '../stores/Store'
import Immutable from 'immutable'
import classNames from 'classnames'


const Warning = React.createClass({
  propTypes: {
    message: PropTypes.object.isRequired,
    url: PropTypes.string
  },
  render() {
    var LinkComponent;
    if (this.props.url) {
      LinkComponent = <Link className="success" to={this.props.url || ''}>Continue</Link>
    }
    var message = Immutable.fromJS(this.props.message);
    var warningMessage = [];
    for (var key of ['account', 'password', 'again', 'error']) {
      if (message.get(key))      
        warningMessage.push(<li key={key}>{capitalizeFirstLetter(key)}: {message.get(key)}</li>)
    }
    return (
      <div className="warning">
        <ul>
          {warningMessage}
        </ul>
        {LinkComponent}
        <p>{this.props.url}</p>
      </div>
    )
  },
})

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


export default Warning;
