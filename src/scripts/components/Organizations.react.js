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
    var organizations = data.map( v => <OrganizationItem 
    									organization={v} 
    									key={v.get('_id')} 
    									onClick={this.clickHandlerGenerator(v.get('account'))}/>);
    return (
      <div className="organizations">
        <ul className="organizations-list">
          {organizations}
        </ul>
      </div>
    )
  },
  clickHandlerGenerator(account) {
  	return function clickHandler() {
  		console.log('click the organization')
	  	Actions.searchOrganizationDetail(account);
  	}
  },
})
export default Organizations;
