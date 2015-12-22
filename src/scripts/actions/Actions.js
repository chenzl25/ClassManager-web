/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * Actions
 */

import AppDispatcher from '../dispatcher/AppDispatcher'
import Constants from '../constants/Constants'

var Actions = {
  login: function(account, password) {
    //some ajax here
    var data;
    AppDispatcher.dispatch({
      actionType: Constants.LOGIN,
      data: data
    });
  },
  logout: function(account, password) {
    //some ajax here
    var data;
    AppDispatcher.dispatch({
      actionType: Constants.LOGOUT,
    });
  },
  register: function(account, password) {
    //some ajax here
    var data;
    AppDispatcher.dispatch({
      actionType: Constants.REGISTER,
    });
  },
};

export default Actions;
