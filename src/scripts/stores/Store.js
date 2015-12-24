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
})
function createUser(data) {
  // _user.account = data.account;
  // _user.name = data.name;
  _user = Immutable.Map({user_data: data.get('user_data')});
  _message = Immutable.Map({message: data.get('message')});
  _state = _state.set(data.getIn(['status', 'name']), data.getIn(['status', 'code']));
  _state = _state.set('isLogin', true);
}
function updateUser(data) {

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
  isLogin: function() {
    return _state.get('isLogin');
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
    default:
      // no op
  }
});

export default Store;
