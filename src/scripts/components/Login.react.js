import React from 'react'
import { Router, Route, Link } from 'react-router'
import Actions from '../actions/Actions'
import validator from '../lib/validator'
import Store from '../stores/Store'

const Login = React.createClass({
  getInitialState() {
      return {
        account: null,
        password: null,
        warning: null
      };
  },
  componentDidMount: () => {
    Store.addChangeListener(this._isLogin);
  },
  componentWillUnmount: () => {
    Store.removeChangeListener(this._isLogin);
  },
  
  render() {
    return (
	    <form onSubmit={this._submitHandler}>
	    	<div>
	    		<label htmlFor="account">Account:</label>
	    		<input type="text" autoFocus="true" name="account" placeholder="account" onChange={this._changeHandler} />
	    	</div>
	    	<div>
	    		<label htmlFor="password">password:</label>
	    		<input type="text" name="password" placeholder="password" onChange={this._changeHandler} />
	    	</div>
	    	<div>
	    		<label htmlFor="submit"></label>
	    		<input type="submit" name ="submit"/>
	    	</div>
	    	<div className="warning">{this.state.warning}</div>
	    </form>
    )
  },
  _changeHandler: (event) => {
    var newState = {}
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  },
  _submitHandler: (event) => {
    event.preventDefault();
    var result = validator.validate({accout: this.state.account,
                        password: this.state.password});
    if (result) {
      // toString should be considered again
      this.setState(warning, result.toString());
    } else{
      Actions.login(this.state.account, this.state.password);
    }
  },
  _isLogin: () => {
    if(Store.isLogin()) {
      this.props.history.pushState(null, '/user/' + this.state.account);
    }
  }
})
export default Login;
