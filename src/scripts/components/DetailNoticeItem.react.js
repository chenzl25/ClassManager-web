import React, { PropTypes } from 'react'
import { Router, Route, Link } from 'react-router'
import Actions from '../actions/Actions'
import validator from '../lib/validator'
import { post, get } from '../lib/service'
import Store from '../stores/Store'
import Immutable from 'immutable'
import classNames from 'classnames'
import path from 'path'
import '../../styles/DetailNoticeItem.scss'
import Unlooks from './Unlooks.react'

const DetailNoticeItem = React.createClass({
  propTypes: {
    notice: PropTypes.object.isRequired,
    userAccount: PropTypes.string.isRequired,
    organizationAccount: PropTypes.string.isRequired
  },
  render: function() {
    var notice = this.props.notice;
    return (
      <li key={notice.get('_id')}>
        <div  className={classNames({'notice-item': true })} onClick={this.props.onClick}>
          <ul>
            <li>
              <div className="notice-image-container">
                <img className="notice-image" src={'/api/'+notice.get('image')} />
                notice_image
              </div>
            </li>
            <li>
              <span className="name">Name: {notice.get('name')}</span>
            </li>
            <li>
              <span className="content">Content: {notice.get('content')}</span>
            </li>
            <li>
              <span className="deadline">Deadline: {notice.get('deadline')}</span>
            </li>
            <li>
              <Unlooks unlooks={notice.get('unlooks') } />
            </li>
          </ul>
        </div>
      </li>
    )
  },
  onDestroyClick: function() {
    // TodoActions.destroy(this.props.notice.id);
    console.log('destroy');
  }

});

export default DetailNoticeItem

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