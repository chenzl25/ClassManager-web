import React, { PropTypes } from 'react'
import { Router, Route, Link } from 'react-router'
import Actions from '../actions/Actions'
import validator from '../lib/validator'
import { post, get } from '../lib/service'
import Store from '../stores/Store'
import Immutable from 'immutable'
import classNames from 'classnames'
import path from 'path'
// import '../../styles/OptionItem.scss'
import Supporters from './Supporters.react'

const OptionItem = React.createClass({
  propTypes: {
    option: PropTypes.object.isRequired,
  },
  render: function() {
    var option = this.props.option;
    return (
      <li key={option.get('_id')}>
        <div  className={classNames({'option-item': true })} onClick={this.props.onClick}>
          <div className="name-wrap">
          	<span className="name">{option.get('name')}</span>
          </div>
          <Supporters supporters={option.get('supporters')} />
        </div>
      </li>
    )
  },
  onDestroyClick: function() {
    // TodoActions.destroy(this.props.option.id);
    console.log('destroy');
  }

});

export default OptionItem

// var Option =  {    //投票选项类
// 	_id: ObjectId, 
// 	name: String, 						//选项的名字
// 	votes : Number, 					//这个选项所得票数
// 	supporters: [MemberSchema]				//有谁投了它
// });

