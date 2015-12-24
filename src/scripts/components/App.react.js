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
      <div>
        <h1>App{this.props.data}</h1>
        <ul>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
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
