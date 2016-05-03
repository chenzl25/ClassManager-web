import React, { PropTypes } from 'react'
import { Router, Route, Link } from 'react-router'
import Actions from '../actions/Actions'
import validator from '../lib/validator'
import { post, get } from '../lib/service'
import Store from '../stores/Store'
import Immutable from 'immutable'
import classNames from 'classnames'
import moment from 'moment'
import Warning from './Warning.react'

const NoticeCreate = React.createClass({
  propTypes: {
    userAccount: PropTypes.string.isRequired,
    organizationAccount: PropTypes.string.isRequired
  },
  setImmState(fn) {
    return this.setState(({input}) => ({
      input: fn(input)
    }));
  },
  getInitialState: function() {
    return {  
      input:Immutable.Map({
              name: '',
              deadlineDate: '',
              deadlineTime: '',
              content: '',
            }),
      createSuccess: false,
      createFail: false,
      createMessage: ''
    };
  },
  render: function() {
    console.log('noticeCreate')
    return (
      <div className="notice-create-container">
        <p className="notice-create-header">Create Notice</p>
        <form id="notice-create-form"  onSubmit={this.submitHandler}>
          <div className="name-deadline-container">
            <div className="input-container">
              <label htmlFor="name">Name:</label>
              <input type="text" autoFocus="true" name="name" value={this.state.input.get('name')} onChange={this.inputChangeHandler} />
            </div>
            <div className="input-container">
              <label htmlFor="deadline">Deadline:</label>
              <input type="date" name="deadlineDate" value={this.state.input.get('deadlineDate')} onChange={this.inputChangeHandler} />
              <input type="time" name="deadlineTime" value={this.state.input.get('deadlineTime')} onChange={this.inputChangeHandler} />
            </div>
          </div>
          <div className="image-input-container">
            <label htmlFor="image">
              <svg onClick={this.svgClickHandler} xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/></svg>
            </label>
            <input ref="noticeCreateImageInput" type="file" name="image" onChange={this.imageChangeHandler} />
            <img className="notice-create-image-preview" src="" ref="imagePreview" alt="Upload" />
          </div>
          <div className="input-container">
            <label htmlFor="content">Content:</label>
            {/*<input type="text" name="content" value={this.state.input.get('content')} onChange={this.inputChangeHandler} />*/}
            <textarea rows="9" cols="50" name="content" form="notice-create-form" value={this.state.input.get('content')} onChange={this.inputChangeHandler} ></textarea>
          </div>
          <div className="input-container">
            <label htmlFor="submit" ></label>
            <input type="submit" name="submit" value="Create"/>
          </div>
          <Warning message={(() => {
                              if (!this.state.createSuccess && !this.state.createFail) {
                                return {};
                              }
                              if (this.state.createSuccess) {
                                return this.state.createMessage;
                              }
                              if (this.state.createFail) {
                                return this.state.createMessage;
                              }
                            })()} />
        </form>
      </div>
    );
  },
  inputChangeHandler(event) {
    var name = event.target.name;
    var value = event.target.value;
    this.setImmState(d => d.update(name, v => value));
    // this.setImmState(input => input.update(event.target.name, v => event.target.value));
  },
  imageChangeHandler() {
    var image = this.refs.noticeCreateImageInput.files[0];
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
    var deadlineMoment = moment(this.state.input.get('deadlineDate')+' '+this.state.input.get('deadlineTime'));
    var deadlineDate = deadlineMoment.toDate();
    var deadline = deadlineDate.getTime();
    data = data.set('name', this.state.input.get('name'));
    data = data.set('content', this.state.input.get('content'));
    data = data.set('deadline', deadline);
    var image = this.refs.noticeCreateImageInput.files[0];
    if (image) {
      data = data.set('image', image);
    }
    Actions.createNotice(this.props.organizationAccount,data.toJS())
           .then((result) => {this.setState({createMessage: Object({success: result})});
                              this.setState({createSuccess: true});
                              this.setState({createFail: false})},
                 (err) => {this.setState({createMessage: Object({error:err})});
                           this.setState({createFail: true});
                           this.setState({createSuccess: false})});
  },
  svgClickHandler() {
    this.refs.noticeCreateImageInput.click();
  }
});

export default NoticeCreate

// /create/organization/{:account}/notice

// Notice = {
//   _id: ObjectId,         //在数据库里面的ID，子对象都有ID，可以不用管
//   account: String,       // organization account
//   name: String,      //作业的名称
//   content: String,     //作业内容
//   deadline: Date,      //作业的截至日期
//   unlook: Boolean,        //对于User来说，看到了没    方便Organization类统计
//   uncomplish: Boolean     //是否完成了作业
// });

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