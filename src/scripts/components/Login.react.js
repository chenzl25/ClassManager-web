import React from 'react'
import { Router, Route, Link } from 'react-router'
import Actions from '../actions/Actions'
import validator from '../lib/validator'
import { post, get } from '../lib/service'
import Store from '../stores/Store'
import Immutable from 'immutable';
import path from 'path'
import Warning from './Warning.react'

const Login = React.createClass({
  setImmState(fn) {
    return this.setState(({data}) => ({
      data: fn(data)
    }));
  },
  shouldComponentUpdate(nextProps, nextState) {
    return !nextState.data.equals(this.state.data);
  },
  getInitialState() {
      return {
        data: Immutable.Map({
                account: null,
                password: null,
                warning: null,
                isLogin: Store.isLogin()})
        };
  },
  componentDidMount(){
    Store.addChangeListener(this.isLogin);
  },
  componentWillUnmount(){
    Store.removeChangeListener(this.isLogin);
  },
  
  render() {
    var WarningComponent;
    if (this.state.data.get('warning')) {
      WarningComponent = <Warning message={this.state.data.get('warning')} />
    }
    return (
	    <form id="login-form"  onSubmit={this.submitHandler}>
        <div>
	    		<label htmlFor="account">Account:</label>
	    		<input type="text" autoFocus="true" name="account" placeholder="account" onChange={this.changeHandler} />
	    	</div>
	    	<div>
	    		<label htmlFor="password">password:</label>
	    		<input type="password" name="password" placeholder="password" onChange={this.changeHandler} />
	    	</div>
	    	<div>
	    		<label htmlFor="submit"></label>
	    		<input type="submit" name ="submit"/>
	    	</div>
        {WarningComponent}
	    </form>
    )
  },
  changeHandler(event) {
    this.setImmState(d => d.update(event.target.name, v => event.target.value));
  },
  submitHandler(event) {
    event.preventDefault();
    var result = validator.validate(this.state.data.toJS())
    this.setImmState(d => d.update('warning', v => result.toJS()));
    if (result.size == 0) {
      Actions.login(this.state.data.get('account'), this.state.data.get('password'))
             .catch(err => this.setImmState(d => d.update('warning', v => Object({error: err}))));
    }
    // console.log(this.props.history)
    // this.props.history.pushState(null, '/user/' + this.state.account);
  },
  isLogin()  {
    console.log(Store.isLogin())
    if(Store.isLogin()) {
      this.props.history.pushState(null, path.join('/','user', this.state.data.get('account'), '/'));
    }
  },
})
export default Login;
