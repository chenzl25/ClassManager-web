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
    organization: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
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
              <span className="attribute-name"></span>
              <button className="delete-button" onClick={this.deleteOrganizationHandler} >delete</button>
            </li>
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
  deleteOrganizationHandler() {
    if (this.props.organization.get('position') === 'founder') {
      Actions.deleteOrganization(this.props.organization.get('account'));
    } else {
      Actions.quitOrganization(this.props.organization.get('account'));
    }
  }

});

export default OrganizationItem
