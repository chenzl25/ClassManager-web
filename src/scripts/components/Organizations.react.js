import React, { PropTypes } from 'react'
import { Router, Route, Link } from 'react-router'
import Actions from '../actions/Actions'
import validator from '../lib/validator'
import { post, get } from '../lib/service'
import Store from '../stores/Store'
import Immutable from 'immutable'
import classNames from 'classnames'
import OrganizationItem from './OrganizationItem.react'

const Organizations = React.createClass({
  render() {
    var data = this.props.data.get('relationships');
    var organizations = data.map( v => <OrganizationItem organization={v} key={v.get('_id')} />);
    return (
      <div className="organizations">
        {organizations}
      </div>
    )
  },
})
export default Organizations;
