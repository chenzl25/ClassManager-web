import React, { PropTypes } from 'react'
import { Router, Route, Link } from 'react-router'
import Actions from '../actions/Actions'
import validator from '../lib/validator'
import { post, get } from '../lib/service'
import Store from '../stores/Store'
import Immutable from 'immutable'
import classNames from 'classnames'
import path from 'path'
import '../../styles/DetailMemberItem.scss'

const DetailMemberItem = React.createClass({
  propTypes: {
    member: PropTypes.object.isRequired,
    userAccount: PropTypes.string.isRequired,
    organizationAccount: PropTypes.string.isRequired
  },
  render: function() {
    var member = this.props.member;
    return (
      <li key={member.get('_id')}>
        <div  className={classNames({'member-item': true })} onClick={this.props.onClick}>
          <ul>
            <li>
              <div className="member-image-container">
                <img className="member-image" src={'/api/'+member.get('image')} />
                member_image
              </div>
            </li>
            <li>
              <span className="name">Name: {member.get('name')}</span>
            </li>
            <li>
              <span className="account">Account: {member.get('account')}</span>
            </li>
            <li>
              <span className="position">Position: {member.get('position')}</span>
            </li>
            <li>
              <span className="student-id">Student Id: {member.get('student_id')}</span>
            </li>
          </ul>
        </div>
      </li>
    )
  },
  onDestroyClick: function() {
    // TodoActions.destroy(this.props.member.id);
    console.log('destroy');
  }

});

export default DetailMemberItem

// var Member =  {     //班级成员类
//   _id: ObjectId,
//   images: String,
//   position: String,         //职务
//   student_id: String,         //学号
//   name:String,            //姓名
//   join_on: Date,
//   nick_name:String,//++         
//   account: String           //账号
// });