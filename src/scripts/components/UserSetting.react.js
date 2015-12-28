import React, { PropTypes } from 'react'
import { Router, Route, Link } from 'react-router'
import Actions from '../actions/Actions'
import validator from '../lib/validator'
import { post, get } from '../lib/service'
import Store from '../stores/Store'
import Immutable from 'immutable'
import classNames from 'classnames'
import path from 'path'

const UserSetting = React.createClass({
  propTypes: {
    data: PropTypes.object
  },
  render() {
    var result = this.props.data;
    return (<div className="user-setting-container">
              <form id="user-setting-form"  onSubmit={this.submitHandler}>
                <div className="user-setting-image-container">
                  <img className="user-setting-image" src={'/api/'+result.get('image')} />
                  <label htmlFor="user-setting-image"></label>
                  <input type="file" name="image" onChange={this.imageChangeHandler} />
                </div>
                <div>
                  <label htmlFor="account">Account:</label>
                  <input type="text" autoFocus="true" name="account" defaultValue={result.get('account')} onChange={this.changeHandler} />
                </div>
                <div>
                  <label htmlFor="nick-name">Nick Name:</label>
                  <input type="text" name="nick-name" defaultValue={result.get('nick_name')} onChange={this.changeHandler} />
                </div>
                <div>
                  <label htmlFor="name">Name:</label>
                  <input type="text" name="name" defaultValue={result.get('name')} onChange={this.changeHandler} />
                </div>
                <div>
                  <label htmlFor="student-id">Student Id:</label>
                  <input type="text" name="student-id" defaultValue={result.get('student_id')} onChange={this.changeHandler} />
                </div>
                <div>
                  <label htmlFor="gender">Gender:</label>
                  <input type="text" name="gender" defaultValue={result.get('gender')} onChange={this.changeHandler} />
                </div>
                <div>
                  <label htmlFor="email">Email:</label>
                  <input type="text" name="email" defaultValue={result.get('email')} onChange={this.changeHandler} />
                </div>
                <div>
                  <label htmlFor="phone">Phone:</label>
                  <input type="text" name="phone" defaultValue={result.get('phone')} onChange={this.changeHandler} />
                </div>
                <div>
                  <label htmlFor="qq">QQ:</label>
                  <input type="text" name="qq" defaultValue={result.get('qq')} onChange={this.changeHandler} />
                </div>
                <div>
                  <label htmlFor="wechat">Wechat:</label>
                  <input type="text" name="wechat" defaultValue={result.get('wechat')} onChange={this.changeHandler} />
                </div>
                <div>
                  <label htmlFor="submit"></label>
                  <input type="submit" name ="submit"/>
                </div>
              </form>
              {/*<ul className="user-setting-list">
                <li>
                  <div className="user-setting-image-container">
                    <img className="user-setting-image" src={'/api/'+result.get('image')} />
                  </div>
                </li>
                <li>
                  <div>
                    <span className="attribute-name">Account: </span>
                    <span className="user-setting-account">{result.get('account')}</span>
                  </div>
                </li>
                <li>
                  <div>
                    <span className="attribute-name">Nick Name: </span>
                    <span className="user-setting-nick_name">{result.get('nick_name')}</span>
                  </div>
                </li>
                <li>
                  <div>
                    <span className="attribute-name">Name: </span>
                    <span className="user-setting-name">{result.get('name')}</span>
                  </div>
                </li>
                <li>
                  <span className="user-setting-gender">Gender: {result.get('gender')}</span>
                </li>
                <li>
                  <span className="user-setting-school">Email: {result.get('email')}</span>
                </li>
                <li>
                  <span className="user-setting-phone">Phone: {result.get('phone')}</span>
                </li>
                <li>
                  <span className="user-setting-student_id">Student Id: {result.get('student_id')}</span>
                </li>
                <li>
                  <span className="user-setting-phone">Phone: {result.get('phone')}</span>
                </li>
                <li>
                  <span className="user-setting-qq">QQ: {result.get('qq')}</span>
                </li>
                <li>
                  <span className="user-setting-wechat">Wechat: {result.get('wechat')}</span>
                </li>
              </ul>*/}
            </div>);
  },
  changeHandler() {

  },
  imageChangeHandler() {

  },
  submitHandler() {

  }
});
export default UserSetting
