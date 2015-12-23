'use strict';

/* Services */

var classManagerServices = angular.module('classManagerServices', ['ngResource']);

classManagerServices.factory('User', ['$http',
 	function($http){
 		var User = {
 			register: function(data) {
 				return $http({
 					method : 'POST',
 					url : '/register/user',
 					data : data
 				})
 			},
 			
 			login : function(data) {
 				return $http({
 					method : 'POST',
 					url : '/login/user',
 					data : data
 				})
 			},
 			settings: function(data) {
 				return $http({
 					method : 'POST',
 					url : '/settings/user',
 					data : data,
 					transformRequest: angular.identity,
                	headers: {'Content-Type': undefined}
 				})
 			},
 			update_homework: function(homework_id, data) {
 				return $http({
 					method : 'POST',
 					url : '/update/user/homework/' + homework_id,
 					data : data
 				})
 			},
 			update_message: function(message_id, data) {
 				return $http({
 					method : 'POST',
 					url : '/update/user/message/' + message_id,
 					data : data
 				})
 			},
 			update_group_name: function(organization_account, data) {
 				return $http({
 					method : 'POST',
 					url : '//update/user/organization/' + organization_account + '/member',
 					data : data
 				})
 			},
 			update_homework: function(homework_id, data) {
 				return $http({
 					method : 'POST',
 					url : '/update/user/homework/' + homework_id,
 					data : data
 				})
 			},
 			search_myself: function() {
 				return $http({
 					method : 'GET',
 					url : '/search/user',
 				})
 			},
 			search_status: function() {
 				return $http({
 					method : 'GET',
 					url : '/search/user/status',
 				})
 			},
 			search_messages: function() {
 				return $http({
 					method : 'GET',
 					url : '/search/user/messages',
 				})
 			},
 			search_relationships: function() {
 				return $http({
 					method : 'GET',
 					url : '/search/user/relationships',
 				})
 			},
 			search_homeworks: function() {
 				return $http({
 					method : 'GET',
 					url : '/search/user/homeworks',
 				})
 			},
 			search_by_account: function(account) {
 				return $http({
 					method : 'GET',
 					url : '/search/user/account/' + account
 				})
 			},
 			join_by_password: function(account, data) {
 				return $http({
 					method : 'POST',
 					url : '/join/organization',
 					data: data
 				})
 			},
 			join_without_password: function(account) {
 				return $http({
 					method : 'GET',
 					url : '/join/organization/'+ account
 				})
 			},
 			quit_organization: function(account) {
 				return $http({
 					method : 'DELETE',
 					url : '/user/organization/'+ account
 				})
 			},
 			send_message: function(account) {
 				return $http({
 					method : 'POST',
 					url : '/send/'+ account
 				})
 			}
 		}
 	return User;
}]);
classManagerServices.factory('Organization', ['$http',
 	function($http){
 		var Organization = {

 			register_organization : function(data) {
 				return $http({
 					method : 'POST',
 					url : '/register/organization',
 					data : data
 				})
 			},
 			settings: function(account, data) {
 				return $http({
 					method : 'POST',
 					url : '/settings/organization/' + account,
 					data : data
 				})
 			},
 			update_member: function(organization_account, member_id, data) {
 				return $http({
 					method : 'POST',
 					url : '//update/organization/' + organization_account + '/member/' + member_id,
 					data : data
 				})
 			},
 			update_member: function(organization_account, homework_id, data) {
 				return $http({
 					method : 'POST',
 					url : '//update/organization/' + organization_account + '/homework/' + homework_id,
 					data : data
 				})
 			},
 			update_member: function(organization_account, notice_id, data) {
 				return $http({
 					method : 'POST',
 					url : '//update/organization/' + organization_account + '/notice/' + notice_id,
 					data : data
 				})
 			},
 			update_member: function(organization_account, vote_id, data) {
 				return $http({
 					method : 'POST',
 					url : '//update/organization/' + organization_account + '/vote/' + vote_id,
 					data : data
 				})
 			},
 			search_by_account_all: function(account) {
 				return $http({
 					method : 'GET',
 					url : '/search/organization/' + account
 				})
 			},
 			search_by_account: function(account) {
 				return $http({
 					method : 'GET',
 					url : '/search/user/account/' + account
 				})
 			},
 			search_homeworks: function(account) {
 				return $http({
 					method : 'GET',
 					url : '/search/organization/' + account + '/homeworks'
 				})
 			},
 			search_notices: function(account) {
 				return $http({
 					method : 'GET',
 					url : '/search/organization/' + account + '/notices'
 				})
 			},
 			search_votes: function(account) {
 				return $http({
 					method : 'GET',
 					url : '/search/organization/' + account + '/votes'
 				})
 			},
 			search_members: function(account) {
 				return $http({
 					method : 'GET',
 					url : '/search/organization/' + account + '/members'
 				})
 			},
 			search_homework: function(account, id) {
 				return $http({
 					method : 'GET',
 					url : '/search/organization/' + account + '/homework/' + id
 				})
 			},
 			search_notice: function(account, id) {
 				return $http({
 					method : 'GET',
 					url : '/search/organization/' + account + '/notice/' + id
 				})
 			},
 			search_vote: function(account, id) {
 				return $http({
 					method : 'GET',
 					url : '/search/organization/' + account + '/vote/' + id
 				})
 			},
 			create_homework: function(account, data) {
 				return $http({
 					method : 'POST',
 					url : '/search/organization/' + account + '/homework',
 					data: data
 				})
 			},
 			create_notice: function(account, data) {
 				return $http({
 					method : 'POST',
 					url : '/search/organization/' + account + '/notice',
 					data: data
 				})
 			},
 			create_vote: function(account, data) {
 				return $http({
 					method : 'POST',
 					url : '/search/organization/' + account + '/vote',
 					data: data
 				})
 			},
 			create_vote: function(account, data) {
 				return $http({
 					method : 'POST',
 					url : '/vote/organization/' + account,
 					data: data
 				})
 			},
			delete_myself: function(account) {
 				return $http({
 					method : 'DELETE',
 					url : '/organization/' + account,
 				})
 			},
 			delete_myself: function(account) {
 				return $http({
 					method : 'DELETE',
 					url : '/organization/' + account,
 				})
 			},
 			delete_member: function(organization_account, member_account) {
 				return $http({
 					method : 'DELETE',
 					url : '/organization/' + organization_account + '/member/' + member_account,
 				})
 			},
 			delete_homework: function(organization_account, homework_id) {
 				return $http({
 					method : 'DELETE',
 					url : '/organization/' + organization_account + '/homework/' + homework_id,
 				})
 			},
 			delete_notice: function(organization_account, notice_id) {
 				return $http({
 					method : 'DELETE',
 					url : '/organization/' + organization_account + '/notice/' + notice_id,
 				})
 			},
 			delete_vote: function(organization_account, vote_id) {
 				return $http({
 					method : 'DELETE',
 					url : '/organization/' + organization_account + '/vote/' + vote_id,
 				})
 			},
 		}
 	return Organization;
}]);