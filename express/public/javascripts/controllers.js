'use strict';

/* Controllers */

var classManagerControllers = angular.module('classManagerControllers', ['ngRoute', ]);

classManagerControllers.controller('HomeCtrl', ['$scope', 'User', 'Organization','$location','$rootScope',
    function($scope, User, Organization, $location, $rootScope) {
        if ($rootScope.user_data != null) {
            $location.url('/user');
        }
}]);

classManagerControllers.controller('LoginCtrl', ['$scope', 'User', 'Organization','$location','$rootScope',
    function($scope, User, Organization, $location, $rootScope) {
        if ($rootScope.user_data != null) {
            $location.url('/user');
        }
        $scope.account = null;
        $scope.password = null;
        $scope.result = {};
        $scope.login = function() {
            // if($scope.login_form.$invalid) return;
            User.login({
                 account: $scope.account,
                 password: $scope.password,
                // account: '14331048',
                // password: '036713',
               // account: 'myuser15',
               // password: 'myuser15'
            }).success(function(data, status, headers, config) {
                if (data.error === false) {
                    User.search_myself().success(function(data, status, headers, config) {
                        $rootScope.user_data = data.user_data;
                        $location.url('/user');
                    });
                } else {
                    result = data;
                }
            });
        }
}]);
classManagerControllers.controller('RegisterCtrl', ['$scope', 'User', 'Organization',
    function($scope, User, Organization) {
        $scope.account = null;
        $scope.password = null;
        $scope.re_password = null;
        $scope.result = {};
        $scope.register = function() {
            if($scope.register_form.$invalid) return;
            if ($scope.password !== $scope.re_password) return;
            User.register({
                account: $scope.account,
                password: $scope.password,
            }).success(function(data, status, headers, config) {
                $scope.result.data = data;
                $scope.result.status = status;
                $scope.result.headers = headers;
                $scope.result.config = config;
            });
        }
}]);
classManagerControllers.controller('UserCtrl', ['$scope', 'User', 'Organization','$location','$rootScope',
    function($scope, User, Organization, $location, $rootScope) {
        if ($rootScope.user_data == null) {
            $location.url('/');
        }
        $scope.user_data = $rootScope.user_data;
        $(window).bind('beforeunload', function(event) {
            // return 'Are you sure to leave?';
        });
        $scope.logout = function() {
            $rootScope.user_data = null;
        };
        $scope.show_organization = function(account) {
            console.log(account);
            Organization.search_by_account_all(account)
            .success(function(data, status, headers, config) {
                if (data.error === false) {
                    $scope.organization_data = data.organization_data; 
                }
            })
        }
}]);
classManagerControllers.controller('SettingsUserCtrl', ['$scope', 'User', 'Organization','$location','$rootScope',
    function($scope, User, Organization, $location, $rootScope) {
        if ($rootScope.user_data == null) {
            $location.url('/');
        }
        $scope.copy_data = angular.copy($rootScope.user_data);
        $(window).bind('beforeunload', function(event) {
            // return 'Are you sure to leave?';
        });
        $scope.update = function() {
            var fd = new FormData();
            if ($scope.image)
                fd.append('image', $scope.image);
            if ($scope.copy_data.name)
                fd.append('name', $scope.copy_data.name);
            if ($scope.copy_data.email)
                fd.append('email', $scope.copy_data.email);
            if ($scope.copy_data.gender)
                fd.append('gender', $scope.copy_data.gender);
            User.settings(fd).success(function(data){
                User.search_myself().success(function(data) {
                    if (data.error === false) {
                        $rootScope.user_data = data.user_data;
                    }
                    $location.url('/user');
                })
            }).error(function(){
                console.log('err!! when setting');
            });
        };
        $scope.reset = function() {
            $scope.copy_data = angular.copy($rootScope.user_data);
        };
}]);
