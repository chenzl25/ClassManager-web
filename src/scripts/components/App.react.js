import React from 'react'
// import Store from '../stores/Store'
import { Router, Route, Link } from 'react-router'
import RouteCSSTransitionGroup from './RouteCSSTransitionGroup.react'
import '../../styles/base.scss'
import StaticContainer from 'react-static-container'





const App = React.createClass({
  getDefaultProps() {
    return {
      data: 'happy'
    };
  },  
  render() {
    return (
      <div className="app-wrap">
        <h1 className="app-name">ClassManager</h1>
        <ul className="app-top-buttons">
          <li><Link className="register" to="/register">Register</Link></li>
          <li><Link className="login" to="/login">Login</Link></li>
        </ul>
        <RouteCSSTransitionGroup transitionName="base" transitionAppear={false} transitionLeave={false} transitionEnter={false} transitionAppearTimeout={0} transitionEnterTimeout={0}  >
          {this.props.children&&React.cloneElement(this.props.children, {data: this.props.data})}
        </RouteCSSTransitionGroup>
      </div>
    )
  },
  // _onChange: function() {
  //   // this.setState(getTodoState());
  // }
})
export default App;
