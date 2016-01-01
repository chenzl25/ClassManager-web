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

const VoteCreate = React.createClass({
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
      input:Immutable.fromJS({
              name: '',
              deadlineDate: '',
              deadlineTime: '',
              content: '',
              options: ['','']
            }),
      createSuccess: false,
      createFail: false,
      createMessage: ''
    };
  },
  render: function() {
    console.log('voteCreate');
    console.log(this.state.input.get('options').toJS())
    var Options =  this.state.input.get('options')
                       .map((v,k) => (<div className="input-container" key={'option'+k}>
                                        <label htmlFor={"option"+k}>Option {k} :</label>
                                        <input type="text" autoFocus="true" name={"option"+k} value={v} onChange={this.inputChangeHandler} />
                                      </div>))
    return (
      <div className="vote-create-container">
        <p className="vote-create-header">CreateVote</p>
        <form id="vote-create-form"  onSubmit={this.submitHandler}>
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
            <textarea rows="9" cols="50" name="content" form="vote-create-form" value={this.state.input.get('content')} onChange={this.inputChangeHandler} ></textarea>
          </div>
          <div className="options-module-container">
            <div className="options-container">
              {Options}
            </div>
            <div className="option-more-less-container">
              <button className="option-more-button" onClick={this.moreOptionHandler}><span>+</span></button>
              <button className="option-less-button" onClick={this.lessOptionHandler}><span>-</span></button>
            </div>
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
  moreOptionHandler(event) {
    event.preventDefault();
    this.setImmState(input => input.set('options', input.get('options').push('')));
  },
  lessOptionHandler(event) {
    event.preventDefault();
    this.setImmState(input => input.set('options', input.get('options').pop()));
  },
  inputChangeHandler(event) {
    if (/option([0-9]*)/.test(event.target.name)) {
      var index = event.target.name.match(/option([0-9]*)/)[1];
      this.setImmState(input => input.set('options', input.get('options').set(index, event.target.value)));
      return;
    }
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
    data = data.set('options', JSON.stringify(this.state.input.get('options')));
    Actions.createVote(this.props.organizationAccount,data.toJS())
           .then((result) => {this.setState({createMessage: Object({success: result})});
                              this.setState({createSuccess: true});
                              this.setState({createFail: false})},
                 (err) => {this.setState({createMessage: Object({error:err})});
                           this.setState({createFail: true});
                           this.setState({createSuccess: false})});
  }
});

export default VoteCreate

// POST
//     /create/organization/{:account}/vote    //加cookie，  这得account是班级账号 
//     input: {
//       name:String,
//     content:String,
//     deadline:String,
//     options:[{name:''},...]
//     }
//     output: {
//       error:'',
//       message:''
//     }