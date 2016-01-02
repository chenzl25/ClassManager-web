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


const DetailNoticeItem = React.createClass({
  propTypes: {
    notice: PropTypes.object.isRequired,
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
    var notice = this.props.notice;
    var userIsUnlook = false;
    if (this.state.data.get('notices').find(v => v.get('_id') == notice.get('_id')).get('unlooks').find(v => v.get('account') === this.props.userAccount)) {
      userIsUnlook = true;
    }
    console.log(userIsUnlook , 'userIsUnlook');
    var userPosition = this.state.data.get('members').find(v => v.get('account') === this.props.userAccount).get('position');
    console.log('userPosition', userPosition);
    return (
      <li key={notice.get('_id')}>
        <div  className={classNames({'detail-notice-item-container': true })} onClick={this.props.onClick}>
          <ul className="detail-notice-item-attribute-list">
            {(userPosition === 'founder' || userPosition === 'manager') ?
              (<li>
                 <span className="attribute-name"></span>
                 <button className="delete-button" onClick={this.deleteNoticeHandler} >delete</button>
               </li>):''}
            <li>
              <div>
                <span className="attribute-name">Name: </span>
                <span className="detail-notice-name">{notice.get('name')}</span>
              </div>
            </li>
            <li>
              <div>
                <span className="attribute-name">Start Date: </span>
                <span className="detail-notice-start-date">{moment(notice.get('join_on')).calendar()}</span>
              </div>
            </li>
            <li>
              <Unlooks unlooks={notice.get('unlooks')} />
            </li>
            <li>
              <div className="detail-notice-image-container">
                <img className="detail-notice-image" src={'/api/'+notice.get('image')} />
              </div>
            </li>
            <li>
              <div>
                <span className="attribute-name">Content: </span>
                <p className="detail-notice-content">{notice.get('content')}</p>
              </div>
            </li>
            <li>
              {userIsUnlook? <button className="notice-item-look-button" onClick={this.lookHandeler}>Look</button>:'hasLooked'}
            </li>
          </ul>
        </div>
      </li>
    )
  },
  onChange() {
    this.setState({'data': Immutable.fromJS(Store.getOrganizationDetail())});
  },
  deleteNoticeHandler() {
    console.log('delete the notice');
    Actions.deleteNotice(this.props.organizationAccount, this.props.notice.get('_id'));
  },
  lookHandeler() {
    console.log('looked');
    Actions.lookNotice(this.props.organizationAccount, this.props.notice.get('_id'));
  },

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