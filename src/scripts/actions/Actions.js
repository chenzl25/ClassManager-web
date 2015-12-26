import AppDispatcher from '../dispatcher/AppDispatcher'
import Constants from '../constants/Constants'
import { post, get } from '../lib/service'

var Actions = {
  login: function(account, password) {
    //some ajax here
    console.log('login Action');
    return post('/login/user', {account: account, password: password})
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
  searchUser: function(account) {
    console.log('searchsearchUser Action');
    return get('/search/user/account/'+account)
          .then((result) => {
            console.log(result.toJS());
            AppDispatcher.dispatch({
              actionType: Constants.SEARCHUSER,
              data: result.get('user_data'),
              message: result.get('message')
            });
          }, (err) => {
            AppDispatcher.dispatch({
              actionType: Constants.SEARCHFAIL,
              message: err
            });
          })
  },
  searchOrganization: function(account) {
    console.log('searchOrganization Action');
    return get('/search/organization/account/'+account)
          .then((result) => {
            console.log(result.toJS());
            AppDispatcher.dispatch({
              actionType: Constants.SEARCHORGANIZATION,
              data: result.get('organization_data'),
              message: result.get('message')
            });
          }, (err) => {
            AppDispatcher.dispatch({
              actionType: Constants.SEARCHFAIL,
              message: err
            });
          })
  },
  searchOrganizationDetail: function(account) {
    console.log('searchOrganizationDetail Action');
    return get('/search/organization/'+account)
          .then((result) => {
            console.log(result.toJS());
            AppDispatcher.dispatch({
              actionType: Constants.SEARCHORGANIZATIONDETAIL,
              data: result.get('organization_data'),
              // message: result.get('message')
            });
          }, (err) => {
            console.log('reject: ',err, 'inAction')
          })
  }
};

export default Actions;
