import React, { PropTypes } from 'react'
import { Router, Route, Link } from 'react-router'
import Actions from '../actions/Actions'
import validator from '../lib/validator'
import { post, get } from '../lib/service'
import Store from '../stores/Store'
import Immutable from 'immutable'
import classNames from 'classnames'
import path from 'path'
// import '../../styles/organizationItem.scss'

const OrganizationItem = React.createClass({
  propTypes: {
    organization: PropTypes.object.isRequired
  },
  getInitialState: function() {
    return null;
  },
  render: function() {
    var organization = this.props.organization;
    return (
      <li key={organization.get('_id')}>
        <div  className={classNames({'organization-item': true })} onClick={this.props.onClick}>
          <ul className="organization-item-attributes-list">
            <li>
              <div className="organization-item-image-container">
                <img className="organization-item-image" src={'/api/'+organization.get('image')} />
              </div>
            </li>
            <li>
              Name: <span className="organization-item-name">{organization.get('name')}</span>
            </li>
            <li>
              Account: <span className="organization-item-account">{organization.get('account')}</span>
            </li>
            <li>
              Position: <span className="organization-item-position">{organization.get('position')}</span>
            </li>
          </ul>
        </div>
      </li>
    )
  },
  onDestroyClick: function() {
    // TodoActions.destroy(this.props.organization.id);
    console.log('destroy');
  }

});

export default OrganizationItem
