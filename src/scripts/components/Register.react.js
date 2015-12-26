import React from 'react'
import { post, get } from '../lib/service'
import validator from '../lib/validator'
import Immutable from 'immutable'
import classNames from 'classnames'
import Warning from './Warning.react'
import Store from '../stores/Store'

const Register = React.createClass({
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
                again: null,
                warning: null,
                registered: false})
        };
  },
  render() {
    var WarningComponent;
    console.log(this.state.data.get('waring'))
    if (this.state.data.get('warning')) {
      WarningComponent = <Warning message={this.state.data.get('warning')} 
               url={this.state.data.get('registered')? '/login' : null}/>
    }
    return (
			<form id="register-form"  onSubmit={this.submitHandler}>
        <div>
					<label htmlFor="account">Account:</label>
					<input type="text" autoFocus="true" name="account" placeholder="account" onChange={this.changeHandler} />
				</div>
				<div>
					<label htmlFor="password">password:</label>
					<input type="password" name="password" placeholder="password" onChange={this.changeHandler} />
				</div>
				<div>
					<label htmlFor="again">Again:</label>
					<input type="text" name="again" placeholder="password" onChange={this.changeHandler} />
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
      post('/register/user', {account:this.state.data.get('account'), password: this.state.data.get('password')})
          .then((result) => {
            console.log(result.toJS());
            this.setImmState(d=> d.update('registered', v => true));
            this.setImmState(d => d.update('warning', v => Store.getMessage()));
          }, (err) => {
            console.log('reject:',err);
            this.setImmState(d => d.update('warning', v => Object({error: err})));
          })
    }
  },
})
export default Register;
