import React, { PropTypes } from 'react'
import { Router, Route, Link } from 'react-router'
import Actions from '../actions/Actions'
import validator from '../lib/validator'
import { post, get } from '../lib/service'
import Store from '../stores/Store'
import Immutable from 'immutable'
import classNames from 'classnames'
import path from 'path'
// import '../../styles/OptionItem.scss'
import Supporters from './Supporters.react'

const OptionItem = React.createClass({
  propTypes: {
    option: PropTypes.object.isRequired,
    userAccount: PropTypes.string.isRequired,
    organizationAccount: PropTypes.string.isRequired,
    voteId: PropTypes.string.isRequired,
    userHasVoted: PropTypes.bool.isRequired
  },
  render: function() {
    var option = this.props.option;
    console.log('userHasVoted:', this.props.userHasVoted)
    var userVoteHere;
    if (this.props.userHasVoted) {
      userVoteHere = option.get('supporters').find(v => v.get('account') === this.props.userAccount) !== undefined;
    }
    return (
      <li key={option.get('_id')}>
        <div  className="option-item-container" onClick={this.props.onClick}>
          <div className="option-item-name-container">
          	<span className="option-item-name">{option.get('name')}</span>
            {!this.props.userHasVoted ? <button className="vote-button" onClick={this.voteHandler}>vote</button>:''}
            {userVoteHere? (<span className="user-vote-here">Voted</span>): ''}
          </div>
          <Supporters supporters={option.get('supporters')} />
        </div>
      </li>
    )
  },
  onDestroyClick: function() {
    // TodoActions.destroy(this.props.option.id);
    console.log('destroy');
  },
  voteHandler() {
    Actions.vote(this.props.organizationAccount, this.props.voteId, this.props.option.get('_id'));
  }

});

export default OptionItem

// var Option =  {    //投票选项类
// 	_id: ObjectId, 
// 	name: String, 						//选项的名字
// 	votes : Number, 					//这个选项所得票数
// 	supporters: [MemberSchema]				//有谁投了它
// });

