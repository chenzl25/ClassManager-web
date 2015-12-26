import React, { PropTypes } from 'react'
import { Router, Route, Link } from 'react-router'
import Actions from '../actions/Actions'
import validator from '../lib/validator'
import { post, get } from '../lib/service'
import Store from '../stores/Store'
import Immutable from 'immutable'
import classNames from 'classnames'
import HomeworkItem from './HomeworkItem.react'

const Homeworks = React.createClass({
  render() {
    var data = this.props.data.get('homeworks');
    var homeworks = data.map( v => <HomeworkItem homework={v} key={v.get('_id')} />);
    return (
      <div className="homeworks">
        <ul className="homwroks-list">
        	{homeworks}
		</ul>
      </div>
    )
  },
})
export default Homeworks;
