import React from 'react'
const Register = React.createClass({
  getInitialState() {
      return {
        account: "",
        password: "",
        again: ""
      };
  },
  changeHandler(event) {
  	var newState = {}
  	newState[event.target.name] = event.target.value;
  	this.setState(newState);
  },
  submitHandler(event) {
  	event.preventDefault();
    console.log(this.props.history)
  	this.props.history.pushState(null, '/user/' + this.state.account);
  },
  render() {
    return (
			<form key="register" onSubmit={this.submitHandler}>
				<div>
					<label htmlFor="account">Account:</label>
					<input type="text" autoFocus="true" name="account" placeholder="account" onChange={this.changeHandler} />
				</div>
				<div>
					<label htmlFor="password">password:</label>
					<input type="text" name="password" placeholder="password" onChange={this.changeHandler} />
				</div>
				<div>
					<label htmlFor="again">Again:</label>
					<input type="text" name="again" placeholder="password" onChange={this.changeHandler} />
				</div>
				<div>
					<label htmlFor="submit"></label>
					<input type="submit" name ="submit"/>
				</div>
				<div className="warning">warning</div>
			</form>
    )
  },
  _onChange: function() {
    // this.setState(getTodoState());
  }
})
export default Register;
