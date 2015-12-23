import AppDispatcher from '../dispatcher/AppDispatcher'
import Constants from '../constants/Constants'
import { post, get } from '../lib/service'

var Actions = {
  login: function(account, password) {
    //some ajax here
    console.log('login!!!');
    post('/login/user', {account: account, password: password})
          .then((result) => {
            console.log(result.toJS());
            AppDispatcher.dispatch({
              actionType: Constants.LOGIN,
              data: result
            });
          }, (err) => {
            console.log('reject:', err);
          })
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
