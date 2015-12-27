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
  getInitialState() {
    return {expand: false};
  },
  render() {
    var unlooks = this.props.unlooks;
    var UnlooksComponent;
    if (this.state.expand == true){
      UnlooksComponent = unlooks.map( v => <UnlookItem unlook={v} key={v.get('_id')} />);
    }
    return (
      <div className="unlooks-container">
      	<div className="unlooks-top">
          <div className={this.props.changeToUnvote == true ?'unvote-number-container':'unlook-number-container'}>
      	    <span>{this.props.changeToUnvote == true ? 'Unvote Numbers' : 'Unlook Numbers'}:</span>
            <span className={this.props.changeToUnvote == true ?'unvote-number':'unlook-number'}>{unlooks.size}</span>
          </div>
          <div className="expand-container">
            <div className={classNames({expand: this.state.expand,
                                        unexpand: !this.state.expand,
                                        triangle: true})}
                                       onClick={this.clickHandler}>
            </div>
          </div>
        </div>
      	<ul className="unlooks-list">
        	{UnlooksComponent}
      	</ul>
      </div>
    )
  },
  clickHandler() {
    this.setState({expand: !this.state.expand});
  }
})
export default Unlooks;
