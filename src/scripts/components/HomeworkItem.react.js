import React, { PropTypes } from 'react'
import { Router, Route, Link } from 'react-router'
import Actions from '../actions/Actions'
import validator from '../lib/validator'
import { post, get } from '../lib/service'
import Store from '../stores/Store'
import Immutable from 'immutable'
import classNames from 'classnames'


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
              'homework': true })}>
          <span className="name">{homework.get('name')}</span>
          <p className="content">{homework.get('content')}</p>
          <span className="deadline">{homework.get('deadline')}</span>
          <span className="from"> from: {homework.get('account')}</span>
          <button className="finlish" onClick={this.onFinlishClick} />
          <button className="destroy" onClick={this.onDestroyClick} />
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
