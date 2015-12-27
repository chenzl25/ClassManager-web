import React, { PropTypes } from 'react'
import { Router, Route, Link } from 'react-router'
import Actions from '../actions/Actions'
import validator from '../lib/validator'
import { post, get } from '../lib/service'
import Store from '../stores/Store'
import Immutable from 'immutable'
import classNames from 'classnames'
import path from 'path'
// import '../../styles/DetailVoteItem.scss'
import Unlooks from './Unlooks.react'
import Options from './Options.react'

const DetailVoteItem = React.createClass({
  propTypes: {
    vote: PropTypes.object.isRequired,
    userAccount: PropTypes.string.isRequired,
    organizationAccount: PropTypes.string.isRequired
  },
  render: function() {
    var vote = this.props.vote;
    return (
      <li key={vote.get('_id')}>
        <div  className={classNames({'vote-item': true })} onClick={this.props.onClick}>
          <ul>
            <li>
              <span className="name">Name: {vote.get('name')}</span>
            </li>
            <li>
              <span className="content">Content: {vote.get('content')}</span>
            </li>
            <li>
              <Options options={vote.get('options')} />
            </li>
            <li>
              <span className="deadline">Deadline: {vote.get('deadline')}</span>
            </li>
            <li>
              <Unlooks unlooks={vote.get('unvotes') } changeToUnvote={true} />
            </li>
          </ul>
        </div>
      </li>
    )
  },
  onDestroyClick: function() {
    // TodoActions.destroy(this.props.vote.id);
    console.log('destroy');
  }

});

export default DetailVoteItem

// var Vote =  {      //投票类        
//   _id: ObjectId,
//   name: String,           //投票的标题
//   content: String,          //投票的内容说明
//   options: [Option],          //可投选项数组
//   deadline: Date,           //投票截至日期
//   join_on: Date,
//   unvotes: [Member],          //没投人的账号account
//   // unvotes_num: Number         //没查看的人数 //deprecated
// });