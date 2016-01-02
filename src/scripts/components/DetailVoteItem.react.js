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
import moment from 'moment'

const DetailVoteItem = React.createClass({
  propTypes: {
    vote: PropTypes.object.isRequired,
    userAccount: PropTypes.string.isRequired,
    organizationAccount: PropTypes.string.isRequired
  },
  setImmState(fn) {
    return this.setState(({data}) => ({
      data: fn(data)
    }));
  },
  getInitialState: function() {
    return {
      data: Immutable.fromJS(Store.getOrganizationDetail())
    }
  },
  componentDidMount() {
    Store.addChangeListener(this.onChange);
  },
  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  },
  render: function() {
    var vote = this.props.vote;
    var userHasVoted = vote.get('unvotes').find(v => v.get('account') === this.props.userAccount) === undefined;
    console.log('userHasVoted', userHasVoted);
    var userPosition = this.state.data.get('members').find(v => v.get('account') === this.props.userAccount).get('position');
    console.log('userPosition', userPosition);
    return (
      <li key={vote.get('_id')}>
        <div  className={classNames({'detail-vote-item-container': true })} onClick={this.props.onClick}>
          <ul className="detail-vote-item-attribute-list">
            {(userPosition === 'founder' || userPosition === 'manager') ?
              (<li>
                 <span className="attribute-name"></span>
                 <button className="delete-button" onClick={this.deleteVoteHandler} >delete</button>
               </li>):''}
            <li>
              <div>
                <span className="attribute-name">Name: </span>
                <span className="detail-vote-name">{vote.get('name')}</span>
              </div>
            </li>
             <li>
              <div>
                <span className="attribute-name">Start Date: </span>
                <span className="detail-vote-start-date">{moment(vote.get('join_on')).calendar()}</span>
              </div>
            </li>
            <li>
              <div>
                <span className="attribute-name">Deadline: </span>
                <span className="detail-vote-deadline">{moment(vote.get('deadline')).calendar()}</span>
              </div>
            </li>
            <li>
              <Unlooks unlooks={vote.get('unvotes') } changeToUnvote={true} />
            </li>
            <li>
              <div>
                <span className="attribute-name">Content: </span>
                <p className="detail-vote-content">{vote.get('content')}</p>
              </div>
            </li>
            <li>
              <Options options={vote.get('options')} userHasVoted={userHasVoted} userAccount={this.props.userAccount} organizationAccount={this.props.organizationAccount} voteId={vote.get('_id')}/>
            </li>
          </ul>
        </div>
      </li>
    )
  },
  onChange() {
    this.setState({'data': Immutable.fromJS(Store.getOrganizationDetail())});
  },
  deleteVoteHandler() {
    console.log('delete the vote');
    Actions.deleteVote(this.props.organizationAccount, this.props.vote.get('_id'));
  },

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