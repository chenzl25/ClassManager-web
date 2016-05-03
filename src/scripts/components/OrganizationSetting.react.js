import React, { PropTypes } from 'react'
import { Router, Route, Link } from 'react-router'
import Actions from '../actions/Actions'
import validator from '../lib/validator'
import { post, get } from '../lib/service'
import Store from '../stores/Store'
import Immutable from 'immutable'
import classNames from 'classnames'
import path from 'path'

const OrganizationSetting = React.createClass({
  propTypes: {
    organizationData: PropTypes.object.isRequired,
    userAccount: PropTypes.string.isRequired
  },
  setImmState(fn) {
    return this.setState(({input}) => ({
      input: fn(input)
    }));
  },
  componentWillReceiveProps(nextProps) {
    var data = nextProps.organizationData;
    if (nextProps.organizationData.get('account') !== this.props.organizationData.get('account')) {
      this.setState({'settingMessage': ''});
      this.setState({'settingSuccess': false});
      this.setState({'settingFail': false});
    }
    this.setImmState(input => input.set('name', data.get('name')));
    this.setImmState(input => input.set('school', data.get('school')));
  },
  getInitialState: function() {
    var data = this.props.organizationData;
    return {  
      input: Immutable.Map({
              name: data.get('name'),
              school: data.get('school'),
              password: data.get('password') 
            }),
      settingMessage: '',
      settingSuccess: false,
      settingFail: false
    };
  },
  render() {
    var data = this.props.organizationData;
    return (<div className="organization-setting-container">
              <form id="organization-setting-form"  onSubmit={this.submitHandler}>
                <div className="organization-setting-image-container">
                  <div className="image-input-container">
                    <img className="organization-setting-image" src={'/api/'+data.get('image')} />
                    <label htmlFor="image">
                      <svg onClick={this.svgClickHandler} xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/></svg>
                    </label>
                    <input ref="userSettingImageInput" type="file" name="image" onChange={this.imageChangeHandler} />
                    <img className="organization-setting-image-preview" src="" ref="imagePreview" alt="Upload" />
                  </div>
                </div>
                <div>
                  <label htmlFor="name">Name:</label>
                  <input type="text" autoFocus="true" name="name" value={this.state.input.get('name')} onChange={this.inputChangeHandler} />
                </div>
                <div>
                  <label htmlFor="school">School:</label>
                  <input type="text" name="school" value={this.state.input.get('school')} onChange={this.inputChangeHandler} />
                </div>
                <div>
                  <label htmlFor="password">Password:</label>
                  <input type="password" name="password" value={this.state.input.get('password')} onChange={this.inputChangeHandler} />
                </div>
                <div>
                  <label htmlFor="submit" className={classNames({success:this.state.settingSuccess, warning:this.state.settingFail})}></label>
                  <input type="submit" name ="submit" value="Setting"/>
                </div>
              </form>
              <p>{this.state.settingMessage}</p>
            </div>);
  },
  inputChangeHandler(event) {
    var name = event.target.name;
    var value = event.target.value;
    this.setImmState(d => d.update(name, v => value));
    // this.setImmState(d => d.update(event.target.name, v => event.target.value));
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
    if (data.get('password') === undefined) {
      data = data.set('password', '');
    }
    Actions.organizationSetting(this.props.organizationData.get('account'),data.toJS())
           .then((result) => {this.setState({settingMessage: result});
                              this.setState({settingSuccess: true}),
                              this.setState({settingFail: false}) },
                 (err) => {this.setState({settingMessage: err});
                              this.setState({settingSuccess: false}),
                              this.setState({settingFail: true}) });
  },
  svgClickHandler() {
    this.refs.userSettingImageInput.click();
  }
});
export default OrganizationSetting

// var Organization = {
//   _id: ObjectId,
//     name: String,                      //班级名字
//     account: String,           //班级账号
//     password: String,            //班级密码 用于User的加入
//     image: String,             //班级头像
//     school: String,
//     join_on: Date,
//     members: [Member],             //成员数组
//     homeworks: [Homework],         //作业数组
//     notices: [Notice],           //公告数组
//     votes: [Vote],             //投票数组
//     joiners:[String],          //申请加入该群的人的账号
//     status: [Status]           //类似与User里的status，用于检验是否修改了，这一有6个元素
// });