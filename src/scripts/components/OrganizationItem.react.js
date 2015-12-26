import React, { PropTypes } from 'react'
import { Router, Route, Link } from 'react-router'
import Actions from '../actions/Actions'
import validator from '../lib/validator'
import { post, get } from '../lib/service'
import Store from '../stores/Store'
import Immutable from 'immutable'
import classNames from 'classnames'
import path from 'path'
import '../../styles/organizationItem.scss'

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
          <ul>
            <li>
              <div className="organization-image-container">
                <img className="organization-image" src={'/api/'+organization.get('image')} />
                organization_image
              </div>
            </li>
            <li>
              <span className="name">{organization.get('name')}</span>
            </li>
            <li>
              <span className="account">{organization.get('account')}</span>
            </li>
            <li>
              <span className="name">{organization.get('position')}</span>
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
