import React, { PropTypes } from 'react'
import { Router, Route, Link } from 'react-router'
import Actions from '../actions/Actions'
import validator from '../lib/validator'
import { post, get } from '../lib/service'
import Store from '../stores/Store'
import Immutable from 'immutable'
import classNames from 'classnames'
import path from 'path'
import '../../styles/DetailHomeworkItem.scss'
import Unlooks from './Unlooks.react'

const DetailHomeworkItem = React.createClass({
  propTypes: {
    homework: PropTypes.object.isRequired,
    userAccount: PropTypes.string.isRequired,
    organizationAccount: PropTypes.string.isRequired
  },
  render: function() {
    var homework = this.props.homework;
    return (
      <li key={homework.get('_id')}>
        <div  className={classNames({'homework-item': true })} onClick={this.props.onClick}>
          <ul>
            <li>
              <span className="name">Name: {homework.get('name')}</span>
            </li>
            <li>
              <span className="content">Content: {homework.get('content')}</span>
            </li>
            <li>
              <span className="deadline">Deadline: {homework.get('deadline')}</span>
            </li>
            <li>
              {/*we can use message to remind here*/}
              <Unlooks unlooks={homework.get('unlooks') } />
            </li>
          </ul>
        </div>
      </li>
    )
  },
  onDestroyClick: function() {
    // TodoActions.destroy(this.props.homework.id);
    console.log('destroy');
  }

});

export default DetailHomeworkItem

// var Homework =  { //作业类
//   _id: ObjectId,              
//   name: String,              //作业名字
//   content: String,           //作业内容
//   deadline: Date,            //作业截止日期
//   join_on: Date,
//   unlooks: [String],           //没点开作业的同学的账号
//   // unlooks_num: Number         //没查看的人数  //deprecated
// });