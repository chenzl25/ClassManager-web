import React, { PropTypes } from 'react'
import { Router, Route, Link } from 'react-router'
import Actions from '../actions/Actions'
import validator from '../lib/validator'
import { post, get } from '../lib/service'
import Store from '../stores/Store'
import Immutable from 'immutable'
import classNames from 'classnames'
import path from 'path'
import RadioGroup from 'react-radio-group'
import Warning from './Warning.react'

const OrganizationCreate = React.createClass({
  propTypes: {
  },
  setImmState(fn) {
    return this.setState(({input}) => ({
      input: fn(input)
    }));
  },
  getInitialState: function() {
    return {  
      input:Immutable.Map({
              account: '',
              password: '',
              again: '',
      }),
      registerSuccess: false,
      registerFail: false,
      registerMessage: ''
    };
  },
  render() {
    var input = this.state.input
    return (<div className="organization-create-container">
              <h1 className="organization-create-header">Register Organization</h1>
              <form id="organization-create-form"  onSubmit={this.submitHandler}>
                <div>
                  <label htmlFor="account"></label>
                  <input type="text" autoFocus="true" name="account" placeholder="account" onChange={this.inputChangeHandler} />
                </div>
                <div>
                  <label htmlFor="password"></label>
                  <input type="password" name="password"  placeholder="password" onChange={this.inputChangeHandler} />
                </div>
                <div>
                  <label htmlFor="again"></label>
                  <input type="password" name="again" placeholder="again" onChange={this.inputChangeHandler} />
                </div>
                <div>
                  <label htmlFor="submit" ></label>
                  <input type="submit" name="submit" value="Register"/>
                </div>
              </form>
              {/*<p>{this.state.registerMessage}</p>*/}
              <Warning message={(() => {
                                  if (!this.state.registerSuccess && !this.state.registerFail) {
                                    return {};
                                  }
                                  if (this.state.registerSuccess) {
                                    return this.state.registerMessage;
                                  }
                                  if (this.state.registerFail) {
                                    return this.state.registerMessage;
                                  }
                                })()} />
            </div>);
  },
  inputChangeHandler(event) {
    var name = event.target.name;
    var value = event.target.value;
    this.setImmState(d => d.update(name, v => value));
    // this.setImmState(input => input.update(event.target.name, v => event.target.value));
  },
  submitHandler(event) {
    event.preventDefault();
    var result = validator.validate(this.state.input.toJS())
    if (result.size == 0) {
      Actions.registerOrganization(this.state.input.get('account'), this.state.input.get('password'))
             .then((result) => {this.setState({registerMessage: Object({success: result})});
                                this.setState({registerSuccess: true});
                                this.setState({registerFail: false})},
                   (err) => {this.setState({registerMessage: Object({error:err})});
                             this.setState({registerFail: true});
                             this.setState({registerSuccess: false})});
      
    } else {
      this.setState({registerMessage: result.toJS()});
      this.setState({registerFail: true});
      this.setState({registerSuccess: false});
    }
  },
});
export default OrganizationCreate
