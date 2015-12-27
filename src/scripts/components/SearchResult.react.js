import React, { PropTypes } from 'react'
import { Router, Route, Link } from 'react-router'
import Actions from '../actions/Actions'
import validator from '../lib/validator'
import { post, get } from '../lib/service'
import Store from '../stores/Store'
import Immutable from 'immutable'
import classNames from 'classnames'
import path from 'path'

const searchResult = React.createClass({
  propTypes: {
    selectedValue: PropTypes.string
  },
  setImmState(fn) {
    return this.setState(({data}) => ({
      data: fn(data)
    }));
  },
  getInitialState: function() {
    return {data:  Immutable.fromJS(Store.getSearchAll())};
  },
  shouldComponentUpdate(nextProps, nextState) {
    return !nextState.data.equals(this.state.data);
  },
  componentDidMount() {
    Store.addChangeListener(this.onChange);
  },
  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  },
  render: function() {
    var data = this.state.data;
    var view;
    if (detectSearchResult(data) === 'searchFail') {
      console.log('searchFail');
      view = (<div className="search-result-message">
                <p>{data.get('message')}</p>
              </div>);
    } else if (detectSearchResult(data) === 'searchSuccess') {
      var result = data.get(this.props.selectedValue);
      if (this.props.selectedValue === 'organization') {
        console.log('searchSuccess organization');
        view = (<div  className="search-result-organization-container">
                  <ul>
                    <li>
                      <div className="search-result-container">
                        <img className="search-result-image" src={'/api/'+result.get('image')} />
                      </div>
                    </li>
                    <li>
                      <span className="account">Account: {result.get('account')}</span>
                    </li>
                    <li>
                      <span className="name">Name: {result.get('name')}</span>
                    </li>
                    <li>
                      <span className="need-password">{result.get('need_password')? 'Need Password':'Public'}</span>
                    </li>
                  </ul>
                </div>);
      } else if (this.props.selectedValue === 'user') {
        console.log('searchSuccess user');
        view = (<div  className="search-result-user-container">
                  <ul>
                    <li>
                      <div className="search-result-container">
                        <img className="search-result-image" src={'/api/'+result.get('image')} />
                      </div>
                    </li>
                    <li>
                      <span className="account">Account: {result.get('account')}</span>
                    </li>
                    <li>
                      <span className="nick_name">Nick Name: {result.get('nick_name')}</span>
                    </li>
                    <li>
                      <span className="name">Name: {result.get('name')}</span>
                    </li>
                    <li>
                      <span className="gender">Gender: {result.get('gender')}</span>
                    </li>
                    <li>
                      <span className="school">Email: {result.get('email')}</span>
                    </li>
                    <li>
                      <span className="phone">Phone: {result.get('phone')}</span>
                    </li>
                    <li>
                      <span className="student_id">Student Id: {result.get('student_id')}</span>
                    </li>
                    <li>
                      <span className="phone">Phone: {result.get('phone')}</span>
                    </li>
                    <li>
                      <span className="qq">QQ: {result.get('qq')}</span>
                    </li>
                    <li>
                      <span className="wechat">Wechat: {result.get('wechat')}</span>
                    </li>
                  </ul>
                </div>);
      }
    }

    return view;
  },
  onChange() {
    this.setState({'data': Immutable.fromJS(Store.getSearchAll())});
  }

});

function detectSearchResult (data) {
  if (data.get('user') === null && data.get('organization') === null) {
    return 'searchFail';
  } else {
    return 'searchSuccess';
  }
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


export default searchResult


// user_data: {
//             name: String,
//             account: String,
//             age: Number,
//             student_id: String,
//             qq: String,
//             wechat: String,
//             nick_name: String,
//           gender: String,
//           image: String,
//           school: String,
//           email: String,
//           phone: String
//           }

//           organization_data:{
//             account: String,
//             name: String,
//             image: String,
//             need_password: Boolean,
//           };