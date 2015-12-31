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

const HomeworkCreate = React.createClass({
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
    console.log('homeworkCreate')
    return (
      <div className="homework-create-container">
        <p className="homework-create-header">Create Homework</p>
        <form id="homework-create-form"  onSubmit={this.submitHandler}>
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
          <div className="input-container">
            <label htmlFor="content">Content:</label>
            {/*<input type="text" name="content" value={this.state.input.get('content')} onChange={this.inputChangeHandler} />*/}
            <textarea rows="9" cols="50" name="content" form="homework-create-form" value={this.state.input.get('content')} onChange={this.inputChangeHandler} ></textarea>
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
    this.setImmState(input => input.update(event.target.name, v => event.target.value));
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
    Actions.createHomework(this.props.organizationAccount,data.toJS())
           .then((result) => {this.setState({createMessage: Object({success: result})});
                              this.setState({createSuccess: true});
                              this.setState({createFail: false})},
                 (err) => {this.setState({createMessage: Object({error:err})});
                           this.setState({createFail: true});
                           this.setState({createSuccess: false})});
  }
});

export default HomeworkCreate

// /create/organization/{:account}/homework

// Homework = {
//   _id: ObjectId,         //在数据库里面的ID，子对象都有ID，可以不用管
//   account: String,       // organization account
//   name: String,      //作业的名称
//   content: String,     //作业内容
//   deadline: Date,      //作业的截至日期
//   unlook: Boolean,        //对于User来说，看到了没    方便Organization类统计
//   uncomplish: Boolean     //是否完成了作业
// });