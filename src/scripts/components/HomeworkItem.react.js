import React, { PropTypes } from 'react'
import { Router, Route, Link } from 'react-router'
import Actions from '../actions/Actions'
import validator from '../lib/validator'
import { post, get } from '../lib/service'
import Store from '../stores/Store'
import Immutable from 'immutable'
import classNames from 'classnames'
import moment from 'moment'

const HomeworkItem = React.createClass({
  propTypes: {
    homework: PropTypes.object.isRequired
  },
  getInitialState: function() {
    return null;
  },
  render: function() {
    var homework = this.props.homework;
    return (
      <li key={homework.get('_id')}>
        <div  className={classNames({
              'uncomplish': homework.get('uncomplish'),
              'complished': !homework.get('uncomplish'),
              'unlook': homework.get('unlook'),
              'looked': !homework.get('unlook'),
              'homework-item': true })}>
          <ul className="homework-item-attributes-list">
            <li>
              Name: <span className="homework-item-name">{homework.get('name')}</span>
            </li>
            <li>
              Content: <p className="homework-item-content">{homework.get('content')}</p>
            </li>
            <li>
              Source: <span className="homework-item-from">{homework.get('account')}</span>
            </li>
            <li>
              Start Date: <span className="homework-item-from">{moment(homework.get('join_on')).calendar()}</span>
            </li>
            <li>
              Deadline: <span className="homework-item-deadline">{moment(homework.get('deadline')).calendar()}</span>
            </li>
            <li>
              State: <span className="homework-item-uncomplish">{homework.get('uncomplish')? 'Uncomplished': 'Complished'}</span>

            </li>
            <li>
              {homework.get('unlook')? <button className="homework-item-look-button" onClick={this.lookHandeler}>Look</button>:'hasLooked'}
              <button className="homework-item-complish-button" onClick={this.complishHandeler}>{!homework.get('uncomplish')? 'Uncomplished': 'Complished'}</button>
            </li>
          </ul>
        </div>
      </li>
    );
  },
  lookHandeler() {
    console.log('looked')
    Actions.lookHomework(this.props.homework.get('account'), this.props.homework.get('_id'));
  },
  complishHandeler() {
    console.log('finlish');
    Actions.complishHomework(this.props.homework.get('_id'), !this.props.homework.get('uncomplish'));
  }

});

export default HomeworkItem


// Homework = {
//   _id: ObjectId,         //在数据库里面的ID，子对象都有ID，可以不用管
//   account: String,       // organization account
//   name: String,      //作业的名称
//   content: String,     //作业内容
//   deadline: Date,      //作业的截至日期
//   unlook: Boolean,        //对于User来说，看到了没    方便Organization类统计
//   uncomplish: Boolean     //是否完成了作业
// });