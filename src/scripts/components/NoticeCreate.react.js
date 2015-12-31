import React, { PropTypes } from 'react'
import { Router, Route, Link } from 'react-router'
import Actions from '../actions/Actions'
import validator from '../lib/validator'
import { post, get } from '../lib/service'
import Store from '../stores/Store'
import Immutable from 'immutable'
import classNames from 'classnames'
import path from 'path'
import Unlooks from './Unlooks.react'
import moment from 'moment'


const NoticeCreate = React.createClass({
  propTypes: {
    // notice: PropTypes.object.isRequired,
    // userAccount: PropTypes.string.isRequired,
    // organizationAccount: PropTypes.string.isRequired
  },
  render: function() {
    var notice = this.props.notice;
    return (
     <p></p>
    )
  },
  onDestroyClick: function() {
    // TodoActions.destroy(this.props.notice.id);
    console.log('destroy');
  }

});

export default NoticeCreate

// var Notice =  {   //公告类
//   _id: ObjectId,
//   name: String,             //公告名字
//   content: String,          //公告内容
//   deadline: Date,           //公告截止日期
//   join_on: Date,
//   image: String,            //公告的图片
//   unlooks: [String],          //没点开公告的同学的账号
//   // unlooks_num: Number         //没查看的人数 //deprecated
// });