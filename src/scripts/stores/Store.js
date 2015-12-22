var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _user = {};
var _message = {};
var _state = {
  isLogin: false,
  //others
};
function createUser(data) {
  _user.account = data.account;
  _user.name = data.name;
  _state.isLogin = true;
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
    return _user;
  },
  getMessage: function() {
    return _message;
  },
  isLogin: function() {
    return _state.isLogin;
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
