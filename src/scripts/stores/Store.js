import AppDispatcher from '../dispatcher/AppDispatcher'
import {EventEmitter} from 'events'
import Constants from '../constants/Constants'
import assign from 'object-assign'
import Immutable from 'immutable'

var CHANGE_EVENT = 'change';

var _user = Immutable.Map();
var _message = Immutable.Map();
var _state = Immutable.Map({
  isLogin: false,
  // self: null,
  selectedValue: 'organization'
})
var _searchResult = Immutable.Map({
  user: null,
  organization: null,
  message: null,
})
var _organizationDetail = Immutable.Map();


function createUser(data) {
  _user = Immutable.Map({user_data: data.get('user_data')});
  _message = Immutable.Map({message: data.get('message')});
  _state = _state.set(data.getIn(['status', 'name']), data.getIn(['status', 'code']));
  _state = _state.set('isLogin', true);
}
function updateSelectedValue(selectedValue) {
  _state = _state.set('selectedValue', selectedValue)
}
function updateSearchUser(user_data, message) {
  _searchResult = _searchResult.set('user', user_data);
  _searchResult = _searchResult.set('organization', null);
  _searchResult = _searchResult.set('message', message);
  console.log(' updateSearchUser')
}
function updateSearchOrganization(organization_data, message) {
  _searchResult = _searchResult.set('organization', organization_data);
  _searchResult = _searchResult.set('user', null);
  _searchResult = _searchResult.set('message', message);
  console.log(' updateSearchOrganization')
}
function updateSearchMessage(message) {
  _searchResult = _searchResult.set('organization', null);
  _searchResult = _searchResult.set('user', null);
  _searchResult = _searchResult.set('message', message);
  console.log(' updateSearchMessage')
}
function updateOrganizationDetail(organization_data) {
  if (typeof organization_data != 'object') {
    return;
  }
  _organizationDetail = Immutable.fromJS(organization_data);
  console.log(' updateOrganizationDetail');
}
function updateUser(data) {
  _user = Immutable.Map({user_data: data.get('user_data')});
  _message = Immutable.Map({message: data.get('message')});
  _state = _state.set(data.getIn(['status', 'name']), data.getIn(['status', 'code']));
}
function destroyUser() {
  _user = {};
}
function registerUser(data) {

}
var Store = assign({}, EventEmitter.prototype, {

  getUser: function() {
    return _user.get('user_data');
  },
  getMessage: function() {
    return _message.get('message');
  },
  getSearchUser: function() {
    return _searchResult.get('user');
  },
  getSearchOrganization: function() {
    return _searchResult.get('organization');
  },
  getSearchMessage: function() {
    return _searchResult.get('message');
  },
  getSearchAll: function() {
    return _searchResult.toJS();
  },
  getOrganizationDetail: function() {
    return _organizationDetail.toJS();
  },
  isLogin: function() {
    return _state.get('isLogin');
  },
  getSelectedValue: function() {
    return _state.get('selectedValue');
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var data;

  switch(action.actionType) {
    case Constants.LOGIN:
      data = action.data
      createUser(data);
      Store.emitChange();
      break;
    case Constants.LOGOUT:
      destroyUser();
      Store.emitChange();
      break;
    case Constants.REGISTER:
      registerUser();
      Store.emitChange();
      break;
    case Constants.CHANGESELECTEDVALUE:
      updateSelectedValue(action.data);
      Store.emitChange();
      break;
    case Constants.SEARCHUSER:
      updateSearchUser(action.data, action.message);
      Store.emitChange();
      break;
    case Constants.SEARCHORGANIZATION:
      updateSearchOrganization(action.data, action.message);
      Store.emitChange();
      break;
    case Constants.SEARCHFAIL:
      updateSearchMessage(action.message);
      Store.emitChange();
      break;
    case Constants.SEARCHORGANIZATIONDETAIL:
      updateOrganizationDetail(action.data);
      Store.emitChange();
      break;
    case Constants.UPDATEUSER:
      updateUser(action.data);
      Store.emitChange();
      break;
    default:
      // no op
  }
});

export default Store;
