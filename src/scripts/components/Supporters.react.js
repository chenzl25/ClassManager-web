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
  getInitialState() {
    return {expand: false};
  },
  render() {
    var supporters = this.props.supporters;
    var SupportersComponent;
    if (this.state.expand == true){
      SupportersComponent = supporters.map( v => <SupporterItem supporter={v} key={v.get('_id')} />);
    }
    return (
      <div className="supporters-container">
        <div className="supporters-top">
          <div className="supporter-number-container">
            <span>Total Supporters: </span>
            <span className="supporter-number">{supporters.size}</span>
          </div>
          <div className="expand-container">
            <div className={classNames({expand: this.state.expand,
                                        unexpand: !this.state.expand,
                                        triangle: true})}
                                        onClick={this.clickHandler}>
            </div>
          </div>
        </div>
        <ul className="supporters-list">
          {SupportersComponent}
        </ul>
      </div>
    )
  },
  clickHandler() {
    this.setState({expand: !this.state.expand});
  }
})
export default Supporters;


