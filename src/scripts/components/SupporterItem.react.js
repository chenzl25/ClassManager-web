import React, { PropTypes } from 'react'
import { Router, Route, Link } from 'react-router'
import Actions from '../actions/Actions'
import validator from '../lib/validator'
import { post, get } from '../lib/service'
import Store from '../stores/Store'
import Immutable from 'immutable'
import classNames from 'classnames'
import path from 'path'
// import '../../styles/SupporterItem.scss'

const SupporterItem = React.createClass({
  propTypes: {
    supporter: PropTypes.object.isRequired,
  },
  render: function() {
    var supporter = this.props.supporter;
    return (
      <li key={supporter.get('_id')}>
        <div  className={classNames({'supporter-item': true })} onClick={this.props.onClick}>
          <ul>
            <li>
              <span className="account">Account: {supporter.get('account')}</span>
            </li>
            <li>
              <span className="name">Name: {supporter.get('name')}</span>
            </li>
            <li>
              <span className="student-id">Student Id: {supporter.get('student_id')}</span>
            </li>
          </ul>
        </div>
      </li>
    )
  },
  onDestroyClick: function() {
    // TodoActions.destroy(this.props.supporter.id);
    console.log('destroy');
  }

});

export default SupporterItem

// Support structure

// var MemberSchema = new mongoose.Schema({
//  position: {type:String,default: null},
//  student_id: {type:String,default: null},
//  name:{type:String,default: null},         //群名片
//  join_on: { type: Date, default: Date.now },
//  // member_id : ObjectId
//  image: {type:String,default: null},
//  account:  {type:String,default: null}
// });