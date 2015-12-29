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
  getInitialState: function() {
    return {data: Immutable.fromJS(Store.getSearchAll()),
            joinMessage: ''}
  },
  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps.selectedValue);
    return !nextState.data.equals(this.state.data)
           || nextState.joinMessage !== this.state.joinMessage;
  },
  componentDidMount() {
    Store.addChangeListener(this.onChange);
  },
  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  },
  // componentWillUpdate() {
  // },
  render: function() {
    console.log(this.state.selectedValue,'???');
    var data = this.state.data;
    var view;
    if (detectSearchResult(data) === 'searchFail') {
      console.log('searchFail');
      view = (<div className="search-result-message">
                <p>{data.get('message')}</p>
              </div>);
    } else {
      if (detectSearchResult(data) === 'searchSuccessOrganization') {
        var result = data.get('organization');
        console.log('searchSuccess organization');
        view = (<div  className="search-result-organization-container">
                  <ul className="search-result-organization-list">
                    <li>
                      <div className="search-result-organization-image-container">
                        <img className="search-result-organization-image" src={'/api/'+result.get('image')} />
                        <button className="button-join" onClick={this.joinWithoutPasswordHandler}>Join</button>
                        <span className="search-result-organization-private">{result.get('need_password')? 'Private':'Public'}</span>
                      </div>
                    </li>
                    <li>
                      <div>
                        <span className="attribute-name">Account: </span>
                        <span className="search-result-organization-account">{result.get('account')}</span>
                      </div>
                    </li>
                    <li>
                      <div>
                        <span className="attribute-name">Name: </span>
                        <span className="search-result-organization-name">{result.get('name')}</span>
                      </div>
                    </li>
                    <li>
                      <div className="join-message-container">
                        <p className="join-message">{this.state.joinMessage}</p>
                      </div>
                    </li>
                  </ul>
                </div>
                );
      } else if (detectSearchResult(data) === 'searchSuccessUser') {
        var result = data.get('user');
        console.log('searchSuccess user');
        view = (<div  className="search-result-user-container">
                  <ul className="search-result-user-list">
                    <li>
                      <div className="search-result-user-image-container">
                        <img className="search-result-user-image" src={'/api/'+result.get('image')} />
                      </div>
                    </li>
                    <li>
                      <div>
                        <span className="attribute-name">Account: </span>
                        <span className="search-result-user-account">{result.get('account')}</span>
                      </div>
                    </li>
                    <li>
                      <div>
                        <span className="attribute-name">Nick Name: </span>
                        <span className="search-result-user-nick_name">{result.get('nick_name')}</span>
                      </div>
                    </li>
                    <li>
                      <div>
                        <span className="attribute-name">Name: </span>
                        <span className="search-result-user-name">{result.get('name')}</span>
                      </div>
                    </li>
                    <li>
                      <div>
                        <span className="attribute-name">Student Id: </span>
                        <span className="search-result-user-student_id">{result.get('student_id')}</span>
                      </div>
                    </li>
                    <li>
                      <div>
                        <span className="attribute-name">Gender: </span>
                        <span className="search-result-user-gender">{result.get('gender')}</span>
                      </div>
                    </li>
                    <li>
                      <div>
                        <span className="attribute-name">Email: </span>
                        <span className="search-result-user-school">{result.get('email')}</span>
                      </div>
                    </li>
                    <li>
                      <div>
                        <span className="attribute-name">Phone: </span>
                        <span className="search-result-user-phone">{result.get('phone')}</span>
                      </div>
                    </li>
                    <li>
                      <div>
                        <span className="attribute-name">QQ: </span>
                        <span className="search-result-user-qq">{result.get('qq')}</span>
                      </div>
                    </li>
                    <li>
                      <div>
                        <span className="attribute-name">Wechat: </span>
                        <span className="search-result-user-wechat">{result.get('wechat')}</span>
                      </div>
                    </li>
                  </ul>
                </div>);
      }
    }

    return view;
  },
  onChange() {
    this.setState({'data': Immutable.fromJS(Store.getSearchAll())});
    this.setState({joinMessage: ''})
  },
  joinWithoutPasswordHandler() {
    Actions.joinWithoutPassword(this.state.data.getIn(['organization', 'account']))
           .then((result) => this.setState({joinMessage: result}),
                 (err) => this.setState({joinMessage: err}));
  }

});

function detectSearchResult (data) {
  if (data.get('user') === null && data.get('organization') === null) {
    return 'searchFail';
  } else if (data.get('user') !== null) {
    return 'searchSuccessUser';
  } else if (data.get('organization') !== null) {
    return 'searchSuccessOrganization';
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