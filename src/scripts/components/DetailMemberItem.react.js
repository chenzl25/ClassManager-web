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
  setImmState(fn) {
    return this.setState(({data}) => ({
      data: fn(data)
    }));
  },
  getInitialState() {
    return {data:  Immutable.fromJS(Store.getUser())};
  },
  // componentDidMount() {
  //     Store.addChangeListener(this.onStoreChange);
  // },
  // componentWillUnmount() {
  //     Store.removeChangeListener(this.onStoreChange);
  // },
  render: function() {
    var member = this.props.member;
    console.log(this.state.data.get('relationships').find(v => v.get('account') === this.props.organizationAccount).get('position'), 'in detail MemberItem');
    var userIsFounder = false;
    if (this.state.data.get('relationships').find(v => v.get('account') === this.props.organizationAccount).get('position') === 'founder') {
      userIsFounder = true;
    }
    var memberIsMember = member.get('position') === 'member';
    var memberIsManager = member.get('position') === 'manager';
    var memberIsFounder = member.get('position') === 'founder'
    var memberIsOthers = !memberIsMember && !memberIsManager && !memberIsFounder;
    return (
      <li key={member.get('_id')}>
        <div  className={classNames({'detail-member-item-container': true })} onClick={this.props.onClick}>
          <ul className="detail-member-item-attribute-list">
            <li>
              <div className="detail-member-image-container">
                <img className="detail-member-image" src={'/api/'+member.get('image')} />
                {userIsFounder && memberIsMember && !memberIsFounder? 
                  (
                    <div className="up-button-container">
                      <button className="up-button" onClick={this.upButtonClickHandler}>Up</button>
                    </div>
                   ):''
                }
                {userIsFounder && memberIsManager && !memberIsFounder || memberIsOthers? 
                  (
                    <div className="down-button-container">
                      <button className="down-button" onClick={this.downButtonClickHandler}>Down</button>
                    </div>
                   ):''
                }
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
  // onStoreChange() {
  //    this.setImmState(d => Immutable.fromJS(Store.getUser()));
  // },
  upButtonClickHandler() {
    console.log('upButtonClickHandler');
    Actions.upMember(this.props.organizationAccount, this.props.member.get('_id'));
  },
  downButtonClickHandler() {
    console.log('downButtonClickHandler');
    Actions.downMember(this.props.organizationAccount, this.props.member.get('_id'));
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