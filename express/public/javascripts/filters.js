'use strict';

/* Filters */

var Filters = angular.module('classManagerFilters', []);
Filters.filter('checkName', function() {
	return function(input) {
		if (input == null || input === undefined) {
			return 'null';
		}
		return input;
	};
});
Filters.filter('checkImage', function() {
	return function(input) {
		if (input == null || input === undefined) {
			return 'images/post.png';
		}
		return input;
	};
});