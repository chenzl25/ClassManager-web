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
              From: <span className="homework-item-from">{homework.get('account')}</span>
            </li>
            <li>
              Deadline: <span className="homework-item-deadline">{moment(homework.get('deadline')).calendar()}</span>
            </li>
            <li>
              <button className="homework-item-finlish" onClick={this.onFinlishClick} />
              <button className="homework-item-destroy" onClick={this.onDestroyClick} />
            </li>
          </ul>
        </div>
      </li>
    );
  },
  onDestroyClick: function() {
    // TodoActions.destroy(this.props.homework.id);
    console.log('destroy');
  },
  onFinlishClick: function() {
    // TodoActions.destroy(this.props.homework.id);
    console.log('finlish');
  }

});

export default HomeworkItem
