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
  setImmState(fn) {
    return this.setState(({input}) => ({
      input: fn(input)
    }));
  },
  getInitialState: function() {
    var data = this.props.data;
    return {  input:
      Immutable.Map({
        account: data.get('account'),
        nick_name: data.get('nick_name'),
        name: data.get('name'),
        student_id: data.get('student_id'),
        gender: data.get('gender'),
        email: data.get('email'),
        phone: data.get('phone'),
        qq: data.get('qq'),
        wechat: data.get('wechat'),
      })
    };
  },
  render() {
    var result = this.props.data;
    return (<div className="user-setting-container">
              <form id="user-setting-form"  onSubmit={this.submitHandler}>
                <div className="user-setting-image-container">
                  <div className="image-input-container">
                    <img className="user-setting-image" src={'/api/'+result.get('image')} />
                    <label htmlFor="image">
                      <svg onClick={this.svgClickHandler} xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/></svg>
                    </label>
                    <input ref="userSettingImageInput" type="file" name="image" onChange={this.imageChangeHandler} />
                    <img className="user-setting-image-preview" src="" ref="imagePreview" alt="Upload" />
                  </div>
                </div>
                <div>
                  <label htmlFor="account">Account:</label>
                  <input type="text" autoFocus="true" name="account" defaultValue={result.get('account')} onChange={this.inputChangeHandler} />
                </div>
                <div>
                  <label htmlFor="nick-name">Nick Name:</label>
                  <input type="text" name="nick-name" defaultValue={result.get('nick_name')} onChange={this.inputChangeHandler} />
                </div>
                <div>
                  <label htmlFor="name">Name:</label>
                  <input type="text" name="name" defaultValue={result.get('name')} onChange={this.inputChangeHandler} />
                </div>
                <div>
                  <label htmlFor="student-id">Student Id:</label>
                  <input type="text" name="student-id" defaultValue={result.get('student_id')} onChange={this.inputChangeHandler} />
                </div>
                <div>
                  <label htmlFor="gender">Gender:</label>
                  <input type="text" name="gender" defaultValue={result.get('gender')} onChange={this.inputChangeHandler} />
                </div>
                <div>
                  <label htmlFor="email">Email:</label>
                  <input type="text" name="email" defaultValue={result.get('email')} onChange={this.inputChangeHandler} />
                </div>
                <div>
                  <label htmlFor="phone">Phone:</label>
                  <input type="text" name="phone" defaultValue={result.get('phone')} onChange={this.inputChangeHandler} />
                </div>
                <div>
                  <label htmlFor="qq">QQ:</label>
                  <input type="text" name="qq" defaultValue={result.get('qq')} onChange={this.inputChangeHandler} />
                </div>
                <div>
                  <label htmlFor="wechat">Wechat:</label>
                  <input type="text" name="wechat" defaultValue={result.get('wechat')} onChange={this.inputChangeHandler} />
                </div>
                <div>
                  <label htmlFor="submit"></label>
                  <input type="submit" name ="submit"/>
                </div>
              </form>
            </div>);
  },
  inputChangeHandler(event) {
    this.setImmState(d => d.update(event.target.name, v => event.target.value));
  },
  imageChangeHandler() {
    var image = this.refs.userSettingImageInput.files[0];
    var that = this;
    if (image) {
      var reader  = new FileReader();
      reader.onloadend = function () {
        that.refs.imagePreview.src = reader.result;
      }
      reader.readAsDataURL(image);
    }
  },
  submitHandler(event) {
    event.preventDefault();
    var data = Immutable.Map();
    var image = this.refs.userSettingImageInput.files[0];
    if (image) {
      data = data.set('image', image);
    }
    console.log(this.state.input.keys());
    for (var key of this.state.input.keys()) {
      if (this.state.input.get(key))
        data = data.set(key, this.state.input.get(key));
    }
    Actions.userSetting(data.toJS());
  },
  svgClickHandler() {
    this.refs.userSettingImageInput.click();
  }
});
export default UserSetting
