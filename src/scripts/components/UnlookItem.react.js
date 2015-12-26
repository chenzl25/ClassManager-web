import React, { PropTypes } from 'react'
import { Router, Route, Link } from 'react-router'
import Actions from '../actions/Actions'
import validator from '../lib/validator'
import { post, get } from '../lib/service'
import Store from '../stores/Store'
import Immutable from 'immutable'
import classNames from 'classnames'
import path from 'path'
import '../../styles/UnlookItem.scss'

const UnlookItem = React.createClass({
  propTypes: {
    unlook: PropTypes.object.isRequired,
  },
  render: function() {
    var unlook = this.props.unlook;
    return (
      <li key={unlook.get('_id')}>
        <div  className={classNames({'unlook-item': true })} onClick={this.props.onClick}>
          <ul>
            <li>
              <span className="account">Account: {unlook.get('account')}</span>
            </li>
            <li>
              <span className="name">Name: {unlook.get('name')}</span>
            </li>
            <li>
              <span className="student-id">Student Id: {unlook.get('student_id')}</span>
            </li>
          </ul>
        </div>
      </li>
    )
  },
  onDestroyClick: function() {
    // TodoActions.destroy(this.props.unlook.id);
    console.log('destroy');
  }

});

export default UnlookItem

// var Member =  {     //班级成员类
//   _id: ObjectId,
//   position: String,         //职务
//   student_id: String,         //学号
//   name:String,            //姓名
//   join_on: Date,
//   nick_name:String,//++         
//   account: String           //账号
// });