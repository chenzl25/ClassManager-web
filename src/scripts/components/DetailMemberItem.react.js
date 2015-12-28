import React, { PropTypes } from 'react'
import { Router, Route, Link } from 'react-router'
import Actions from '../actions/Actions'
import validator from '../lib/validator'
import { post, get } from '../lib/service'
import Store from '../stores/Store'
import Immutable from 'immutable'
import classNames from 'classnames'
import path from 'path'
// import '../../styles/DetailMemberItem.scss'

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
        <div  className={classNames({'detail-member-item-container': true })} onClick={this.props.onClick}>
          <ul className="detail-member-item-attribute-list">
            <li>
              <div className="detail-member-image-container">
                <img className="detail-member-image" src={'/api/'+member.get('image')} />
              </div>
            </li>
            <li>
              <div>
                <span className="attribute-name">Name: </span>
                <span className="detail-member-name">{member.get('name')}</span>
              </div>
            </li>
            <li>
              <div>
                <span className="attribute-name">Account: </span>
                <span className="detail-member-account">{member.get('account')}</span>
              </div>
            </li>
            <li>
              <div>
                <span className="attribute-name">Position: </span>
                <span className="detail-member-position">{member.get('position')}</span>
              </div>
            </li>
            <li>
              <div>
                <span className="attribute-name">Student Id: </span>
                <span className="detail-member-student-id">{member.get('student_id')}</span>
              </div>
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