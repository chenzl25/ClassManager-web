import AppDispatcher from '../dispatcher/AppDispatcher'
import Constants from '../constants/Constants'
import { post, get,postFormData } from '../lib/service'
import path from 'path'

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
  changeSelectedValue: function(selectedValue) {
    AppDispatcher.dispatch({
      actionType: Constants.CHANGESELECTEDVALUE,
      data: selectedValue
    });
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
  },
  userSetting: function(data) {
    return postFormData('/settings/user', data)
          .then((result) => {
            console.log(result.toJS());
            this.updateUser();
            return Promise.resolve(result.get('message'));
          }, (err) => {
            console.log('reject: ',err, 'inAction');
            return Promise.reject(err);
          })
  },
  organizationSetting: function(organizationAccount,data) {
    return postFormData('/settings/organization/'+organizationAccount, data)
          .then((result) => {
            console.log(result.toJS());
            this.searchOrganizationDetail(organizationAccount);
            this.updateUser();
            return Promise.resolve(result.get('message'));
          }, (err) => {
            console.log('reject: ',err, 'inAction')
            return Promise.reject(err);
          })
  },
  updateUser: function() {
    return get('/search/user')
          .then((result) => {
            console.log(result.toJS());
            AppDispatcher.dispatch({
              actionType: Constants.UPDATEUSER,
              data: result,
            });
          }, (err) => {
            console.log('reject: ',err, 'inAction')
          })
  },
  joinWithoutPassword: function(organizationAccount) {
    return get('/join/organization/'+organizationAccount)
          .then((result) => {
            console.log(result.toJS());
            this.updateUser();
            return Promise.resolve(result.get('message'));
          }, (err) => {
            console.log('reject: ',err, 'inAction')
            return Promise.reject(err);
          })
  },
  joinWithPassword: function(organizationAccount, password) {
    return post('/join/organization/'+organizationAccount, {password: password})
          .then((result) => {
            console.log(result.toJS());
            this.updateUser();
            return Promise.resolve(result.get('message'));
          }, (err) => {
            console.log('reject: ',err, 'inAction')
            return Promise.reject(err);
          })
  },
  lookHomework: function(organizationAccount, homeworkId) {
    console.log('lookHomework');
    console.log(path.join('/search','organization', organizationAccount, 'homework', homeworkId));
    return get(path.join('/search','organization', organizationAccount, 'homework', homeworkId))
          .then((result) => {
            console.log(result.toJS());
            this.updateUser();
            this.searchOrganizationDetail(organizationAccount);
            return Promise.resolve(result.get('message'));
          }, (err) => {
            console.log('reject: ',err, 'inAction')
            // return Promise.reject(err);
          })
  },
  complishHomework: function(homeworkId, complishFlag) {
    console.log("complishHomework");
    return post('/update/user/homework/'+homeworkId, {uncomplish: complishFlag})
          .then((result) => {
            console.log(result.toJS());
            this.updateUser();
            return Promise.resolve(result.get('message'));
          }, (err) => {
            console.log('reject: ',err, 'inAction')
            // return Promise.reject(err);
          })
  },
  updataMemberPosition: function(organizationAccount, memberId, position) {
    console.log("updataMemberPosition");
    return post(path.join('/update', 'organization', organizationAccount, 'member',memberId), {position: position})
          .then((result) => {
            console.log(result.toJS());
            this.updateUser();
            this.searchOrganizationDetail(organizationAccount);
            return Promise.resolve(result.get('message'));
          }, (err) => {
            console.log('reject: ',err, 'inAction')
            // return Promise.reject(err);
          })
  },
  upMember: function(organizationAccount, memberId) {
    this.updataMemberPosition(organizationAccount, memberId, 'manager');
  },
  downMember: function(organizationAccount, memberId) {
    this.updataMemberPosition(organizationAccount, memberId, 'member');
  }
};

export default Actions;
