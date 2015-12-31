import React, { PropTypes } from 'react'
import { Router, Route, Link } from 'react-router'
import Actions from '../actions/Actions'
import validator from '../lib/validator'
import { post, get } from '../lib/service'
import Store from '../stores/Store'
import Immutable from 'immutable'
import classNames from 'classnames'
import moment from 'moment'

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
              content: '',
              deadline: '',
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
        <p>Create Homework</p>
        <form id="homework-create-form"  onSubmit={this.submitHandler}>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" autoFocus="true" name="name" value={this.state.input.get('name')} onChange={this.inputChangeHandler} />
          </div>
          <div>
            <label htmlFor="content">Content:</label>
            <input type="text" name="content" value={this.state.input.get('content')} onChange={this.inputChangeHandler} />
          </div>
          <div>
            <label htmlFor="deadline">Student Id:</label>
            <input type="text" name="deadline" value={this.state.input.get('deadline')} onChange={this.inputChangeHandler} />
          </div>
        </form>
      </div>
    );
  },
  inputChangeHandler(event) {
    this.setImmState(d => d.update(event.target.name, v => event.target.value));
  },
  submitHandler(event) {
    event.preventDefault();
    var data = Immutable.Map();
    console.log(this.state.input.keys());
    for (var key of this.state.input.keys()) {
      if (this.state.input.get(key))
        data = data.set(key, this.state.input.get(key));
    }
    Actions.createHomework(data.toJS())
           .then((result) => {this.setState({createMessage: result});
                              this.setState({createSuccess: true});
                              this.setState({createFail: false})},
                 (err) => {this.setState({createMessage: err});
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